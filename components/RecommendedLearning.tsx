import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, ArrowRight, Clock } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface RecommendedLearningProps {
  articles: any[];
}

export default function RecommendedLearning({ articles }: RecommendedLearningProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-brand-teal" />
              <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                Panduan Praktis & Sumber Belajar
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy">
              Tutorial & Catatan Pengalaman Nyata
            </h2>
          </div>
          <Link
            href="/category/learning"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy uppercase tracking-wider group"
          >
            <span>Seluruh Panduan & Bahan Belajar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-slate-50/60 rounded-2xl p-5 border border-slate-200/80 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image
                    src={art.featuredImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-navy text-white rounded-md shadow-sm">
                      {art.contentType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTimeMinutes} menit
                  </span>
                  <span>•</span>
                  <span>{formatDateIndonesian(art.publishedAt)}</span>
                </div>

                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2">
                  <Link href={`/articles/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span className="text-[11px] text-slate-400 font-normal">
                  {art.author?.name}
                </span>
                <Link
                  href={`/articles/${art.slug}`}
                  className="text-brand-teal group-hover:text-brand-navy flex items-center gap-1"
                >
                  <span>Mulai</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
