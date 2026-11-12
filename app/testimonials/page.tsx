import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  Quote,
  Star,
  Sparkles,
  ChevronRight,
  MessageSquare,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Testimoni Pembaca & Kontributor — ZETARAZ Knowledge',
  description:
    'Kumpulan cerita, ulasan, dan refleksi dari para pembaca, akademisi, dan praktisi yang telah memetik wawasan dari ZETARAZ Knowledge.',
  alternates: {
    canonical: getCanonicalUrl('/testimonials'),
  },
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Dr. Hendra Gunawan',
      role: 'Dosen & Peneliti Informatika',
      org: 'Institut Teknologi Bandung',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote:
        'Sangat menyegarkan menemukan platform independen Indonesia yang konsisten mengulas metodologi penelitian dan integritas data secara jujur. ZETARAZ menyajikan pemikiran kritis tanpa jargon yang berlebihan.',
      highlight: 'Kejujuran Intelektual & Metodologi',
    },
    {
      name: 'Nadia Safitri, S.Kom.',
      role: 'Senior Cloud Engineer & Pegiat DevOps',
      org: 'Komunitas Cloud Nusantara',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      quote:
        'Panduan arsitektur enterprise dan higienitas keamanan siber di ZETARAZ langsung dapat diaplikasikan di lapangan. Bukan sekadar teori buku teks usang, melainkan refleksi nyata dari tantangan industri masa kini.',
      highlight: 'Sangat Aplikatif untuk Praktisi',
    },
    {
      name: 'Dimas Prasetyo',
      role: 'Mahasiswa Sains Data & Pembelajar Mandiri',
      org: 'Universitas Indonesia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      quote:
        'Platform yang sangat nyaman untuk membaca. Tidak ada popup iklan yang menutupi layar atau tautan klik umpan (clickbait). Setiap menit yang dihabiskan untuk membaca di sini terasa menambah pengetahuan baru.',
      highlight: 'Pengalaman Membaca yang Nyaman',
    },
    {
      name: 'Ratih Wulandari',
      role: 'Business Process Analyst',
      org: 'Inisiatif Transformasi Layanan Publik',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      quote:
        'Catatan praktis seputar BPM dan manajemen perubahan membantu tim kami memahami alur kerja nyata di organisasi. Membantu kami membedah bottleneck proses tanpa saling menyalahkan.',
      highlight: 'Mengurai Kerumitan Proses Kerja',
    },
    {
      name: 'Budi Santoso',
      role: 'Penulis Lepas & Kontributor Tamu',
      org: 'Pegiat Komunitas Belajar Terbuka',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      quote:
        'Alur kerja pengiriman draf artikel melalui Google Docs yang tersinkronisasi otomatis sangat memudahkan penulis. Proses kurasi dan masukan dari tim redaksi sangat hangat dan konstruktif.',
      highlight: 'Kolaborasi Editorial yang Menyenangkan',
    },
    {
      name: 'Siti Rahmawati',
      role: 'Pustakawan Digital & Pengembang Koleksi',
      org: 'Jaringan Informasi Pendidikan',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      quote:
        'Enam pilar pengetahuannya tersusun dengan taksonomi yang rapi. Saya sering merekomendasikan artikel-artikel ZETARAZ kepada rekan guru dan mahasiswa untuk bahan diskusi literasi.',
      highlight: 'Rujukan Edukatif Terpercaya',
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
            <span className="font-semibold text-slate-800">Testimoni</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5" />
            <span>Suara Pembaca & Rekan Inisiatif</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Testimoni & Catatan Pembaca
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Refleksi dari mereka yang telah membaca, berdiskusi, dan berbagi wawasan bersama ekosistem ZETARAZ Knowledge.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                    {item.highlight}
                  </span>
                  <Quote className="w-6 h-6 text-slate-200 group-hover:text-teal-400 transition-colors" />
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-sm text-slate-900 truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.role}
                  </div>
                  <div className="text-[10px] text-teal-600 font-semibold truncate">
                    {item.org}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share your thought callout */}
        <div className="mt-16 bg-gradient-to-br from-teal-50 to-slate-100 rounded-2xl p-8 sm:p-12 border border-teal-200 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-2xl text-brand-navy mb-3">
              Punya Pengalaman atau Masukan Setelah Membaca ZETARAZ?
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Setiap catatan dan refleksi dari Anda sangat berharga bagi perkembangan platform ini untuk melayani lebih banyak pembelajar di Indonesia.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <span>Kirimkan Testimoni / Ulasan Anda</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
