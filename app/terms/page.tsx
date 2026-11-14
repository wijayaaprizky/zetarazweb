import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { getPageContent } from '@/lib/pagesContent';
import {
  Scale,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ketentuan Pengguna (Terms of Service) — ZETARAZ Knowledge',
  description:
    'Syarat dan ketentuan resmi penggunaan platform ZETARAZ Knowledge, hak cipta konten edukatif, etika pengutipan, dan tanggung jawab pengguna.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
};

export default function TermsPage() {
  const content = getPageContent('terms');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Ketentuan Pengguna</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>{content.heroBadge}</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {content.heroDescription}
          </p>
          <div className="text-xs text-slate-400 mt-4">
            {content.effectiveDate}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          {(content.sections || []).map((sec, idx) => (
            <div key={idx} className={idx > 0 ? 'border-t border-slate-100 pt-6' : ''}>
              <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
                <span className="text-brand-teal font-black text-sm">{idx + 1}.</span>
                {sec.title}
              </h2>
              <p className="whitespace-pre-line mb-3">{sec.content}</p>
              {sec.noteBox && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 mt-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>{sec.noteBox}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
