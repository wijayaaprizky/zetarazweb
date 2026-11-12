import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kebijakan Promosi, Iklan & Kemitraan — ZETARAZ Knowledge',
  description:
    'Panduan resmi kemitraan edukatif, sponsor buletin, dan etika penayangan informasi beriklan di ZETARAZ Knowledge.',
  alternates: {
    canonical: getCanonicalUrl('/advertise'),
  },
};

export default function AdvertisePage() {
  const allowedPartnerships = [
    {
      title: 'Seri Artikel Kemitraan Edukatif',
      desc: 'Penulisan kajian terstruktur atau studi kasus teknologi bersama institusi riset atau pengembang perkakas digital dengan pelabelan transparan "Didukung oleh Mitra".',
    },
    {
      title: 'Sponsorship Buletin Pengetahuan',
      desc: 'Penempatan pengumuman inisiatif literasi, beasiswa, atau rilis platform edukatif di bagian akhir buletin mingguan ZETARAZ tanpa mengganggu alur baca.',
    },
    {
      title: 'Media Partner Kegiatan Akademis',
      desc: 'Dukungan publikasi untuk seminar nasional, konferensi riset, lomba sains data, atau lokakarya teknologi yang berdampak positif bagi masyarakat.',
    },
  ];

  const ethicalPrinciples = [
    {
      title: 'Independensi Redaksi Tetap Mutlak',
      desc: 'Mitra sponsor tidak memiliki kendali atas penilaian objektif atau kesimpulan ilmiah yang ditulis oleh redaksi ZETARAZ.',
    },
    {
      title: 'Transparansi Penuh (Clear Disclosure)',
      desc: 'Setiap konten yang melibatkan dukungan dana atau kerja sama khusus akan dilabeli secara terang benderang agar pembaca selalu terinformasi.',
    },
    {
      title: 'Tanpa Iklan Mengganggu (Zero Intrusive Ads)',
      desc: 'Kami menolak popup interstitial, banner berkedip, pengalihan otomatis (*auto-redirect*), atau pelacak pihak ketiga yang mencuri data pembaca.',
    },
  ];

  const prohibitedCategories = [
    'Judi daring, taruhan, dan game kasino dalam bentuk apa pun',
    'Investasi bodong, skema piramida, atau klaim cepat kaya',
    'Produk kesehatan palsu atau pengobatan alternatif tanpa uji klinis sahih',
    'Materi yang mengandung unsur diskriminasi, ujaran kebencian, atau clickbait',
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
            <span className="font-semibold text-slate-800">Promosi & Kemitraan</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Kemitraan & Kolaborasi Beretika</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Promosi, Iklan & Kemitraan
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Standar transparansi dan panduan kolaborasi untuk institusi, peneliti, dan komunitas yang ingin bertumbuh bersama ZETARAZ Knowledge.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Section 1: Philosophy */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
            Filosofi Kami
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-brand-navy mt-1 mb-4">
            Menjaga Ruang Literasi yang Sehat & Bernilai
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
            ZETARAZ Knowledge dibangun dengan visi menjadi oase pembelajaran yang tenang dan kredibel di tengah bisingnya internet. Oleh karena itu, kami tidak menjalankan jaringan iklan otomatis berbasis tayangan yang merusak kenyamanan membaca.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Setiap bentuk kemitraan dan promosi yang hadir di platform ini wajib memenuhi standar relevansi yang ketat: harus memberikan nilai tambah nyata bagi pembaca, sejalan dengan prinsip keilmuan, dan disampaikan secara jujur.
          </p>
        </div>

        {/* Section 2: Allowed Partnerships */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
              Bentuk Kerja Sama
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-brand-navy mt-1">
              Program Kemitraan yang Terbuka
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allowedPartnerships.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center font-bold mb-4 border border-teal-100">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Principles & Prohibitions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Principles */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-brand-teal font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Prinsip Etika Mutlak</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-brand-navy mb-4">
              Komitmen Integritas
            </h3>
            <div className="space-y-4">
              {ethicalPrinciples.map((ep, epIdx) => (
                <div key={epIdx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{ep.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibitions */}
          <div className="bg-rose-50/70 rounded-2xl p-6 sm:p-8 border border-rose-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <XCircle className="w-4 h-4" />
              <span>Kategori yang Ditolak Keras</span>
            </div>
            <h3 className="font-heading font-bold text-xl text-rose-950 mb-4">
              Larangan Promosi
            </h3>
            <p className="text-xs text-rose-800 leading-relaxed mb-4">
              Untuk menjaga integritas dan moralitas platform edukasi publik, ZETARAZ Knowledge menolak tanpa kompromi iklan atau sponsor dari sektor berikut:
            </p>
            <ul className="space-y-3">
              {prohibitedCategories.map((cat, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5 text-xs text-rose-900 font-medium">
                  <span className="text-rose-500 font-black">•</span>
                  <span>{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 4: Contact for Inquiry */}
        <div className="bg-brand-navy rounded-2xl p-8 sm:p-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading font-extrabold text-2xl text-white mb-3">
              Tertarik Bermitra atau Mengajukan Proposal Kerja Sama?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Silakan kirimkan profil inisiatif, lingkup kegiatan, dan tujuan kemitraan Anda kepada tim kemitraan kami.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:kemitraan@zetaraz.org"
                className="px-6 py-3 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>kemitraan@zetaraz.org</span>
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Gunakan Formulir Kontak
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
