'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, User, Newspaper, Flame } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface LatestArticlesProps {
  articles: any[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { slug: 'all', name: 'Semua Berita & Artikel' },
    { slug: 'pengetahuan', name: 'Pengetahuan' },
    { slug: 'pengalaman', name: 'Pengalaman' },
    { slug: 'opini', name: 'Opini' },
  ];

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter(
      (art) => art.category?.slug === selectedCategory
    );
  }, [articles, selectedCategory]);

  const getCategoryBadge = (slug: string) => {
    switch (slug) {
      case 'pengetahuan':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 hover:bg-blue-100';
      case 'pengalaman':
        return 'bg-teal-50 text-teal-700 border-teal-200/80 hover:bg-teal-100';
      case 'opini':
        return 'bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
    }
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-2" />
        <p className="text-sm font-medium">Belum ada daftar artikel yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div>
      {/* News Section Header */}
      <div className="pb-4 border-b border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Daftar Artikel Terkini
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-xs font-bold text-teal-600 hover:text-slate-900 flex items-center gap-1 transition-colors uppercase tracking-wider"
          >
            <span>Indeks Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filter Tabs (News Portal Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap focus:outline-none ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* News-Style Article List (Horizontal Rows) */}
      <div className="divide-y divide-slate-200/80">
        {filteredArticles.map((art) => {
          const badgeClass = getCategoryBadge(art.category?.slug || '');

          return (
            <article
              key={art.id}
              className="py-6 first:pt-0 last:pb-0 group flex flex-col sm:flex-row gap-5 sm:gap-6 items-start transition-all"
            >
              {/* News Thumbnail (Fixed Ratio) */}
              <Link
                href={`/articles/${art.slug}`}
                className="relative w-full sm:w-56 md:w-60 aspect-[16/10] rounded-2xl overflow-hidden shrink-0 bg-slate-900 shadow-sm block"
              >
                <Image
                  src={art.featuredImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Pill Tag on Mobile Thumbnail */}
                <div className="sm:hidden absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-white backdrop-blur-sm">
                    {art.category?.name || 'Wawasan'}
                  </span>
                </div>
              </Link>

              {/* News Content */}
              <div className="min-w-0 flex-1 flex flex-col justify-between self-stretch">
                <div>
                  {/* Meta: Category Pill + Date + Read Time */}
                  <div className="hidden sm:flex items-center gap-2.5 text-xs mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors ${badgeClass}`}>
                      {art.category?.name || 'Wawasan'}
                    </span>
                    <span className="text-slate-300">•</span>
                    <time className="text-slate-400 font-medium text-[11px]">
                      {formatDateIndonesian(art.publishedAt)}
                    </time>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {art.readTimeMinutes} menit baca
                    </span>
                  </div>

                  {/* News Headline */}
                  <h3 className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-slate-900 group-hover:text-sky-600 transition-colors duration-200 leading-snug tracking-tight mb-2">
                    <Link href={`/articles/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  {/* News Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal mb-3">
                    {art.excerpt}
                  </p>
                </div>

                {/* News Footer: Author & Timestamp (on Mobile) */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100/80">
                  <div className="flex items-center gap-2">
                    {art.author?.avatar ? (
                      <img
                        src={art.author.avatar}
                        alt={art.author.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[9px]">
                        {art.author?.name?.charAt(0) || 'Z'}
                      </div>
                    )}
                    <span className="text-slate-700 font-medium text-xs">
                      {art.author?.name || 'Redaksi ZETARAZ'}
                    </span>
                  </div>

                  <Link
                    href={`/articles/${art.slug}`}
                    className="font-bold text-teal-600 hover:text-slate-900 inline-flex items-center gap-1 text-xs transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
