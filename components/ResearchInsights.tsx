import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FlaskConical, Clock, ArrowRight } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface ResearchInsightsProps {
  articles: any[];
}

export default function ResearchInsights({ articles }: ResearchInsightsProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 bg-brand-dark text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-black uppercase tracking-widest text-teal-400">
                Penyelidikan Saintifik & Metodologi
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Science & Research Insights
            </h2>
          </div>
          <Link
            href="/category/science-research"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 uppercase tracking-wider group"
          >
            <span>Seluruh Riset & Sains</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2-Column / Big Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800 font-semibold uppercase tracking-wider text-[11px]">
                    {art.contentType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {art.readTimeMinutes} menit baca
                  </span>
                </div>

                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-slate-950">
                  <Image
                    src={art.featuredImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-teal-400 transition-colors leading-snug mb-3">
                  <Link href={`/articles/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">{art.author?.name}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDateIndonesian(art.publishedAt)}</span>
                </div>

                <Link
                  href={`/articles/${art.slug}`}
                  className="text-xs font-bold text-teal-400 group-hover:text-teal-300 flex items-center gap-1"
                >
                  <span>Baca Ulasan</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
