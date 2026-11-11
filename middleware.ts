import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware for ZETARAZ Knowledge
 * 
 * Handles:
 * 1. Future Custom Domain Redirect:
 *    When CUSTOM_DOMAIN_REDIRECT_TARGET is set (e.g. "zetaraz.com"),
 *    automatically issues a 301 Permanent Redirect for any traffic
 *    arriving at the legacy *.web.app or *.firebaseapp.com domain.
 * 2. Security Headers (HSTS, X-Content-Type-Options, etc.).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const targetCustomDomain =
    process.env.CUSTOM_DOMAIN_REDIRECT_TARGET || process.env.CUSTOM_DOMAIN;

  // If a migration target domain is configured and the request arrives on a Firebase subdomain
  if (
    targetCustomDomain &&
    (host.endsWith('.web.app') || host.endsWith('.firebaseapp.com')) &&
    !host.includes(targetCustomDomain)
  ) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = targetCustomDomain;
    url.port = '';

    // Issue 301 Permanent Redirect to preserve SEO equity
    return NextResponse.redirect(url, { status: 301 });
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
