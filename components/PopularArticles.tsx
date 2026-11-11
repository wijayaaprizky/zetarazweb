import React from 'react';
import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';

interface PopularArticlesProps {
  articles: any[];
}

export default function PopularArticles({ articles }: PopularArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
        <TrendingUp className="w-4 h-4 text-brand-blue" />
        <h3 className="font-heading font-extrabold text-base text-brand-navy uppercase tracking-wider">
          Topik Populer & Trending
        </h3>
      </div>

      <div className="space-y-4 divide-y divide-slate-100">
        {articles.map((art, index) => (
          <article
            key={art.id}
            className={`flex items-start gap-3.5 group ${index !== 0 ? 'pt-4' : ''}`}
          >
            <div className="text-2xl font-black font-heading text-slate-300 group-hover:text-brand-blue transition-colors shrink-0 w-7">
              0{index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">
                  {art.category?.name}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-400" />
                  {art.viewCount.toLocaleString('id-ID')} pembaca
                </span>
              </div>

              <h4 className="font-heading font-semibold text-sm text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
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
