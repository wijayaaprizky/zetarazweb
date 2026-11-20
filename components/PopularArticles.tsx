import React from 'react';
import Link from 'next/link';
import { Eye, TrendingUp } from 'lucide-react';
import { getCategoryTheme } from '@/lib/categoryTheme';

interface PopularArticlesProps {
  articles: any[];
}

export default function PopularArticles({ articles }: PopularArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sun-300/40 text-slate-900">
          <TrendingUp className="h-4 w-4" />
        </span>
        <h3 className="font-heading text-lg font-bold text-slate-900">Paling banyak dibaca</h3>
      </div>

      <ol className="divide-y divide-slate-100">
        {articles.map((art, index) => {
          const theme = getCategoryTheme(art.category?.slug);
          return (
            <li key={art.id} className="group flex items-start gap-4 py-4 first:pt-0 last:pb-0">
              <span
                aria-hidden="true"
                className={`w-9 shrink-0 font-heading text-3xl font-extrabold leading-none transition-colors ${theme.numeral}`}
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <h4 className={`line-clamp-2 font-heading text-[15px] font-semibold leading-snug text-slate-900 transition-colors ${theme.hoverTitle}`}>
                  <Link href={`/articles/${art.slug}`}>{art.title}</Link>
                </h4>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                    {art.category?.name}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {art.viewCount.toLocaleString('id-ID')} dibaca
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
