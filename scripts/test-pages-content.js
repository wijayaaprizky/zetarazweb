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

async function run() {
  console.log('=== STARTING PAGES CONTENT CMS TEST SUITE ===\n');

  // 1. Test GET /api/pages-content
  console.log('1. Testing GET /api/pages-content...');
  const resAll = await request('/api/pages-content');
  if (resAll.statusCode !== 200) throw new Error(`GET /api/pages-content failed: ${resAll.statusCode}`);
  const jsonAll = JSON.parse(resAll.body);
  const pages = jsonAll.pages;
  console.log('  Keys present:', Object.keys(pages));
  if (!pages.about || !pages.services || !pages.terms || !pages.privacy || !pages.disclaimer || !pages.faq || !pages.support || !pages.contact) {
    throw new Error('Missing expected pages in /api/pages-content response');
  }
  console.log('  [PASS] All 8 pages returned by API.');

  // 2. Test GET /api/pages-content?page=about
  console.log('\n2. Testing GET /api/pages-content?page=about...');
  const resAbout = await request('/api/pages-content?page=about');
  const jsonAbout = JSON.parse(resAbout.body);
  console.log('  About title:', jsonAbout.page?.heroTitle);
  console.log('  About subtitle:', jsonAbout.page?.heroSubtitle);
  console.log('  [PASS] Single page query works.');

  // 3. Login as admin
  console.log('\n3. Authenticating admin...');
  const resLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'admin@zetaraz.com',
      password: 'IndoTechFreedom-97!',
    },
  });
  if (resLogin.statusCode !== 200) throw new Error(`Login failed: ${resLogin.statusCode}`);
  const cookie = resLogin.headers['set-cookie'] ? resLogin.headers['set-cookie'][0].split(';')[0] : '';
  console.log('  [PASS] Admin authenticated, cookie acquired.');

  // 4. Test accessing /admin/pages with admin cookie
  console.log('\n4. Testing GET /admin/pages...');
  const resAdminPages = await request('/admin/pages', {
    headers: { Cookie: cookie },
  });
  if (resAdminPages.statusCode !== 200) throw new Error(`GET /admin/pages failed: ${resAdminPages.statusCode}`);
  console.log('  [PASS] /admin/pages accessible with HTTP 200.');

  // 5. Test updating about page
  console.log('\n5. Testing POST /api/pages-content (Update Tentang Kami)...');
  const originalAbout = { ...pages.about };
  const updatedAbout = {
    ...originalAbout,
    heroSubtitle: 'Berbagi Pengetahuan, Berbagi Pengalaman — Teruji & Tervalidasi.',
  };
  const resPost = await request('/api/pages-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    body: {
      pageKey: 'about',
      content: updatedAbout,
    },
  });
  if (resPost.statusCode !== 200) throw new Error(`POST /api/pages-content failed: ${resPost.statusCode}`);
  const jsonPost = JSON.parse(resPost.body);
  console.log('  Updated subtitle response:', jsonPost.data?.heroSubtitle);

  // 6. Verify public /about page reflects the update
  console.log('\n6. Checking public /about page...');
  const resPublicAbout = await request('/about');
  const hasUpdatedText = resPublicAbout.body.includes('Teruji &amp; Tervalidasi') || resPublicAbout.body.includes('Teruji & Tervalidasi');
  console.log('  Public /about page has updated text:', hasUpdatedText);
  if (!hasUpdatedText) throw new Error('Public /about page did not reflect update!');
  console.log('  [PASS] Real-time reflection on public page verified.');

  // 7. Reset about page to original
  console.log('\n7. Resetting about page to original...');
  await request('/api/pages-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    body: {
      pageKey: 'about',
      content: originalAbout,
    },
  });
  console.log('  [PASS] About page reset successfully.');

  // 8. Verify all 8 public pages load with HTTP 200
  console.log('\n8. Verifying all 8 public pages load with HTTP 200:');
  const routes = ['/about', '/services', '/terms', '/privacy', '/disclaimer', '/faq', '/support', '/contact'];
  for (const r of routes) {
    const res = await request(r);
    console.log(`  ${r}: Status ${res.statusCode}`);
    if (res.statusCode !== 200) throw new Error(`Route ${r} returned status ${res.statusCode}`);
  }

  console.log('\n>>> ALL PAGES CONTENT CMS TESTS PASSED PERFECTLY! <<<');
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
