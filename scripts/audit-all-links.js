const http = require('http');

const BASE_URL = 'http://localhost:3000';

function get(path) {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}${path}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', (err) => resolve({ statusCode: 500, error: err.message }));
  });
}

async function audit() {
  console.log('Auditing site links...');
  const pages = ['/', '/about', '/search', '/category/pengetahuan', '/category/pengalaman', '/category/opini'];
  
  const visited = new Set();
  const queue = [...pages];
  const linksFound = new Set();
  const brokenLinks = [];
  const anchorChecks = [];

  for (const page of pages) {
    const res = await get(page);
    if (res.statusCode !== 200) {
      brokenLinks.push({ page, status: res.statusCode });
      continue;
    }

    // Extract all hrefs
    const regex = /href=["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(res.body)) !== null) {
      const href = match[1];
      if (href.startsWith('/') && !href.startsWith('//')) {
        linksFound.add(href);
        if (href.includes('#')) {
          const [base, anchor] = href.split('#');
          anchorChecks.push({ source: page, base: base || page, anchor, full: href });
        }
      }
    }
  }

  // Check all unique base routes
  const baseRoutes = new Set([...linksFound].map((l) => l.split('#')[0]).filter(Boolean));
  for (const route of baseRoutes) {
    const res = await get(route);
    if (res.statusCode !== 200) {
      brokenLinks.push({ route, status: res.statusCode });
    }
  }

  // Check anchors
  for (const check of anchorChecks) {
    const res = await get(check.base);
    if (res.statusCode === 200) {
      const hasId = res.body.includes(`id="${check.anchor}"`) || res.body.includes(`id='${check.anchor}'`);
      if (!hasId) {
        brokenLinks.push({ ...check, reason: `Anchor #${check.anchor} not found on ${check.base}` });
      }
    }
  }

  console.log('Total Internal Links checked:', linksFound.size);
  console.log('Broken Links / Anchors:', JSON.stringify(brokenLinks, null, 2));
}

audit();
