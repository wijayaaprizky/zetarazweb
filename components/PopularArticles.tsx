import React from 'react';
import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';

interface PopularArticlesProps {
  articles: any[];
}

export default function PopularArticles({ articles }: PopularArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-200/70">
        <TrendingUp className="w-4 h-4 text-sky-600" />
        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900">
          Paling Banyak Dibaca
        </h3>
      </div>

      <div className="space-y-4 divide-y divide-slate-200/60">
        {articles.map((art, index) => (
          <article
            key={art.id}
            className={`flex items-start gap-3.5 group ${index !== 0 ? 'pt-4' : ''}`}
          >
            <div className="text-2xl font-black font-heading text-slate-300 group-hover:text-sky-600 transition-colors shrink-0 w-8">
              0{index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">
                  {art.category?.name}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Eye className="w-3 h-3 text-slate-400" />
                  {art.viewCount.toLocaleString('id-ID')} dibaca
                </span>
              </div>

              <h4 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug">
                <Link href={`/articles/${art.slug}`}>
                  {art.title}
                </Link>
              </h4>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
