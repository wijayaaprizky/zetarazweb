'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Share2,
  Layers,
  Send,
  Search,
} from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface HeroSectionProps {
  mainArticle: any;
  secondaryArticles: any[];
}

export default function HeroSection({
  mainArticle,
  secondaryArticles,
}: HeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularTopics = [
    { label: 'Kecerdasan Buatan', query: 'Kecerdasan Buatan' },
    { label: 'Arsitektur Enterprise', query: 'Enterprise Architecture' },
    { label: 'Sains Data', query: 'Data Science' },
    { label: 'BPMN 2.0', query: 'BPM' },
    { label: 'Keamanan Siber', query: 'Keamanan Siber' },
    { label: 'Metodologi Riset', query: 'Metodologi Riset' },
  ];

  if (!mainArticle) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/90 border border-teal-700/60 text-teal-400 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZETARAZ Knowledge Management System</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-5">
              Pusat Eksplorasi Pengetahuan & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-300">
                Catatan Pengalaman Terbuka.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              Platform independen yang menghubungkan telaah konseptual, metodologi ilmiah, dan catatan pengalaman nyata di lapangan untuk memperkaya pemahaman bersama tanpa sekat komersial.
            </p>

            {/* Direct In-Hero Search Discovery Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-6 relative">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari konsep, metodologi, topik, atau panduan praktis..."
                  className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-brand-teal transition-all text-xs sm:text-sm shadow-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 bg-brand-teal hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Cari Wawasan
                </button>
              </div>
            </form>

            {/* Popular Topics Quick Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-slate-400">
              <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider mr-1">
                Topik Populer:
              </span>
              {popularTopics.map((topic, idx) => (
                <Link
                  key={idx}
                  href={`/search?q=${encodeURIComponent(topic.query)}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-[11px]"
                >
                  #{topic.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
              <Link
                href="/#pilar"
                className="px-6 py-3.5 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Jelajahi 6 Pilar Pengetahuan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all"
              >
                Mengenal Inisiatif Kami
              </Link>
              <Link
                href="/contact?topic=submission"
                className="px-6 py-3.5 bg-slate-900/60 hover:bg-slate-800/80 text-teal-300 border border-teal-800/60 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirimkan Draf Naskah</span>
              </Link>
            </div>
          </div>

          {/* 4 Core Pillars of Credibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-950 text-teal-400 flex items-center justify-center shrink-0 border border-teal-800/60">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  6 Domain Disiplin
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-1">
                  Sains, teknologi, analitika data, hingga manajemen proses kerja.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/60">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  Standar Redaksi Kritis
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-1">
                  Pemisahan tegas fakta empiris, rujukan primer, dan refleksi opini.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/60">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  Kolaboratif & Terbuka
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-1">
                  Integrasi alur draf Google Docs menuju kurasi terverifikasi.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  Akses Bebas 100%
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug mt-1">
                  Terbuka untuk pendidikan dan literasi tanpa paywall berbayar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-brand-navy">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-teal rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-navy">
              Sorotan Pengetahuan Pilihan
            </span>
          </div>
          <span className="text-xs text-brand-teal font-semibold hidden sm:inline">
            Berbagi Pengetahuan, Berbagi Pengalaman
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Featured Article (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between group">
            <div>
              <Link
                href={`/articles/${mainArticle.slug}`}
                className="block overflow-hidden rounded-2xl relative aspect-[16/10] mb-5 shadow-lg bg-slate-900"
              >
                <Image
                  src={mainArticle.featuredImage}
                  alt={mainArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-teal text-white rounded-full shadow-md">
                    {mainArticle.category?.name}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between text-slate-300">
                  <span>{mainArticle.author?.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {mainArticle.readTimeMinutes} menit baca
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                <span className="font-semibold text-brand-blue uppercase tracking-wider">
                  {mainArticle.contentType}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatDateIndonesian(mainArticle.publishedAt)}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 group-hover:text-brand-blue transition-colors leading-[1.2] mb-3">
                <Link href={`/articles/${mainArticle.slug}`}>
                  {mainArticle.title}
                </Link>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed line-clamp-3 mb-4 font-normal">
                {mainArticle.excerpt}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/articles/${mainArticle.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors group/btn"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform text-brand-teal" />
              </Link>
            </div>
          </div>

          {/* Secondary Featured Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-0 lg:divide-y lg:divide-slate-200">
            {secondaryArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`group flex flex-col sm:flex-row lg:flex-col gap-4 ${
                  idx !== 0 ? 'lg:pt-6' : ''
                }`}
              >
                <div className="flex gap-4 items-start">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="relative w-28 sm:w-36 lg:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-sm"
                  >
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 112px, 144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
                        {article.category?.name}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400">
                        {article.readTimeMinutes} menit baca
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-1.5">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="font-medium text-slate-600">{article.author?.name}</span>
                      <span>•</span>
                      <span>{formatDateIndonesian(article.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
