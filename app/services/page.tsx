import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { getPageContent } from '@/lib/pagesContent';
import {
  Sparkles,
  BookOpen,
  Share2,
  Search,
  GraduationCap,
  Users2,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layanan & Program Inisiatif — ZETARAZ Knowledge',
  description:
    'Eksplorasi layanan kurasi editorial, repositori pengetahuan terbuka, program berbagi pengalaman, dan kemitraan literasi di ZETARAZ Knowledge.',
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
};

const iconList = [BookOpen, Share2, Search, GraduationCap, Users2];

export default function ServicesPage() {
  const content = getPageContent('services');

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
            <span className="font-semibold text-slate-800">Layanan & Program</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
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

      {/* Programs Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {(content.programs || []).map((prog, idx) => {
            const Icon = iconList[idx % iconList.length];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 block mb-1">
                        {prog.subtitle}
                      </span>
                      <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
                        {prog.title}
                      </h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {prog.desc}
                    </p>
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {(prog.benefits || []).map((benefit, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-brand-navy to-slate-900 rounded-2xl p-8 sm:p-10 text-white text-center border border-slate-800">
          <h3 className="font-heading font-bold text-2xl mb-3">
            Tertarik Menjadi Kontributor atau Mitra Literasi?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
            Mari berkolaborasi mendokumentasikan wawasan, merawat budaya literasi terbuka, dan berbagi manfaat nyata bagi pembelajar di Indonesia.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-lg"
          >
            <span>Hubungi Tim Redaksi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
