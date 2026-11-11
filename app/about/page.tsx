import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  BrainCircuit,
  Compass,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang ZETARAZ — An Independent Knowledge Company',
  description:
    'Mengenal visi, filosofi, prinsip editorial, dan arsitektur pengetahuan ZETARAZ sebagai perusahaan pengetahuan independen masa depan.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-brand-teal" />,
      title: 'Integritas & Kredibilitas Intelektual',
      desc: 'Setiap artikel dan kajian berlandaskan pada metodologi sahih, rujukan terverifikasi, dan transparansi epistemologis tanpa kompromi.',
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-brand-blue" />,
      title: 'Penalaran Saintifik & Logika Terstruktur',
      desc: 'Kami mendekati setiap tantangan melalui berpikir sistem (systems thinking), analisis bukti empiris, dan deduksi logis.',
    },
    {
      icon: <Compass className="w-6 h-6 text-teal-600" />,
      title: 'Keingintahuan & Pembelajaran Terus-Menerus',
      desc: 'Budaya belajar tanpa henti (continuous learning) mendorong eksplorasi melampaui batas disiplin konvensional.',
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: 'Aksesibilitas Pengetahuan Universal',
      desc: 'Pengetahuan tingkat tinggi disajikan secara lugas, elegan, dan dapat dipahami oleh praktisi, akademisi, dan publik luas.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Profil & Visi Institusi
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
            Membangun Masa Depan Berbasis Pengetahuan
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            ZETARAZ merepresentasikan integrasi pengetahuan, inteligensi, logika, dan penemuan. Kami bertumbuh menjadi perusahaan pengetahuan, edukasi, riset, dan konsultasi independen.
          </p>
          <div className="inline-block px-5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-teal-400 font-serif italic text-base">
            "Knowledge. Intelligence. Discovery."
          </div>
        </div>
      </section>

      {/* Philosophy & Mission */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Filosofi Kami
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1 mb-4">
                Bukan Sekadar Media, Melainkan Arsitektur Kognitif
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                Di era ledakan informasi digital, paradoks terbesar kita adalah kelimpahan data mentah yang diiringi oleh kelangkaan pemahaman mendalam. Kebanyakan media mengejar sensasionalisme jangka pendek.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                ZETARAZ lahir untuk menjawab tantangan tersebut dengan menggabungkan keindahan kurasi editorial pers berkualitas dengan kedisiplinan <strong>Knowledge Management System (KMS)</strong> enterprise. Kami meneliti, menyusun, dan mendiseminasikan wawasan yang memiliki daya tahan bertahun-tahun ke depan.
              </p>
              <div className="space-y-2.5">
                {[
                  'Menghubungkan teori akademis dengan aplikasi industri riil.',
                  'Mengorganisir aset pengetahuan tacit menjadi kurikulum terstruktur.',
                  'Mendorong standar riset dan pelaporan berbasis bukti (evidence-based).',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
                alt="Kolaborasi intelektual tim ZETARAZ"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
              Nilai Utama
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
              Empat Pilar Karakter ZETARAZ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards & Integrity */}
      <section id="editorial-standards" className="py-16 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-brand-teal text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Standar Integritas Ilmiah</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mb-6">
            Komitmen pada Kebenaran & Tinjauan Sejawat
          </h2>
          <div className="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Setiap naskah yang diterbitkan di ZETARAZ melalui proses kurasi editorial berlapis. Penulis kami diwajibkan untuk mencantumkan sumber data primer, metodologi yang dapat diverifikasi, serta secara eksplisit membedakan antara laporan riset empiris dengan analisis opini konseptual.
            </p>
            <p>
              Kami menolak penggunaan kecerdasan buatan untuk mengarang fakta fiktif atau menghasilkan konten dangkal tanpa sintesis manusia yang kritis. Ketika model komputasi digunakan sebagai alat bantu analisis, metodologi tersebut dinyatakan secara terbuka.
            </p>
          </div>
        </div>
      </section>

      {/* Legal & Privacy Notices */}
      <section id="privacy-policy" className="py-12 bg-slate-50 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4 text-brand-teal" />
            <span>Kebijakan Privasi & Ketentuan</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
            Perlindungan Data & Hak Intelektual
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            ZETARAZ menghormati privasi data pembaca kami. Kami tidak pernah menjual, menyewakan, atau memperdagangkan alamat email maupun jejak penjelajahan Anda kepada pihak ketiga. Informasi buletin hanya digunakan secara ketat untuk mendistribusikan publikasi pengetahuan ZETARAZ. Seluruh konten orisinal dilindungi oleh hukum kekayaan intelektual yang berlaku.
          </p>
          <div className="text-xs text-slate-400">
            Terakhir diperbarui: 11 November 2026 • Dewan Redaksi & Riset ZETARAZ
          </div>
        </div>
      </section>
    </div>
  );
}
