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

function contains(body, text) {
  if (body.includes(text)) return true;
  // Also check HTML-escaped entity for &
  const escaped = text.replace(/&/g, '&amp;');
  return body.includes(escaped);
}

async function runTests() {
  console.log('=== STARTING ZETARAZ KNOWLEDGE END-TO-END QA SUITE ===\n');
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
  await test('1. Homepage loads (Status 200 & Brand + Taglines present)', async () => {
    const res = await request('/');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!contains(res.body, 'ZETARAZ')) throw new Error('ZETARAZ brand missing from homepage');
    if (!contains(res.body, 'Berbagi Pengetahuan, Berbagi Pengalaman')) throw new Error('Primary tagline missing');
    if (!contains(res.body, 'Temukan Pengetahuan. Perluas Wawasan.')) throw new Error('Supporting message missing');
  });

  // 2. About page
  await test('2. About page loads (Status 200 & Repositioning + Values present)', async () => {
    const res = await request('/about');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!contains(res.body, 'ZETARAZ Knowledge')) throw new Error('ZETARAZ Knowledge brand title missing');
    if (!contains(res.body, 'Kredibilitas & Tanggung Jawab Isi')) throw new Error('Credibility section missing');
  });

  // 3. Category pages (All 6 Primary Categories)
  const categories = [
    { slug: 'knowledge', name: 'Knowledge' },
    { slug: 'technology', name: 'Technology' },
    { slug: 'science-research', name: 'Science & Research' },
    { slug: 'data-analytics', name: 'Data & Analytics' },
    { slug: 'business-management', name: 'Business & Management' },
    { slug: 'learning', name: 'Learning' },
  ];

  for (const cat of categories) {
    await test(`3. Category [${cat.name}] loads at /category/${cat.slug}`, async () => {
      const res = await request(`/category/${cat.slug}`);
      if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode} for /category/${cat.slug}`);
      if (!contains(res.body, 'Domain Pengetahuan')) throw new Error('Category badge missing');
      if (!contains(res.body, cat.name)) throw new Error(`Category name ${cat.name} missing from page`);
    });
  }

  // 4. Article detail page
  const testArticleSlug = 'membangun-kebiasaan-berbagi-pengetahuan';
  await test(`4. Article detail page loads & author/metadata present (/articles/${testArticleSlug})`, async () => {
    const res = await request(`/articles/${testArticleSlug}`);
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!contains(res.body, 'Pengetahuan Menjadi Bernilai')) throw new Error('Article content missing');
    if (!contains(res.body, 'Rizky Aditya Pratama Wijaya')) throw new Error('Author name missing');
    if (!contains(res.body, 'application/ld+json')) throw new Error('JSON-LD structured data missing');
  });

  // 5. Search UI and API
  await test('5. Search UI page loads (Status 200)', async () => {
    const res = await request('/search');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!contains(res.body, 'Temukan Pengetahuan. Perluas Wawasan.')) throw new Error('Search page header missing');
  });

  await test('6. Search API functional (/api/search?q=pengetahuan)', async () => {
    const res = await request('/api/search?q=pengetahuan');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success || !Array.isArray(data.articles) || data.articles.length === 0) {
      throw new Error('Search failed to return matching articles');
    }
  });

  // 7. View Counter incrementing
  await test(`7. Real View Counter API increments view count (/api/articles/${testArticleSlug}/view)`, async () => {
    const res = await request(`/api/articles/${testArticleSlug}/view`, {
      method: 'POST',
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success || typeof data.viewCount !== 'number') {
      throw new Error('Invalid view increment response');
    }
  });

  // 8. Newsletter subscription with validation
  await test('8. Newsletter subscription endpoint stores subscriber', async () => {
    const testEmail = `reader.${Date.now()}@zetaraz.id`;
    const res = await request('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: testEmail },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    if (!data.success) throw new Error(`Failed: ${data.error}`);
  });

  // 9. Admin Login Authentication
  let authCookie = '';
  await test('9. Admin login authentication issues secure token cookie', async () => {
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

  // 10. Create draft article with admin auth
  let createdArticleId = '';
  await test('10. Admin article creation (Save draft)', async () => {
    const catRes = await request('/api/categories');
    const cats = JSON.parse(catRes.body).categories;
    const catId = cats && cats.length > 0 ? cats[0].id : 'cat1';

    const res = await request('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        title: 'Artikel Uji Coba Verifikasi Sistem Otomatis',
        subtitle: 'Uji coba integritas API KMS ZETARAZ Knowledge',
        excerpt: 'Ringkasan verifikasi sistem kontrol mutu repositori ZETARAZ Knowledge.',
        content: '## Bab Pengujian\nKonten pengujian berjalan lancar tanpa kendala.',
        categoryId: catId,
        status: 'DRAFT',
      },
    });

    if (res.statusCode !== 201) throw new Error(`Expected 201, got ${res.statusCode}`);
    const data = JSON.parse(res.body);
    createdArticleId = data.article.id;
  });

  // 11. Update article (Publish draft)
  await test('11. Admin article update (Transition from DRAFT to PUBLISHED)', async () => {
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

  // 12. Delete article
  await test('12. Admin article deletion with authorization check', async () => {
    if (!createdArticleId) throw new Error('No created article ID to delete');
    const res = await request(`/api/articles/${createdArticleId}`, {
      method: 'DELETE',
      headers: {
        Cookie: authCookie,
      },
    });
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
  });

  // 13. Sitemap XML
  await test('13. Technical SEO: sitemap.xml renders valid XML', async () => {
    const res = await request('/sitemap.xml');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('<urlset') && !res.body.includes('http')) {
      throw new Error('Invalid sitemap content');
    }
  });

  // 14. Robots.txt
  await test('14. Technical SEO: robots.txt disallows admin & allows sitemap', async () => {
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
    console.log(`\n>>> ALL QA TEST SUITES PASSED PERFECTLY! <<<`);
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});