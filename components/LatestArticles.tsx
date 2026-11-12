import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface LatestArticlesProps {
  articles: any[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="py-12 text-center text-slate-400">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-slate-700 text-sm">Belum Ada Artikel Baru</h3>
        <p className="text-xs text-slate-400 mt-1">Artikel akan segera hadir setelah kurasi selesai.</p>
      </div>
    );
  }

  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case 'teknologi':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'tata-kelola':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'hobby':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'sosial':
        return 'bg-teal-50 text-teal-700 border-teal-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div>
      {/* Header Row */}
      <div className="mb-8 pb-3 border-b border-slate-200/80 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-teal-600">
            Terbitan Terkini
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
            Artikel & Catatan Wawasan Terbaru
          </h2>
        </div>
        <Link
          href="/articles"
          className="text-xs font-bold text-teal-600 hover:text-slate-900 flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <span>Semua Terbitan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2-Column Responsive Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {articles.map((art) => {
          const badgeClass = getCategoryTheme(art.category?.slug || '');

          return (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <Link
                  href={`/articles/${art.slug}`}
                  className="relative aspect-[16/10] block overflow-hidden bg-slate-900"
                >
                  <Image
                    src={art.featuredImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Card Body */}
                <div className="p-6">
                  {/* Category Pill & Meta */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-semibold border ${badgeClass}`}>
                      {art.category?.name || 'Wawasan'}
                    </span>
                    <time className="text-slate-400 font-medium text-[11px]">
                      {formatDateIndonesian(art.publishedAt)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-sky-600 transition-colors duration-200 leading-snug tracking-tight mb-2.5 line-clamp-2">
                    <Link href={`/articles/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                <div className="flex items-center gap-2.5 min-w-0">
                  {art.author?.avatar ? (
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
                      {art.author?.name?.charAt(0) || 'Z'}
                    </div>
                  )}
                  <span className="text-slate-700 font-medium truncate">
                    {art.author?.name || 'Redaksi ZETARAZ'}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-slate-400 shrink-0 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTimeMinutes} mnt baca</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
