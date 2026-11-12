'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  ShieldCheck,
  Share2,
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
  if (!mainArticle) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border-b border-slate-200/80 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZETARAZ Knowledge Management System</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15] mb-5">
            Pusat Eksplorasi Pengetahuan & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600">
              Catatan Pengalaman Terbuka.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Platform independen yang menghubungkan telaah konseptual, teknologi, tata kelola sistem, dan catatan pengalaman nyata untuk memperkaya wawasan bersama tanpa sekat biaya.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              100% Akses Terbuka
            </span>
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <Share2 className="w-4 h-4 text-sky-600" />
              Kurasi Terverifikasi
            </span>
            <span className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Wawasan Praktis
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-8 pb-16 lg:pt-10 lg:pb-16 bg-gradient-to-b from-white via-slate-50/60 to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow / Status Tag */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/60">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-heading">
              Sorotan Pengetahuan Pilihan
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500 hidden sm:block">
            Berbagi Pengetahuan, Berbagi Pengalaman
          </span>
        </div>

        {/* 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Main Featured Article (Col 7) */}
          <article className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between group">
            <div>
              {/* Featured Image with smooth zoom */}
              <Link
                href={`/articles/${mainArticle.slug}`}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-slate-900 shadow-md block"
              >
                <Image
                  src={mainArticle.featuredImage}
                  alt={mainArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600 text-white shadow-md backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{mainArticle.category?.name || 'Wawasan'}</span>
                  </span>
                </div>
              </Link>

              {/* Meta Information */}
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="inline-flex items-center gap-1 font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  {mainArticle.category?.name || 'Kategori'}
                </span>
                <span>•</span>
                <time className="text-slate-500">
                  {formatDateIndonesian(mainArticle.publishedAt)}
                </time>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {mainArticle.readTimeMinutes} menit baca
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 group-hover:text-sky-600 transition-colors duration-200 tracking-tight leading-tight mb-4">
                <Link href={`/articles/${mainArticle.slug}`} className="focus:outline-none">
                  {mainArticle.title}
                </Link>
              </h1>

              {/* Excerpt */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal mb-6">
                {mainArticle.excerpt}
              </p>
            </div>

            {/* Author & Read Action Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {mainArticle.author?.avatar ? (
                  <img
                    src={mainArticle.author.avatar}
                    alt={mainArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-500/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-heading font-bold text-sm">
                    {mainArticle.author?.name?.charAt(0) || 'Z'}
                  </div>
                )}
                <div>
                  <div className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                    {mainArticle.author?.name || 'Redaksi ZETARAZ'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Kurator ZETARAZ Knowledge
                  </div>
                </div>
              </div>

              <Link
                href={`/articles/${mainArticle.slug}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-sky-600 text-white transition-colors duration-200 shadow-sm"
                aria-label="Baca artikel lengkap"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </article>

          {/* Right: Secondary Featured Articles (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group flex gap-4 items-start"
              >
                {/* Thumbnail */}
                <Link
                  href={`/articles/${article.slug}`}
                  className="relative w-28 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-900 shadow-sm"
                >
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] mb-1.5">
                    <span className="font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      {article.category?.name}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-medium">
                      {article.readTimeMinutes} mnt baca
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-sky-600 transition-colors duration-200 line-clamp-2 leading-snug mb-1">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="font-medium text-slate-600 truncate max-w-[120px]">
                      {article.author?.name}
                    </span>
                    <time>{formatDateIndonesian(article.publishedAt)}</time>
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
