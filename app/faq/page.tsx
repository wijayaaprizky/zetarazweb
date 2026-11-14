import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { getPageContent } from '@/lib/pagesContent';
import {
  HelpCircle,
  BookOpen,
  ShieldCheck,
  Send,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — ZETARAZ Knowledge',
  description:
    'Pertanyaan yang sering diajukan mengenai ZETARAZ Knowledge, tujuan platform, kurasi naskah, panduan kontribusi, dan lisensi konten.',
  alternates: {
    canonical: getCanonicalUrl('/faq'),
  },
};

const categoryIcons = [BookOpen, ShieldCheck, Send];

export default function FAQPage() {
  const content = getPageContent('faq');

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
            <span className="font-semibold text-slate-800">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{content.heroBadge}</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {content.heroTitle}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {content.heroDescription}
          </p>
        </div>
      </section>

      {/* Main Categories & Questions */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {(content.categories || []).map((cat, cIdx) => {
            const Icon = categoryIcons[cIdx % categoryIcons.length];
            return (
              <div key={cIdx} className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-brand-navy">
                    {cat.category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {(cat.questions || []).map((item, qIdx) => (
                    <div
                      key={qIdx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                    >
                      <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                        {item.q}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center">
          <h3 className="font-heading font-bold text-lg text-teal-950 mb-2">
            Punya Pertanyaan Lain yang Belum Terjawab?
          </h3>
          <p className="text-sm text-teal-800 max-w-lg mx-auto mb-6">
            Tim redaksi siap menyimak masukan dan pertanyaan Anda. Hubungi kami melalui formulir kontak.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-navy hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
          >
            <span>Hubungi Tim Kami</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
