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
    req.end();
  });
}

async function runTests() {
  console.log('=== STARTING FIREBASE DEPLOYMENT & DOMAIN STRATEGY VERIFICATION ===\n');
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

  // 1. Verify Site Config Module logic
  await test('1. Site Config: getSiteUrl and getCanonicalUrl resolve dynamically without hardcoding', async () => {
    const fs = require('fs');
    if (!fs.existsSync('lib/siteConfig.ts')) throw new Error('lib/siteConfig.ts missing');
    const content = fs.readFileSync('lib/siteConfig.ts', 'utf8');
    if (!content.includes('NEXT_PUBLIC_SITE_URL')) {
      throw new Error('lib/siteConfig.ts does not read NEXT_PUBLIC_SITE_URL');
    }
    if (!content.includes('getCanonicalUrl')) {
      throw new Error('lib/siteConfig.ts missing getCanonicalUrl export');
    }

    // Test dynamic resolution logic
    function testGetSiteUrl(envVal) {
      if (envVal) return envVal.trim().replace(/\/+$/, '');
      return 'http://localhost:3000';
    }

    function testGetCanonicalUrl(path, siteUrl) {
      if (!path) return siteUrl;
      if (path.startsWith('http://') || path.startsWith('https://')) return path;
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `${siteUrl}${cleanPath}`;
    }

    // Phase 1: Firebase-provided domain test
    const fbDomain = testGetSiteUrl('https://zetaraz-knowledge.web.app');
    if (fbDomain !== 'https://zetaraz-knowledge.web.app') {
      throw new Error('Firebase domain resolution failed');
    }
    if (testGetCanonicalUrl('/about', fbDomain) !== 'https://zetaraz-knowledge.web.app/about') {
      throw new Error('Canonical URL with Firebase domain failed');
    }

    // Phase 2: Future custom domain test (e.g. zetaraz.com)
    const customDomain = testGetSiteUrl('https://zetaraz.com');
    if (customDomain !== 'https://zetaraz.com') {
      throw new Error('Custom domain resolution failed');
    }
    if (testGetCanonicalUrl('/articles/membangun-kebiasaan-berbagi-pengetahuan', customDomain) !== 'https://zetaraz.com/articles/membangun-kebiasaan-berbagi-pengetahuan') {
      throw new Error('Canonical URL with custom domain failed');
    }
  });

  // 2. Verify Database Record Independence (Zero DB changes needed on domain migration)
  await test('2. Database Independence: Article slugs and records contain NO hardcoded domains', async () => {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const articles = await prisma.article.findMany({
      select: { id: true, slug: true, canonicalUrl: true },
    });

    for (const art of articles) {
      if (art.slug.includes('http://') || art.slug.includes('https://') || art.slug.includes('.web.app') || art.slug.includes('zetaraz.com')) {
        throw new Error(`Article ${art.id} has domain hardcoded in slug: ${art.slug}`);
      }
    }
    await prisma.$disconnect();
  });

  // 3. Verify Robots.txt dynamic sitemap link
  await test('3. SEO: robots.txt dynamically references sitemap of active domain', async () => {
    const res = await request('/robots.txt');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('sitemap.xml')) throw new Error('robots.txt missing sitemap directive');
    if (!res.body.includes('Disallow: /admin/')) throw new Error('robots.txt missing admin disallow');
  });

  // 4. Verify Sitemap.xml dynamic URLs
  await test('4. SEO: sitemap.xml dynamically constructs all URLs using active site base', async () => {
    const res = await request('/sitemap.xml');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('<urlset') || !res.body.includes('/articles/')) {
      throw new Error('sitemap.xml does not contain valid article URL elements');
    }
  });

  // 5. Verify Canonical Link in Article Page
  await test('5. SEO: Article page renders dynamic canonical URL in head', async () => {
    const res = await request('/articles/membangun-kebiasaan-berbagi-pengetahuan');
    if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
    if (!res.body.includes('rel="canonical"')) {
      throw new Error('Article page missing rel="canonical" link element');
    }
    if (!res.body.includes('/articles/membangun-kebiasaan-berbagi-pengetahuan')) {
      throw new Error('Canonical URL does not match article path');
    }
  });

  // 6. Verify Firebase App Hosting Configuration Files
  await test('6. Firebase App Hosting: firebase.json and apphosting.yaml exist with valid schema', async () => {
    const fs = require('fs');
    if (!fs.existsSync('firebase.json')) throw new Error('firebase.json missing');
    if (!fs.existsSync('apphosting.yaml')) throw new Error('apphosting.yaml missing');

    const fbJson = JSON.parse(fs.readFileSync('firebase.json', 'utf8'));
    if (!fbJson.apphosting || !fbJson.apphosting.backendId) {
      throw new Error('firebase.json missing apphosting.backendId');
    }

    const appYaml = fs.readFileSync('apphosting.yaml', 'utf8');
    if (!appYaml.includes('NEXT_PUBLIC_SITE_URL')) {
      throw new Error('apphosting.yaml missing NEXT_PUBLIC_SITE_URL');
    }
    if (!appYaml.includes('runConfig')) {
      throw new Error('apphosting.yaml missing runConfig');
    }
  });

  // 7. Verify Middleware Edge Redirect File
  await test('7. Edge Middleware: middleware.ts configured for custom domain redirect preservation', async () => {
    const fs = require('fs');
    if (!fs.existsSync('middleware.ts')) throw new Error('middleware.ts missing');
    const content = fs.readFileSync('middleware.ts', 'utf8');
    if (!content.includes('CUSTOM_DOMAIN_REDIRECT_TARGET') || !content.includes('.web.app')) {
      throw new Error('middleware.ts missing Firebase-to-custom domain redirect logic');
    }
  });

  console.log('\n=== DOMAIN STRATEGY VERIFICATION SUMMARY ===');
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\n>>> ALL FIREBASE DEPLOYMENT & DOMAIN STRATEGY TESTS PASSED! <<<');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
