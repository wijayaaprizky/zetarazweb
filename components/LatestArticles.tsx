'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight, Newspaper } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';
import { getCategoryTheme } from '@/lib/categoryTheme';

interface LatestArticlesProps {
  articles: any[];
}

const TABS = [
  { slug: 'all', name: 'Semua' },
  { slug: 'pengetahuan', name: 'Pengetahuan' },
  { slug: 'pengalaman', name: 'Pengalaman' },
  { slug: 'opini', name: 'Opini' },
];

export default function LatestArticles({ articles }: LatestArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((art) => art.category?.slug === selectedCategory);
  }, [articles, selectedCategory]);

  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        <Newspaper className="mx-auto mb-2 h-10 w-10 text-slate-300" />
        <p className="text-sm font-medium">Belum ada artikel yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
            Artikel terbaru
          </h2>
          <p className="mt-1 text-sm text-slate-500">Pilih topik, lalu baca sampai selesai.</p>
        </div>
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-kn-700 transition-colors hover:text-kn-900"
        >
          Lihat semua artikel
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Saring artikel menurut kategori">
        {TABS.map((tab) => {
          const isActive = selectedCategory === tab.slug;
          const theme = tab.slug === 'all' ? null : getCategoryTheme(tab.slug);
          return (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(tab.slug)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset transition-colors ${
                isActive
                  ? theme
                    ? theme.tabActive
                    : 'bg-slate-900 text-white ring-slate-900'
                  : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {theme && !isActive && <span className={`h-2 w-2 rounded-full ${theme.dot}`} />}
              {tab.name}
            </button>
          );
        })}
      </div>

      {filteredArticles.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-slate-200">
          Belum ada artikel di kategori ini. Coba pilih kategori lain.
        </p>
      ) : (
        <div className="space-y-5">
          {filteredArticles.map((art) => {
            const theme = getCategoryTheme(art.category?.slug);
            return (
              <article
                key={art.id}
                className="group flex flex-col gap-5 rounded-3xl bg-white p-4 ring-1 ring-slate-200 transition-shadow hover:shadow-lift sm:flex-row sm:p-5"
              >
                <Link
                  href={`/articles/${art.slug}`}
                  className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-900 sm:w-60"
                >
                  <Image
                    src={art.featuredImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 240px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${theme.chip}`}>
                      {art.category?.name || 'Wawasan'}
                    </span>
                    <time>{formatDateIndonesian(art.publishedAt)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {art.readTimeMinutes} menit baca
                    </span>
                  </div>

                  <h3 className={`font-heading text-xl font-bold leading-snug text-slate-900 transition-colors ${theme.hoverTitle}`}>
                    <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-slate-600">
                    {art.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-1">
                    <span className="text-sm font-medium text-slate-700">
                      {art.author?.name || 'Redaksi ZETARAZ'}
                    </span>
                    <Link
                      href={`/articles/${art.slug}`}
                      className={`inline-flex items-center gap-1 text-sm font-semibold ${theme.link}`}
                    >
                      Baca artikel
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
