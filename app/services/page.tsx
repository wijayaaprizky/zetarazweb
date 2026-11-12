import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  Sparkles,
  BookOpen,
  Share2,
  FileText,
  Search,
  GraduationCap,
  Users2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Layanan & Program Inisiatif — ZETARAZ Knowledge',
  description:
    'Eksplorasi layanan kurasi editorial, repositori pengetahuan terbuka, program berbagi pengalaman, dan kemitraan literasi di ZETARAZ Knowledge.',
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
};

export default function ServicesPage() {
  const programs = [
    {
      icon: BookOpen,
      title: 'Kurasi & Publikasi Pengetahuan Terbuka',
      subtitle: 'Standar Redaksi Profesional',
      desc: 'Kami membantu mengolah wawasan konseptual dan rujukan teoretis menjadi naskah bacaan yang mudah dipahami, berbobot, dan dapat diakses gratis oleh masyarakat luas tanpa pembatas biaya.',
      benefits: [
        'Penyuntingan bahasa yang lugas dan terstruktur',
        'Validasi rujukan primer dan cek silang fakta',
        'Format tata letak ramah pembaca di berbagai perangkat',
      ],
    },
    {
      icon: Share2,
      title: 'Program Kolaborasi Berbagi Pengalaman',
      subtitle: 'Dari Praktik Lapangan Menuju Wawasan Kolektif',
      desc: 'Wadah bagi praktisi, akademisi, dan pembelajar mandiri untuk mendokumentasikan pelajaran berharga, pemecahan masalah nyata, dan studi kasus dari pengalaman kerja sehari-hari.',
      benefits: [
        'Alur penulisan mudah melalui integrasi Google Docs',
        'Bimbingan editorial dari draf hingga tayang',
        'Profil penulis terverifikasi untuk rekam jejak profesional',
      ],
    },
    {
      icon: Search,
      title: 'Repositori & Indeks Pengetahuan Lintas Bidang',
      subtitle: 'Koleksi Terstruktur & Terindeks',
      desc: 'Sistem pengindeksan digital yang mengorganisir pengetahuan ke dalam 6 domain utama: Knowledge, Technology, Science & Research, Data & Analytics, Business Management, dan Learning.',
      benefits: [
        'Fitur pencarian instan dan filter tipe konten',
        'Pengelompokan tag tematik yang terhubung',
        'Akses terbuka 24/7 dengan performa cepat',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Panduan Praktis & Sumber Belajar Mandiri',
      subtitle: 'Tutorial Langkah-demi-Langkah',
      desc: 'Penyusunan panduan aplikatif untuk memecahkan masalah nyata—seperti pemodelan alur kerja BPM, analitika data terapan, hingga higienitas keamanan siber.',
      benefits: [
        'Penjelasan berjenjang dari dasar ke mahir',
        'Disertai ilustrasi visual dan diagram alur',
        'Contoh kasus yang relevan dengan konteks Indonesia',
      ],
    },
    {
      icon: Users2,
      title: 'Kemitraan Komunitas & Institusi Pembelajar',
      subtitle: 'Sinergi Literasi & Edukasi',
      desc: 'Kami membuka kerja sama dengan komunitas belajar, lembaga riset, universitas, dan inisiatif nirlaba untuk memperluas akses wawasan dan literasi kritis.',
      benefits: [
        'Kolaborasi penulisan seri wawasan khusus',
        'Penyebaran materi edukatif ke jaringan pembaca yang tepat',
        'Prinsip non-komersial dan bebas kepentingan tersembunyi',
      ],
    },
    {
      icon: FileText,
      title: 'Buletin Wawasan Terkurasi (Curated Digest)',
      subtitle: 'Ringkasan Berkala Langsung ke Surel',
      desc: 'Layanan kurasi mingguan yang menyajikan intisari tulisan terbaik, rekomendasi bahan bacaan, dan kabar terbaru seputar perkembangan ilmu dan teknologi.',
      benefits: [
        'Bebas dari promosi sampah (*zero spam*)',
        'Mudah dibaca dalam waktu kurang dari 5 menit',
        'Dapat dibatalkan langganannya kapan saja dengan mudah',
      ],
    },
  ];

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
            <span>Pilar & Layanan Inisiatif</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Layanan & Program Pengetahuan
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Bagaimana ZETARAZ Knowledge mengorganisir wawasan, mendukung penulis mandiri, dan menyajikan materi belajar bermutu untuk semua orang.
          </p>
        </div>
      </section>

      {/* Program Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center mb-5 border border-teal-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-teal mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                    Keunggulan & Manfaat:
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 mb-6">
                    {item.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 bg-brand-navy rounded-2xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
              Ingin Berbagi Pengetahuan atau Mengajukan Kolaborasi?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Pintu redaksi kami selalu terbuka bagi siapa saja yang ingin menerbitkan catatan pengalaman atau menyelenggarakan inisiatif belajar bersama.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Ajukan Kolaborasi / Naskah</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Pelajari Filosofi ZETARAZ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
