import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'ZETARAZ — Independent Knowledge Company | KMS & Research Portal',
    template: '%s | ZETARAZ',
  },
  description:
    'ZETARAZ adalah platform manajemen pengetahuan independen yang mengintegrasikan sains informasi, metodologi riset empiris, arsitektur enterprise, dan eksplorasi teknologi terpadu.',
  keywords: [
    'Knowledge Management System',
    'KMS',
    'Manajemen Pengetahuan',
    'Arsitektur Enterprise',
    'Business Process Management',
    'BPM',
    'Kecerdasan Buatan',
    'Sains Data',
    'Metodologi Riset',
    'ZETARAZ',
  ],
  authors: [{ name: 'ZETARAZ Editorial & Research Board' }],
  creator: 'ZETARAZ',
  publisher: 'ZETARAZ Independent Knowledge Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'ZETARAZ Knowledge Platform',
    title: 'ZETARAZ — Knowledge. Intelligence. Discovery.',
    description:
      'Platform manajemen pengetahuan terintegrasi dan portal wawasan ilmiah independen.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'ZETARAZ Knowledge Management System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZETARAZ — Knowledge. Intelligence. Discovery.',
    description:
      'Platform manajemen pengetahuan terintegrasi dan portal wawasan ilmiah independen.',
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
    '@type': 'Organization',
    name: 'ZETARAZ',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
    description: 'An Independent Knowledge Company dedicated to knowledge management, education, and research.',
    slogan: 'Knowledge. Intelligence. Discovery.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@zetaraz.com',
      contactType: 'editorial office',
    },
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ZETARAZ',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
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
