import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Briefcase,
  BarChart3,
  Cpu,
  FlaskConical,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function LearningTracks() {
  const tracks = [
    {
      title: 'Arsitektur Sistem & Manajemen Proses (BPM)',
      category: 'Business & Management',
      slug: 'business-management',
      icon: Briefcase,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      badge: 'Jalur Manajerial & Operasional',
      level: 'Fondasi ke Mahir',
      modules: [
        'Pemodelan Alur Kerja dengan Standar BPMN 2.0',
        'Empat Lapisan Arsitektur Enterprise (Business, Data, App, Tech)',
        'Manajemen Perubahan & Eliminasi Bottleneck Operasional',
      ],
      desc: 'Pelajari bagaimana mengurai kerumitan operasional, menyusun cetak biru teknologi yang selaras dengan tujuan organisasi, dan membangun kolaborasi tim yang minim gesekan.',
    },
    {
      title: 'Sains Data, Analitika & Visualisasi Terapan',
      category: 'Data & Analytics',
      slug: 'data-analytics',
      icon: BarChart3,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      badge: 'Jalur Analitika & Wawasan',
      level: 'Berbasis Praktik',
      modules: [
        'Pembersihan & Penyiapan Data Mentah (Data Wrangling)',
        'Analisis Eksploratif (EDA) & Deteksi Anomali',
        'Visualisasi Data Beretika & Storytelling Statistik',
      ],
      desc: 'Kembangkan ketrampilan membaca pesan di balik angka, merumuskan pertanyaan bisnis yang terukur, dan mengubah data mentah menjadi keputusan yang sahih.',
    },
    {
      title: 'Kecerdasan Buatan & Ketahanan Siber',
      category: 'Technology',
      slug: 'technology',
      icon: Cpu,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: 'Jalur Rekayasa & Keamanan',
      level: 'Modern & Aplikatif',
      modules: [
        'Pemanfaatan Model Bahasa (LLM) Sebagai Mitra Berpikir',
        'Higienitas Keamanan Digital & Pencegahan Phishing',
        'Etika Penerapan AI & Verifikasi Silang Sumber Primer',
      ],
      desc: 'Pahami cara memanfaatkan kemajuan kecerdasan buatan secara rasional sekaligus menjaga benteng pertahanan akun dan integritas data pribadi di era digital.',
    },
    {
      title: 'Metodologi Riset & Penalaran Saintifik',
      category: 'Science & Research',
      slug: 'science-research',
      icon: FlaskConical,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      badge: 'Jalur Penyelidikan & Nalar Kritis',
      level: 'Pondasi Intelektual',
      modules: [
        'Perumusan Masalah & Uji Falsifikasi Hipotesis',
        'Membedakan Korelasi dari Hubungan Kausalitas',
        'Penelaahan Literatur Ilmiah & Hierarki Bukti Empiris',
      ],
      desc: 'Latih akal sehat dan nalar kritis untuk menyaring kebenaran informasi, mengevaluasi klaim saintifik, dan menyusun riset yang terstruktur serta dapat diulang.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-3 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-brand-teal" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Kurikulum Wawasan
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-navy">
              Jalur Pembelajaran Terstruktur (Learning Tracks)
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Bukan sekadar membaca artikel acak. Ikuti jalur kurasi terpadu untuk mendalami disiplin ilmu dari prinsip dasar hingga penerapan nyata.
            </p>
          </div>
          <Link
            href="/category/learning"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-navy uppercase tracking-wider group shrink-0"
          >
            <span>Semua Jalur Belajar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white border border-slate-200 text-slate-700 shadow-sm">
                      {track.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {track.level}
                    </span>
                  </div>

                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${track.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug">
                        <Link href={`/category/${track.slug}`}>
                          {track.title}
                        </Link>
                      </h3>
                      <span className="text-xs text-brand-teal font-semibold">
                        Domain: {track.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {track.desc}
                  </p>

                  <div className="bg-white rounded-xl p-4 border border-slate-200/80 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Modul Fokus Pengetahuan:</span>
                    </div>
                    <ul className="space-y-2">
                      {track.modules.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Kurikulum Terbuka ZETARAZ
                  </span>
                  <Link
                    href={`/category/${track.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-blue group-hover:translate-x-1 transition-all"
                  >
                    <span>Masuk ke Jalur Ini</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-teal" />
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
