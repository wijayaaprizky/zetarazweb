import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Quote, ArrowRight, Heart } from 'lucide-react';

export default function HomeTestimonials() {
  const testimonials = [
    {
      name: 'Dr. Hendra Gunawan',
      role: 'Dosen & Peneliti Informatika',
      org: 'Institut Teknologi Bandung',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      quote:
        'Sangat menyegarkan menemukan platform independen Indonesia yang konsisten mengulas metodologi riset dan integritas data secara jujur. ZETARAZ menyajikan pemikiran kritis tanpa jargon yang berlebihan.',
    },
    {
      name: 'Nadia Safitri, S.Kom.',
      role: 'Senior Cloud Engineer & Pegiat DevOps',
      org: 'Komunitas Cloud Nusantara',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      quote:
        'Panduan arsitektur enterprise dan higienitas keamanan siber di ZETARAZ langsung dapat diaplikasikan di lapangan. Bukan sekadar teori buku teks usang, melainkan refleksi nyata dari tantangan industri masa kini.',
    },
    {
      name: 'Dimas Prasetyo',
      role: 'Mahasiswa Sains Data & Pembelajar Mandiri',
      org: 'Universitas Indonesia',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      quote:
        'Platform yang sangat nyaman untuk membaca. Tidak ada popup iklan yang menutupi layar. Setiap waktu yang dihabiskan untuk membaca di sini terasa menambah wawasan nyata.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-3 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-brand-teal" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Suara Komunitas
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy">
              Apa Kata Pembaca & Praktisi
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-navy uppercase tracking-wider group"
          >
            <span>Seluruh Ulasan Pembaca</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-slate-300 mb-3" />
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 truncate">
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
      </div>
    </section>
  );
}
