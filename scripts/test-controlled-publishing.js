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
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          json,
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
  console.log('=== STARTING CONTROLLED PUBLISHING & GOOGLE DOCS SYNC ACCEPTANCE SUITE ===\n');
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

  // 1. Admin Authentication
  let authCookie = '';
  await test('Step 1: Admin Authentication', async () => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { email: 'admin@zetaraz.com', password: 'ZetarazAdmin2026!' },
    });
    if (res.statusCode !== 200 || !res.json?.success) {
      throw new Error('Admin login failed');
    }
    const setCookie = res.headers['set-cookie'];
    authCookie = Array.isArray(setCookie) ? setCookie[0].split(';')[0] : setCookie.split(';')[0];
  });

  // Get a category ID
  let categoryId = '';
  await test('Step 2: Fetch Category ID', async () => {
    const res = await request('/api/categories');
    if (!res.json?.categories?.length) throw new Error('No categories found');
    categoryId = res.json.categories[0].id;
  });

  // Create Initial Article as DRAFT
  let testArticleId = '';
  const uniqueSlug = `uji-coba-publikasi-${Date.now()}`;
  const initialContent = '## Versi Awal Draf\nIni adalah draf awal yang baru dibuat.';

  await test('Step 3: Create Article in DRAFT state', async () => {
    const res = await request('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        title: 'Uji Coba Controlled Publishing ZETARAZ',
        slug: uniqueSlug,
        excerpt: 'Ringkasan pengujian arsitektur persetujuan manual publikasi.',
        content: initialContent,
        categoryId,
        status: 'DRAFT',
        googleDocId: 'https://docs.google.com/document/d/mock_doc_acceptance_test/edit',
      },
    });

    if (res.statusCode !== 201 || !res.json?.success) {
      throw new Error(`Failed to create article: ${res.json?.error || res.statusCode}`);
    }
    testArticleId = res.json.article.id;
  });

  // ACCEPTANCE TEST 6: Publishing a new article requires explicit administrator approval
  await test('Acceptance Test 6: Publishing a new article requires explicit administrator approval', async () => {
    // A. Public page must return 404 before approval
    const publicResBefore = await request(`/articles/${uniqueSlug}`);
    if (publicResBefore.statusCode !== 404) {
      throw new Error(`Draft article must NOT be publicly accessible before approval! Got status: ${publicResBefore.statusCode}`);
    }

    // B. Explicit Publish approval by administrator
    const publishRes = await request(`/api/articles/${testArticleId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: { notes: 'Persetujuan publikasi perdana oleh administrator.' },
    });

    if (publishRes.statusCode !== 200 || !publishRes.json?.success) {
      throw new Error(`Publish failed: ${publishRes.json?.error}`);
    }
    if (publishRes.json.publishedVersion !== 1) {
      throw new Error(`Expected publishedVersion 1, got ${publishRes.json.publishedVersion}`);
    }

    // C. Public page is now accessible with initial content
    const publicResAfter = await request(`/articles/${uniqueSlug}`);
    if (publicResAfter.statusCode !== 200) {
      throw new Error(`Published article should now return 200, got ${publicResAfter.statusCode}`);
    }
    if (!publicResAfter.body.includes('Versi Awal Draf')) {
      throw new Error('Public article content does not match initial approved version');
    }
  });

  // ACCEPTANCE TEST 1: Editing a published Google Doc updates the CMS draft only
  const version2Content = '## Versi Dua Terkini\nWawasan baru hasil sinkronisasi Google Docs.';
  await test('Acceptance Test 1: Editing a published Google Doc updates the CMS draft only', async () => {
    const syncRes = await request(`/api/articles/${testArticleId}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        forceContent: version2Content,
        forceRevision: 'rev_v2_acceptance_test',
      },
    });

    if (syncRes.statusCode !== 200 || !syncRes.json?.success) {
      throw new Error(`Sync failed: ${syncRes.json?.error}`);
    }
    if (syncRes.json.publicationStatus !== 'UPDATE_AVAILABLE') {
      throw new Error(`Expected publicationStatus UPDATE_AVAILABLE, got ${syncRes.json.publicationStatus}`);
    }
    if (syncRes.json.draftVersion !== 2) {
      throw new Error(`Expected draftVersion 2, got ${syncRes.json.draftVersion}`);
    }
    if (syncRes.json.publishedVersion !== 1) {
      throw new Error(`publishedVersion must remain 1, got ${syncRes.json.publishedVersion}`);
    }

    // Check admin article details
    const adminArtRes = await request(`/api/articles/${testArticleId}`, {
      headers: { Cookie: authCookie },
    });
    const art = adminArtRes.json.article;
    if (art.draftContent !== version2Content) {
      throw new Error('draftContent was not updated with new Google Docs revision');
    }
    if (art.publishedContent !== initialContent) {
      throw new Error('CRITICAL VIOLATION: publishedContent was overwritten during sync!');
    }
  });

  // ACCEPTANCE TEST 2: The public article remains unchanged before approval
  await test('Acceptance Test 2: The public article remains unchanged before approval', async () => {
    const publicRes = await request(`/articles/${uniqueSlug}`);
    if (publicRes.statusCode !== 200) throw new Error(`Expected 200, got ${publicRes.statusCode}`);

    // Must still contain initial content
    if (!publicRes.body.includes('Versi Awal Draf')) {
      throw new Error('Public article is missing previous published content!');
    }
    // Must NOT contain unapproved draft content
    if (publicRes.body.includes('Versi Dua Terkini')) {
      throw new Error('CRITICAL VIOLATION: Public article shows unapproved draft content before administrator approval!');
    }

    // Public search must also not leak draft content
    const searchRes = await request(`/api/search?q=${encodeURIComponent('Versi Dua Terkini')}`);
    if (searchRes.json?.articles?.some((a) => a.slug === uniqueSlug)) {
      throw new Error('Public search leaked unapproved draft content!');
    }
  });

  // ACCEPTANCE TEST 3: Clicking Publish Update makes the new version publicly visible
  await test('Acceptance Test 3: Clicking Publish Update makes the new version publicly visible', async () => {
    const publishRes = await request(`/api/articles/${testArticleId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: { notes: 'Pembaruan versi 2 disetujui untuk rilis publik.' },
    });

    if (publishRes.statusCode !== 200 || !publishRes.json?.success) {
      throw new Error(`Publish update failed: ${publishRes.json?.error}`);
    }
    if (publishRes.json.publishedVersion !== 2) {
      throw new Error(`Expected publishedVersion 2, got ${publishRes.json.publishedVersion}`);
    }
    if (publishRes.json.publicationStatus !== 'PUBLISHED') {
      throw new Error(`Expected publicationStatus PUBLISHED, got ${publishRes.json.publicationStatus}`);
    }

    // Now public page MUST display the approved version 2
    const publicRes = await request(`/articles/${uniqueSlug}`);
    if (publicRes.statusCode !== 200) throw new Error(`Expected 200, got ${publicRes.statusCode}`);
    if (!publicRes.body.includes('Versi Dua Terkini')) {
      throw new Error('Public article failed to update to Version 2 after publication approval!');
    }

    // Check history audit trail
    const historyRes = await request(`/api/articles/${testArticleId}/history`, {
      headers: { Cookie: authCookie },
    });
    const pubLogs = historyRes.json.publicationLogs;
    if (!pubLogs.some((l) => l.action === 'PUBLISH_UPDATE' && l.version === 2)) {
      throw new Error('Publication history missing PUBLISH_UPDATE record');
    }
  });

  // ACCEPTANCE TEST 4: Editing the document again creates another pending draft
  const version3Content = '## Versi Tiga Eksperimental\nPerubahan lanjutan yang belum disetujui.';
  await test('Acceptance Test 4: Editing the document again creates another pending draft', async () => {
    const syncRes = await request(`/api/articles/${testArticleId}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        forceContent: version3Content,
        forceRevision: 'rev_v3_acceptance_test',
      },
    });

    if (syncRes.statusCode !== 200 || !syncRes.json?.success) {
      throw new Error(`Sync failed: ${syncRes.json?.error}`);
    }
    if (syncRes.json.publicationStatus !== 'UPDATE_AVAILABLE') {
      throw new Error(`Expected publicationStatus UPDATE_AVAILABLE, got ${syncRes.json.publicationStatus}`);
    }
    if (syncRes.json.draftVersion !== 3) {
      throw new Error(`Expected draftVersion 3, got ${syncRes.json.draftVersion}`);
    }
    if (syncRes.json.publishedVersion !== 2) {
      throw new Error(`publishedVersion must stay 2, got ${syncRes.json.publishedVersion}`);
    }

    // Public article still displays Version 2, NOT Version 3
    const publicRes = await request(`/articles/${uniqueSlug}`);
    if (!publicRes.body.includes('Versi Dua Terkini')) {
      throw new Error('Public article failed to retain Version 2 content!');
    }
    if (publicRes.body.includes('Versi Tiga Eksperimental')) {
      throw new Error('CRITICAL VIOLATION: Public article shows unapproved Version 3!');
    }

    // Idempotency: duplicate notification should NOT create duplicate draft version
    const duplicateSync = await request(`/api/articles/${testArticleId}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        forceContent: version3Content,
        forceRevision: 'rev_v3_acceptance_test',
      },
    });
    if (duplicateSync.json.updated !== false) {
      throw new Error('Idempotency failure: duplicate notification marked as updated');
    }
    if (duplicateSync.json.draftVersion !== 3) {
      throw new Error(`Duplicate notification bumped draft version to ${duplicateSync.json.draftVersion}`);
    }
  });

  // ACCEPTANCE TEST 5: Discarding an update preserves the published version
  await test('Acceptance Test 5: Discarding an update preserves the published version', async () => {
    const discardRes = await request(`/api/articles/${testArticleId}/discard-draft`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: { reason: 'Perubahan versi 3 ditolak oleh dewan redaksi.' },
    });

    if (discardRes.statusCode !== 200 || !discardRes.json?.success) {
      throw new Error(`Discard failed: ${discardRes.json?.error}`);
    }
    if (discardRes.json.publicationStatus !== 'PUBLISHED') {
      throw new Error(`Expected publicationStatus PUBLISHED, got ${discardRes.json.publicationStatus}`);
    }

    // Admin view: draftContent reverted to publishedContent
    const adminArtRes = await request(`/api/articles/${testArticleId}`, {
      headers: { Cookie: authCookie },
    });
    const art = adminArtRes.json.article;
    if (art.draftContent !== version2Content) {
      throw new Error('draftContent was not reverted to published content on discard');
    }
    if (art.draftVersion !== 2) {
      throw new Error(`draftVersion should revert to 2, got ${art.draftVersion}`);
    }

    // Public article remains untouched and valid
    const publicRes = await request(`/articles/${uniqueSlug}`);
    if (!publicRes.body.includes('Versi Dua Terkini')) {
      throw new Error('Public article corrupted after discarding draft update');
    }
  });

  // ACCEPTANCE TEST 7: Synchronization errors never damage published content
  await test('Acceptance Test 7: Synchronization errors never damage published content', async () => {
    // Attempt sync with an invalid Google Doc URL / connection failure
    const errorSyncRes = await request(`/api/articles/${testArticleId}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: authCookie,
      },
      body: {
        googleDocId: 'invalid_non_existent_doc_id_999999999999',
      },
    });

    // Sync should report failure
    if (errorSyncRes.statusCode === 200 && errorSyncRes.json?.success) {
      throw new Error('Expected sync to fail on invalid document target');
    }

    // Verify database state: published content, published version, and publication status are completely undamaged
    const adminArtRes = await request(`/api/articles/${testArticleId}`, {
      headers: { Cookie: authCookie },
    });
    const art = adminArtRes.json.article;
    if (art.publishedContent !== version2Content) {
      throw new Error('CRITICAL VIOLATION: publishedContent was damaged by a sync error!');
    }
    if (art.publishedVersion !== 2) {
      throw new Error(`publishedVersion altered during sync error: ${art.publishedVersion}`);
    }
    if (art.publicationStatus !== 'PUBLISHED') {
      throw new Error(`publicationStatus altered during sync error: ${art.publicationStatus}`);
    }
    if (art.syncStatus !== 'SYNC_ERROR') {
      throw new Error(`Expected syncStatus SYNC_ERROR, got ${art.syncStatus}`);
    }

    // Public website still renders published content without interruption
    const publicRes = await request(`/articles/${uniqueSlug}`);
    if (publicRes.statusCode !== 200 || !publicRes.body.includes('Versi Dua Terkini')) {
      throw new Error('Public article was compromised by a background sync failure!');
    }
  });

  // Clean up test article
  await test('Step 8: Cleanup Test Article', async () => {
    const deleteRes = await request(`/api/articles/${testArticleId}`, {
      method: 'DELETE',
      headers: { Cookie: authCookie },
    });
    if (deleteRes.statusCode !== 200) {
      throw new Error(`Cleanup failed: ${deleteRes.json?.error}`);
    }
  });

  console.log('\n=== CONTROLLED PUBLISHING ACCEPTANCE SUMMARY ===');
  console.log(`Total Criteria Tested: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\n>>> ALL 7 ACCEPTANCE CRITERIA PASSED FLAWLESSLY! <<<');
    process.exit(0);
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
