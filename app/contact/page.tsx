import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { getPageContent } from '@/lib/pagesContent';
import ContactForm from '@/components/ContactForm';
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hubungi Kami (Contact Us) — ZETARAZ Knowledge',
  description:
    'Hubungi tim redaksi ZETARAZ Knowledge untuk pertanyaan umum, pengajuan naskah artikel, masukan editorial, dan kolaborasi inisiatif terbuka.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
};

export default function ContactPage() {
  const content = getPageContent('contact');

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
            <span className="font-semibold text-slate-800">Hubungi Kami</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
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

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                  Kontak Langsung
                </span>
                <h2 className="font-heading font-extrabold text-xl text-brand-navy mt-1">
                  Saluran Informasi Resmi
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Silakan hubungi alamat surel yang sesuai dengan keperluan Anda agar tim kami dapat merespons secara terarah.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Pertanyaan & Umum
                    </div>
                    <a
                      href={`mailto:${content.publicEmail}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-brand-blue"
                    >
                      {content.publicEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Redaksi & Pengiriman Naskah
                    </div>
                    <a
                      href={`mailto:${content.editorialEmail}`}
                      className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-brand-blue"
                    >
                      {content.editorialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Basis Inisiatif
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900">
                      {content.officeLocation}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Waktu Pelayanan Redaksi
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900">
                      {content.operatingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guidelines Box */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Etika Pengiriman Pesan</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {content.guidelinesText}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
