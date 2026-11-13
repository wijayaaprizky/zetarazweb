import fs from 'fs';
import path from 'path';

export interface SiteLink {
  name: string;
  href: string;
}

export interface SiteSettings {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  description: string;
  motto: string;
  location: string;
  contactEmail: string;
  copyrightText: string;
  directoryLinks: SiteLink[];
  legalLinks: SiteLink[];
}

export const defaultSettings: SiteSettings = {
  brandName: 'ZETARAZ',
  brandSubtitle: 'Knowledge',
  tagline: 'Berbagi Pengetahuan, Berbagi Pengalaman',
  description:
    'ZETARAZ Knowledge adalah wadah independen untuk membaca, memahami, dan berbagi wawasan bermakna. Kami menghadirkan telaah terstruktur, catatan pengalaman lapangan, serta panduan praktis lintas disiplin ilmu yang mudah dipelajari oleh siapa saja.',
  motto: 'Temukan Pengetahuan. Perluas Wawasan.',
  location: 'Indonesia',
  contactEmail: 'kontak@zetaraz.org',
  copyrightText: 'Berbagi Pengetahuan, Berbagi Pengalaman. Terbuka untuk semua pembelajar.',
  directoryLinks: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Layanan & Program', href: '/services' },
    { name: 'Semua Artikel', href: '/articles' },
    { name: 'Pencarian Topik', href: '/search' },
  ],
  legalLinks: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Ketentuan Pengguna (Terms)', href: '/terms' },
    { name: 'Kebijakan Privasi (Privacy)', href: '/privacy' },
    { name: 'Disclaimer (Penafian)', href: '/disclaimer' },
    { name: 'Pusat Bantuan (Support)', href: '/support' },
    { name: 'Hubungi Kami', href: '/contact' },
  ],
};

const globalForSettings = globalThis as unknown as {
  siteSettings: SiteSettings | undefined;
};

function getFilePath(): string {
  if (process.env.VERCEL) {
    const tmpPath = '/tmp/siteSettings.json';
    if (!fs.existsSync(tmpPath)) {
      const orig = path.join(process.cwd(), 'data', 'siteSettings.json');
      if (fs.existsSync(orig)) {
        try {
          fs.copyFileSync(orig, tmpPath);
        } catch {}
      }
    }
    return tmpPath;
  }
  return path.join(process.cwd(), 'data', 'siteSettings.json');
}

export function getSiteSettings(): SiteSettings {
  try {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      const merged: SiteSettings = { ...defaultSettings, ...parsed };
      globalForSettings.siteSettings = merged;
      return merged;
    }
    const orig = path.join(process.cwd(), 'data', 'siteSettings.json');
    if (fs.existsSync(orig)) {
      const raw = fs.readFileSync(orig, 'utf-8');
      const parsed = JSON.parse(raw);
      const merged: SiteSettings = { ...defaultSettings, ...parsed };
      globalForSettings.siteSettings = merged;
      return merged;
    }
  } catch (err) {
    console.error('Error reading site settings, using fallback/default:', err);
  }

  if (globalForSettings.siteSettings) {
    return globalForSettings.siteSettings;
  }

  globalForSettings.siteSettings = defaultSettings;
  return defaultSettings;
}

export function saveSiteSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings();
  const merged: SiteSettings = {
    ...current,
    ...newSettings,
  };

  globalForSettings.siteSettings = merged;

  try {
    const filePath = getFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');

    if (!process.env.VERCEL) {
      const localPath = path.join(process.cwd(), 'data', 'siteSettings.json');
      if (localPath !== filePath) {
        fs.writeFileSync(localPath, JSON.stringify(merged, null, 2), 'utf-8');
      }
    }
  } catch (err) {
    console.error('Failed to persist site settings to disk:', err);
  }

  return merged;
}
