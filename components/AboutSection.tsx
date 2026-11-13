import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Compass, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      title: 'Inklusif & Mudah Diakses',
      desc: 'Pengetahuan disajikan dengan bahasa yang lugas, terstruktur, dan ramah untuk pemula maupun praktisi.',
    },
    {
      title: 'Berbasis Bukti & Kredibel',
      desc: 'Menghargai kejujuran data, metodologi yang jelas, dan penelaahan kritis tanpa klaim bombastis.',
    },
    {
      title: 'Praktis & Relevan',
      desc: 'Menghubungkan teori konseptual dengan catatan pengalaman lapangan dan studi kasus nyata.',
    },
    {
      title: 'Independen & Terbuka',
      desc: 'Didedikasikan murni untuk memajukan literasi dan menumbuhkan rasa ingin tahu para pembelajar.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-brand-teal text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentang Kami</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy tracking-tight leading-tight">
              ZETARAZ Knowledge
              <span className="block text-brand-teal text-2xl sm:text-3xl font-bold mt-1">
                Berbagi Pengetahuan, Berbagi Pengalaman.
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              ZETARAZ Knowledge adalah platform berbagi pengetahuan independen. Kami percaya bahwa setiap orang memiliki hak untuk mengakses informasi bermutu, dan setiap pengalaman nyata memiliki nilai untuk dibagikan dan dipelajari.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Di sini, Anda dapat menjelajahi wawasan sains, dinamika teknologi dan kecerdasan buatan, analitika data terapan, hingga catatan pengalaman manajemen proses dan pembelajaran sepanjang hayat.
            </p>

            {/* 4 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed pl-6">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-md group"
              >
                <span>Pelajari Visi Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-navy"
              >
                <span>Mulai Eksplorasi Topik</span>
                <Compass className="w-4 h-4 text-brand-teal" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80"
                alt="Diskusi dan berbagi pengetahuan ZETARAZ"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest mb-1">
                  Semangat Terbuka
                </span>
                <p className="font-heading font-bold text-lg leading-snug">
                  "Temukan Pengetahuan. Perluas Wawasan."
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Ruang ramah untuk bertanya, memahami konsep, dan bertumbuh bersama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
