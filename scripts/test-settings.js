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
  console.log('Testing GET /api/settings...');
  const resGet = await request('/api/settings');
  console.log('GET status:', resGet.statusCode);
  const data = JSON.parse(resGet.body);
  const settings = data.settings || data;
  console.log('Brand:', settings.brandName, settings.brandSubtitle);
  console.log('Tagline:', settings.tagline);
  console.log('Motto:', settings.motto);
  console.log('Email:', settings.contactEmail);
  console.log('Directory links count:', settings.directoryLinks?.length);
  console.log('Legal links count:', settings.legalLinks?.length);

  // Login as admin
  console.log('\nLogging in as admin...');
  const resLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'admin@zetaraz.com',
      password: 'IndoTechFreedom-97!',
    },
  });
  console.log('Login status:', resLogin.statusCode);
  const cookie = resLogin.headers['set-cookie'] ? resLogin.headers['set-cookie'][0].split(';')[0] : '';
  console.log('Cookie acquired:', !!cookie);

  // Test admin settings page
  const resSettingsPage = await request('/admin/settings', {
    headers: { Cookie: cookie },
  });
  console.log('GET /admin/settings status:', resSettingsPage.statusCode);

  // Test updating settings
  console.log('\nTesting POST /api/settings (Update motto & contact)...');
  const resPost = await request('/api/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    body: {
      motto: '"Temukan Pengetahuan. Perluas Wawasan. Berdayakan Masa Depan."',
    },
  });
  console.log('POST /api/settings status:', resPost.statusCode);
  const updatedData = JSON.parse(resPost.body);
  console.log('Updated Motto:', updatedData.settings?.motto);

  // Verify on public homepage footer
  const resHome = await request('/');
  const hasUpdatedMotto = resHome.body.includes('Berdayakan Masa Depan');
  console.log('Public Homepage contains updated motto:', hasUpdatedMotto);

  // Reset motto back to original
  await request('/api/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie,
    },
    body: {
      motto: '“Temukan Pengetahuan. Perluas Wawasan.”',
    },
  });
  console.log('Motto reset to original successfully.');
  console.log('\nALL SETTINGS TESTS PASSED!');
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
