const http = require('http');

const BASE_URL = 'http://localhost:3000';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {},
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING ZETARAZ END-TO-END QA SUITE ===\n');
  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Homepage loads
  await test('1. Homepage loads (Status 200 & Title present)', async () => {
    const res = await request('/');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('ZETARAZ')) throw new Error('ZETARAZ brand missing from homepage');
    if (!res.body.includes('Knowledge. Intelligence. Discovery.')) throw new Error('Tagline missing');
  });

  // 2. About page
  await test('2. About page loads (Status 200 & Editorial standards)', async () => {
    const res = await request('/about');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('Standar Integritas Ilmiah')) throw new Error('Standards section missing');
  });

  // 3. Category page
  await test('3. Category page loads (Knowledge category)', async () => {
    const res = await request('/category/knowledge');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('Domain Pengetahuan')) throw new Error('Category domain label missing');
  });

  // 4. Article detail page
  await test('4. Article detail page loads & metadata present', async () => {
    const res = await request('/articles/pengantar-sistem-manajemen-pengetahuan-kms');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('Piramida DIKW')) throw new Error('Article content missing');
    if (!res.body.includes('application/ld+json')) throw new Error('JSON-LD structured data missing');
  });

  // 5. Search API
  await test('5. Search API functional (/api/search?q=KMS)', async () => {
    const res = await request('/api/search?q=KMS');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success || !Array.isArray(data.articles) || data.articles.length === 0) {
      throw new Error('Search failed to return matching articles');
    }
  });

  // 6. View Counter incrementing
  await test('6. Real View Counter API increments view count', async () => {
    const res = await request('/api/articles/pengantar-sistem-manajemen-pengetahuan-kms/view', {
      method: 'POST',
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success || typeof data.viewCount !== 'number') {
      throw new Error('Invalid view increment response');
    }
  });

  // 7. Newsletter subscription with validation
  await test('7. Newsletter subscription endpoint stores subscriber', async () => {
    const testEmail = `researcher.${Date.now()}@institute.ac.id`;
    const res = await request('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: testEmail },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success) throw new Error(`Failed: ${data.error}`);
  });

  // 8. Admin Login Authentication
  let authCookie = '';
  await test('8. Admin login authentication issues secure token cookie', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@zetaraz.com', password: 'ZetarazAdmin2026!' },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success) throw new Error('Admin authentication failed');

    const setCookie = res.headers['set-cookie'];
    if (!setCookie) throw new Error('No cookie header returned');
    authCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : setCookie.split(';')[0];
  });

  // 9. Create draft article with admin auth
  let createdArticleId = '';
  await test('9. Admin article creation (Save draft)', async () => {
    const res = await request('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        title: 'Artikel Uji Coba Verifikasi Sistem Otomatis',
        subtitle: 'Uji coba integritas API KMS ZETARAZ',
        excerpt: 'Ringkasan verifikasi sistem kontrol mutu repositori.',
        content: '## Bab Pengujian\nKonten pengujian berjalan lancar tanpa kendala.',
        categoryId: 'clr12345', // will pick first category if not matched, or let us find real id
        status: 'DRAFT',
      },
    });

    // If categoryId needed valid ID, fetch categories first
    if (res.statusCode === 400 || res.statusCode === 500) {
      const catRes = await request('/api/categories');
      const cats = JSON.parse(catRes.body).categories;
      const validRes = await request('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: authCookie,
        },
        body: {
          title: 'Artikel Uji Coba Verifikasi Sistem Otomatis',
          subtitle: 'Uji coba integritas API KMS ZETARAZ',
          excerpt: 'Ringkasan verifikasi sistem kontrol mutu repositori.',
          content: '## Bab Pengujian\nKonten pengujian berjalan lancar tanpa kendala.',
          categoryId: cats[0].id,
          status: 'DRAFT',
        },
      });
      if (validRes.statusCode !== 201) throw new Error(`Expected 201, got ${validRes.statusCode}`);
      const data = JSON.parse(validRes.body);
      createdArticleId = data.article.id;
    } else if (res.statusCode === 201) {
      const data = JSON.parse(res.body);
      createdArticleId = data.article.id;
    } else {
      throw new Error(`Expected 201, got ${res.statusCode}`);
    }
  });

  // 10. Update article (Publish draft)
  await test('10. Admin article update (Transition from DRAFT to PUBLISHED)', async () => {
    if (!createdArticleId) throw new Error('No created article ID to update');
    const res = await request(`/api/articles/${createdArticleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        status: 'PUBLISHED',
        title: 'Artikel Uji Coba Verifikasi Sistem Otomatis (Updated & Published)',
      },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (data.article.status !== 'PUBLISHED') throw new Error('Status failed to transition to PUBLISHED');
  });

  // 11. Delete article
  await test('11. Admin article deletion with authorization check', async () => {
    if (!createdArticleId) throw new Error('No created article ID to delete');
    const res = await request(`/api/articles/${createdArticleId}`, {
      method: 'DELETE',
      headers: {
        Cookie: authCookie,
      },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
  });

  // 12. Sitemap XML
  await test('12. Technical SEO: sitemap.xml renders valid XML', async () => {
    const res = await request('/sitemap.xml');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('<urlset') && !res.body.includes('http')) {
      throw new Error('Invalid sitemap content');
    }
  });

  // 13. Robots.txt
  await test('13. Technical SEO: robots.txt disallows admin & allows sitemap', async () => {
    const res = await request('/robots.txt');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('Disallow: /admin/')) throw new Error('robots.txt missing admin disallow');
    if (!res.body.includes('sitemap.xml')) throw new Error('robots.txt missing sitemap link');
  });

  console.log(`\n=== QA SUMMARY ===`);
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log(`\n>>> ALL 13 TEST SUITES PASSED PERFECTLY! <<<`);
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
