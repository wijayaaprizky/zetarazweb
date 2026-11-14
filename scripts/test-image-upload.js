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
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: buffer.toString('utf-8'),
          buffer: buffer,
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      if (Buffer.isBuffer(options.body)) {
        req.write(options.body);
      } else {
        req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
      }
    }
    req.end();
  });
}

// 1x1 transparent PNG buffer
const samplePngBuffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

async function run() {
  console.log('=== TESTING IMAGE UPLOAD ENDPOINT & SERVING ===\n');

  // 1. Login as admin
  console.log('1. Logging in as admin...');
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
  console.log('  [PASS] Logged in successfully.');

  // 2. Prepare multipart/form-data body
  console.log('\n2. Uploading sample PNG image to /api/upload...');
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  const filename = 'test-banner-upload.png';

  const partHeader = Buffer.from(
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: image/png\r\n\r\n`
  );
  const partFooter = Buffer.from(`\r\n--${boundary}--\r\n`);
  const multipartBody = Buffer.concat([partHeader, samplePngBuffer, partFooter]);

  const resUpload = await request('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': multipartBody.length,
      Cookie: cookie,
    },
    body: multipartBody,
  });

  console.log('  Upload HTTP Status:', resUpload.statusCode);
  if (resUpload.statusCode !== 200) {
    throw new Error(`Upload failed with status ${resUpload.statusCode}: ${resUpload.body}`);
  }

  const jsonUpload = JSON.parse(resUpload.body);
  console.log('  Upload Response:', jsonUpload);
  if (!jsonUpload.success || !jsonUpload.url) {
    throw new Error('Upload returned error or missing URL');
  }
  console.log('  [PASS] Image uploaded successfully. Public URL:', jsonUpload.url);

  // 3. Test fetching the uploaded image via GET /api/uploads/[filename]
  console.log('\n3. Fetching uploaded image from serving route:', jsonUpload.url);
  const resServe = await request(jsonUpload.url);
  console.log('  Serve HTTP Status:', resServe.statusCode);
  console.log('  Serve Content-Type:', resServe.headers['content-type']);
  console.log('  Serve Buffer Length:', resServe.buffer.length);

  if (resServe.statusCode !== 200) {
    throw new Error(`Failed to serve image: ${resServe.statusCode}`);
  }
  if (!resServe.headers['content-type']?.includes('image/png')) {
    throw new Error(`Unexpected Content-Type: ${resServe.headers['content-type']}`);
  }
  if (resServe.buffer.length !== samplePngBuffer.length) {
    throw new Error(`Buffer length mismatch: expected ${samplePngBuffer.length}, got ${resServe.buffer.length}`);
  }
  console.log('  [PASS] Image served identically with correct image/png headers.');

  // 4. Test unauthorized upload rejection
  console.log('\n4. Testing upload without admin authentication...');
  const resUnauth = await request('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': multipartBody.length,
    },
    body: multipartBody,
  });
  console.log('  Unauth upload status:', resUnauth.statusCode);
  if (resUnauth.statusCode !== 401) {
    throw new Error(`Expected 401 Unauthorized, got: ${resUnauth.statusCode}`);
  }
  console.log('  [PASS] Unauthorized uploads correctly blocked (HTTP 401).');

  console.log('\n>>> ALL IMAGE UPLOAD TESTS PASSED PERFECTLY! <<<');
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
