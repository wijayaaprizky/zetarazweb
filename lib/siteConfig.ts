/**
 * Site Configuration & Domain Resolution Engine for ZETARAZ Knowledge
 * 
 * FIREBASE APP HOSTING & DOMAIN MIGRATION ARCHITECTURE:
 * - Phase 1 (Initial Launch): Deployed using Firebase-provided domain (e.g. https://<firebase-site-id>.web.app).
 * - Phase 2 (Future Migration): Zero-downtime transition to custom domain (e.g. https://zetaraz.com).
 * 
 * Principles:
 * 1. Environment-based configuration (NEXT_PUBLIC_SITE_URL).
 * 2. Never hardcode the public domain in application logic.
 * 3. Use relative URLs for internal routing.
 * 4. Slugs and database records are 100% independent of hosting domain.
 * 5. Dynamic canonical URLs, sitemaps, robots.txt, and metadata.
 * 6. Automated 301 redirect capability from Firebase domain to custom domain when migration is completed.
 */

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // Cloud Run / Vercel container fallback if set
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

/**
 * Returns an absolute canonical URL for any given path or slug.
 */
export function getCanonicalUrl(path: string = ''): string {
  const base = getSiteUrl();
  if (!path) return base;

  // If path is already a full absolute URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Returns the hostname of the active site (e.g. "zetaraz-knowledge.web.app" or "zetaraz.com").
 */
export function getDomainHost(): string {
  try {
    const url = new URL(getSiteUrl());
    return url.host;
  } catch {
    return 'localhost:3000';
  }
}

/**
 * Checks whether a custom domain is active (as opposed to default Firebase or localhost).
 */
export function isCustomDomainConfigured(): boolean {
  const url = getSiteUrl();
  return (
    !url.includes('.web.app') &&
    !url.includes('.firebaseapp.com') &&
    !url.includes('localhost')
  );
}

export const SITE_METADATA = {
  name: 'ZETARAZ Knowledge',
  tagline: 'Berbagi Pengetahuan, Berbagi Pengalaman.',
  supporting: 'Temukan Pengetahuan. Perluas Wawasan.',
  description:
    'Platform independen berbagi pengetahuan yang menyajikan informasi, wawasan, pengalaman praktis, panduan langkah-demi-langkah (tutorial), dan konten edukatif lintas disiplin ilmu.',
  author: 'Rizky Aditya Pratama Wijaya',
  locale: 'id_ID',
};
