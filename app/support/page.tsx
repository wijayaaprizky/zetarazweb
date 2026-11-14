import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { getPageContent } from '@/lib/pagesContent';
import {
  LifeBuoy,
  BookOpen,
  Mail,
  Bug,
  FileQuestion,
  ChevronRight,
  Clock,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pusat Bantuan (Support & Help Center) — ZETARAZ Knowledge',
  description:
    'Pusat bantuan pembaca dan kontributor ZETARAZ Knowledge: panduan navigasi, solusi kendala teknis, dan kontak tim dukungan redaksi.',
  alternates: {
    canonical: getCanonicalUrl('/support'),
  },
};

const topicIcons = [BookOpen, Mail, Bug, FileQuestion];

export default function SupportPage() {
  const content = getPageContent('support');

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
            <span className="font-semibold text-slate-800">Pusat Bantuan</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <LifeBuoy className="w-3.5 h-3.5" />
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

      {/* Support Topics Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {(content.topics || []).map((topic, idx) => {
            const Icon = topicIcons[idx % topicIcons.length];
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mb-4 border border-teal-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {topic.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={topic.linkHref || '/contact'}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-navy transition-colors uppercase tracking-wider"
                  >
                    <span>{topic.linkText}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment Box */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900 mb-1">
                Waktu Respons Cepat
              </h4>
              <p className="text-xs text-slate-500">
                {content.responseTimeText}
              </p>
            </div>

            <div className="p-4 border-t md:border-t-0 md:border-l border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900 mb-1">
                Transparansi Editorial
              </h4>
              <p className="text-xs text-slate-500">
                Koreksi data atau penambahan rujukan ditindaklanjuti secara terbuka di catatan revisi artikel.
              </p>
            </div>

            <div className="p-4 border-t md:border-t-0 md:border-l border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-sm text-slate-900 mb-1">
                Surel Dukungan Resmi
              </h4>
              <p className="text-xs text-slate-500">
                Hubungi langsung:{' '}
                <a href={`mailto:${content.supportEmail}`} className="text-brand-blue font-bold hover:underline">
                  {content.supportEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
