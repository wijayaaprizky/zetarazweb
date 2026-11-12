import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  BookOpen,
  Sparkles,
  Compass,
  CheckCircle2,
  Users,
  Award,
  Lock,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman',
  description:
    'Mengenal ZETARAZ Knowledge: platform independen yang menyediakan informasi, wawasan, pengalaman praktis, dan konten edukatif lintas disiplin ilmu.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
};

export default function AboutPage() {
  const brandAttributes = [
    {
      title: 'Knowledge-Driven (Berbasis Pengetahuan)',
      desc: 'Setiap artikel dan ulasan disusun dengan riset teliti, penelaahan cermat, dan fokus pada substansi yang bermanfaat.',
    },
    {
      title: 'Inclusive & Accessible (Inklusif & Mudah Diakses)',
      desc: 'Pengetahuan disajikan tanpa elitisme atau jargon yang menyulitkan, agar siapa pun dapat belajar dengan nyaman.',
    },
    {
      title: 'Credible & Informative (Kredibel & Informatif)',
      desc: 'Menjunjung tinggi kejujuran intelektual, rujukan yang sahih, serta pemisahan tegas antara fakta empiris dan opini.',
    },
    {
      title: 'Modern & Practical (Modern & Praktis)',
      desc: 'Menghubungkan teori konseptual dengan pengalaman nyata di lapangan, tips praktis, dan studi kasus yang relevan.',
    },
    {
      title: 'Independent (Mandiri & Terbuka)',
      desc: 'Inisiatif independen yang bebas dari bias komersial atau kepentingan korporasi tertentu.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mengenal Inisiatif Kami</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.15] mb-4">
            ZETARAZ Knowledge
          </h1>

          <p className="text-xl sm:text-2xl text-teal-300 font-heading font-bold mb-6">
            Berbagi Pengetahuan, Berbagi Pengalaman.
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Platform independen yang hadir untuk memudahkan siapa saja menemukan informasi yang kredibel, memahami konsep baru, dan belajar dari pengalaman nyata lintas disiplin ilmu.
          </p>

          <div className="inline-block px-5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-teal-300 font-serif italic text-sm">
            "Temukan Pengetahuan. Perluas Wawasan."
          </div>
        </div>
      </section>

      {/* Main Positioning & Philosophy */}
      <section id="visi-misi" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Identitas Kami
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1 mb-4">
                Sebuah Ruang Terbuka untuk Terus Belajar
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                ZETARAZ Knowledge bermula sebagai sebuah inisiatif mandiri dengan satu keyakinan sederhana: <strong>pengetahuan dan pengalaman menjadi jauh lebih bermakna ketika dibagikan</strong>.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                Kami bukan blog pribadi yang mencatat kegiatan harian, bukan situs korporat yang menjual produk jasa, dan bukan firma konsultan komersial. Kami adalah <strong>wadah berbagi pengetahuan digital</strong> dengan standar editorial profesional yang memprioritaskan kenyamanan membaca dan kedalaman isi.
              </p>
              <div className="space-y-2.5">
                {[
                  'Menyediakan artikel pengetahuan berkualitas yang mudah dipahami.',
                  'Mencatat pengalaman lapangan dan pelajaran berharga dari praktik nyata.',
                  'Menghadirkan tutorial praktis dan panduan langkah-demi-langkah.',
                  'Menumbuhkan budaya belajar mandiri dan bernalar kritis.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
                alt="Semangat kolaborasi dan berbagi pengetahuan"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Attributes */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
              Prinsip & Karakter
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
              Nilai yang Menjiwai Setiap Tulisan Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAttributes.map((attr, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 text-brand-teal font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                    {attr.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {attr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Credibility */}
      <section id="kredibilitas" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-brand-teal text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Kredibilitas & Tanggung Jawab Isi</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mb-6">
            Menjaga Akurasi dan Kejujuran Intelektual
          </h2>
          <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Kami berupaya memastikan setiap naskah yang terbit di ZETARAZ Knowledge berpegang pada fakta yang dapat dipertanggungjawabkan. Kami mencantumkan rujukan apabila menyitir data saintifik dan secara jujur menyatakan konteks ketika membagikan pengalaman terapan di lapangan.
            </p>
            <p>
              Jika terdapat kekeliruan atau perkembangan ilmu terbaru yang mengoreksi tulisan terdahulu, kami terbuka untuk memperbarui dan mencantumkan riwayat pembaruan artikel demi kebaikan bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="kebijakan-privasi" className="py-12 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-brand-teal" />
            <span>Privasi Pembaca</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
            Komitmen Privasi Pembaca
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            ZETARAZ Knowledge menghargai privasi setiap pembaca. Pendaftaran email buletin semata-mata digunakan untuk mengirimkan kurasi artikel baru secara berkala tanpa ada data yang diperjualbelikan kepada pihak ketiga. Seluruh konten orisinal bebas dibaca dan dipelajari untuk kepentingan pendidikan dan pengembangan diri.
          </p>
        </div>
      </section>

      {/* Terms & Open Knowledge Ethics */}
      <section id="ketentuan" className="py-12 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-brand-teal" />
            <span>Ketentuan & Etika Pengetahuan Terbuka</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
            Ketentuan Penggunaan & Hak Cipta Edukatif
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Seluruh konten yang disajikan di ZETARAZ Knowledge ditujukan untuk tujuan edukasi, literasi, dan pengembangan pengetahuan umum. Pembaca dipersilakan mengutip naskah dengan tetap mencantumkan atribusi sumber tautan ZETARAZ Knowledge secara wajar. Kami berpegang teguh pada etika berbagi tanpa bias komersial demi ekosistem belajar yang sehat dan terbuka.
          </p>
          <div className="text-xs text-slate-400">
            Terakhir diperbarui: 11 November 2026 • Tim Redaksi ZETARAZ Knowledge
          </div>
        </div>
      </section>
    </div>
  );
}
