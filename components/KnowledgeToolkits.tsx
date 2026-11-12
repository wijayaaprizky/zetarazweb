import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  CheckSquare,
  FileSpreadsheet,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  FolderGit2,
  Sparkles,
} from 'lucide-react';

export default function KnowledgeToolkits() {
  const toolkits = [
    {
      title: 'Kanvas Arsitektur Sistem 4-Lapisan',
      subtitle: 'Enterprise Architecture Blueprint',
      domain: 'Business & Management',
      slug: 'business-management',
      desc: 'Kerangka berpikir visual untuk memetakan keterhubungan antara tujuan bisnis, arsitektur data, tumpukan aplikasi, dan infrastruktur komputasi.',
      icon: FolderGit2,
      tag: 'Framework Desain',
    },
    {
      title: 'Matriks Evaluasi Keabsahan Bukti Riset',
      subtitle: 'Scientific Evidence Hierarchy',
      domain: 'Science & Research',
      slug: 'science-research',
      desc: 'Rubrik penilaian kritis untuk membedakan antara klaim korelasi kebetulan, studi sampel kecil, dan bukti empiris kausalitas yang sahih.',
      icon: CheckSquare,
      tag: 'Metodologi Saintifik',
    },
    {
      title: 'Protokol Higienitas Keamanan Akun Digital',
      subtitle: 'Cyber Hygiene Standard',
      domain: 'Technology',
      slug: 'technology',
      desc: 'Daftar periksa esensial untuk memproteksi identitas digital, penerapan 2FA berbasis hardware/app, enkripsi berkas, dan mitigasi phishing.',
      icon: ShieldAlert,
      tag: 'Keamanan Siber',
    },
    {
      title: 'Checklist Analisis & Pembersihan Data',
      subtitle: 'Data Cleansing & Wrangling Guide',
      domain: 'Data & Analytics',
      slug: 'data-analytics',
      desc: 'Panduan langkah-demi-langkah mendeteksi nilai hilang (nulls), normalisasi format waktu, mitigasi bias sampel, dan visualisasi beretika.',
      icon: FileSpreadsheet,
      tag: 'Sains Data Terapan',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-3 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wrench className="w-4 h-4 text-brand-teal" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Perkakas & Kerangka Kerja
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-navy">
              Instrumen & Panduan Praktis Terbuka
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Kerangka kerja konseptual yang siap Anda gunakan untuk memecahkan masalah riil di dunia kerja dan penyelidikan ilmiah.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-navy uppercase tracking-wider group shrink-0"
          >
            <span>Seluruh Layanan & Program</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolkits.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mb-4 border border-teal-100 group-hover:bg-brand-navy group-hover:text-teal-300 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-teal-50/80 px-2 py-0.5 rounded-md inline-block mb-2">
                    {tool.tag}
                  </span>

                  <h3 className="font-heading font-bold text-base text-slate-900 mb-1 leading-snug group-hover:text-brand-blue transition-colors">
                    <Link href={`/category/${tool.slug}`}>
                      {tool.title}
                    </Link>
                  </h3>

                  <div className="text-[11px] font-medium text-slate-400 mb-3">
                    {tool.subtitle}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6 font-normal">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {tool.domain}
                  </span>
                  <Link
                    href={`/category/${tool.slug}`}
                    className="text-brand-teal hover:text-brand-navy font-bold inline-flex items-center gap-1"
                  >
                    <span>Buka Panduan</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
