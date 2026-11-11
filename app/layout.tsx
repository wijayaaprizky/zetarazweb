import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSiteUrl } from '@/lib/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman',
    template: '%s | ZETARAZ Knowledge',
  },
  description:
    'ZETARAZ Knowledge adalah platform berbagi pengetahuan dan pengalaman independen. Temukan artikel edukatif, panduan praktis, wawasan sains, teknologi, analitika data, dan manajemen.',
  keywords: [
    'ZETARAZ Knowledge',
    'Berbagi Pengetahuan',
    'Berbagi Pengalaman',
    'Belajar Mandiri',
    'Teknologi',
    'Sains dan Riset',
    'Data Analytics',
    'Business Process Management',
    'Tutorial Praktis',
    'Edukasi',
  ],
  authors: [{ name: 'Rizky Aditya Pratama Wijaya' }],
  creator: 'ZETARAZ Knowledge',
  publisher: 'ZETARAZ Knowledge',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'ZETARAZ Knowledge',
    title: 'ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman',
    description:
      'Platform independen untuk menemukan pengetahuan, memperluas wawasan, dan bertukar pengalaman bermakna lintas disiplin ilmu.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman',
    description:
      'Platform independen untuk menemukan pengetahuan, memperluas wawasan, dan bertukar pengalaman bermakna lintas disiplin ilmu.',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZETARAZ Knowledge',
    alternateName: 'ZETARAZ',
    url: getSiteUrl(),
    description: 'Platform berbagi pengetahuan dan pengalaman independen lintas disiplin ilmu.',
    headline: 'Berbagi Pengetahuan, Berbagi Pengalaman',
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${getSiteUrl()}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-100 selection:text-teal-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
