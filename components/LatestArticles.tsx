import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface LatestArticlesProps {
  articles: any[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
              Wawasan Terbaru
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
              Publikasi & Analisis Pengetahuan Terkini
            </h2>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy uppercase tracking-wider group"
          >
            <span>Eksplorasi Seluruh Arsip</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="flex flex-col bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all group"
            >
              <Link
                href={`/articles/${art.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-slate-100"
              >
                <Image
                  src={art.featuredImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy rounded-full shadow-sm backdrop-blur-sm border border-slate-200/60">
                    {art.category?.name}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateIndonesian(art.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTimeMinutes} menit
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-2.5">
                    <Link href={`/articles/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {art.author?.avatar ? (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={art.author.avatar}
                          alt={art.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">
                        <User className="w-3 h-3" />
                      </div>
                    )}
                    <span className="text-xs font-medium text-slate-700 truncate max-w-[150px]">
                      {art.author?.name}
                    </span>
                  </div>

                  <Link
                    href={`/articles/${art.slug}`}
                    className="text-xs font-bold text-brand-teal group-hover:text-brand-navy flex items-center gap-1"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
