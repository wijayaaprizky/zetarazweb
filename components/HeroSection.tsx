import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
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
      <section className="py-14 lg:py-20 bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZETARAZ Knowledge Platform</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Berbagi Pengetahuan, Berbagi Pengalaman.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Platform independen untuk menemukan pengetahuan, memperluas wawasan, dan bertukar pengalaman nyata lintas disiplin ilmu.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about"
              className="px-6 py-3 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Mengenal Inisiatif Kami</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/category/knowledge"
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              Jelajahi Pilar Pengetahuan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-brand-navy">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-brand-teal rounded-full"></span>
            <span className="text-xs font-black uppercase tracking-widest text-brand-navy">
              Sorotan Pengetahuan Pilihan
            </span>
          </div>
          <span className="text-xs text-brand-teal font-semibold hidden sm:inline">
            Berbagi Pengetahuan, Berbagi Pengalaman
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Featured Article (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between group">
            <div>
              <Link
                href={`/articles/${mainArticle.slug}`}
                className="block overflow-hidden rounded-2xl relative aspect-[16/10] mb-5 shadow-lg bg-slate-900"
              >
                <Image
                  src={mainArticle.featuredImage}
                  alt={mainArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-brand-teal text-white rounded-full shadow-md">
                    {mainArticle.category?.name}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between text-slate-300">
                  <span>{mainArticle.author?.name}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {mainArticle.readTimeMinutes} menit baca
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                <span className="font-semibold text-brand-blue uppercase tracking-wider">
                  {mainArticle.contentType}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatDateIndonesian(mainArticle.publishedAt)}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 group-hover:text-brand-blue transition-colors leading-[1.2] mb-3">
                <Link href={`/articles/${mainArticle.slug}`}>
                  {mainArticle.title}
                </Link>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed line-clamp-3 mb-4 font-normal">
                {mainArticle.excerpt}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/articles/${mainArticle.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors group/btn"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform text-brand-teal" />
              </Link>
            </div>
          </div>

          {/* Secondary Featured Articles (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-0 lg:divide-y lg:divide-slate-200">
            {secondaryArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`group flex flex-col sm:flex-row lg:flex-col gap-4 ${
                  idx !== 0 ? 'lg:pt-6' : ''
                }`}
              >
                <div className="flex gap-4 items-start">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="relative w-28 sm:w-36 lg:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-sm"
                  >
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 640px) 112px, 144px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
                        {article.category?.name}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400">
                        {article.readTimeMinutes} menit baca
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-1.5">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="font-medium text-slate-600">{article.author?.name}</span>
                      <span>•</span>
                      <span>{formatDateIndonesian(article.publishedAt)}</span>
                    </div>
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
