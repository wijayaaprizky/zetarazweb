'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowUpRight, ArrowRight } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';
import { getCategoryTheme } from '@/lib/categoryTheme';
import HeroIllustration from './HeroIllustration';

interface HeroSectionProps {
  mainArticle: any;
  secondaryArticles: any[];
}

export default function HeroSection({ mainArticle, secondaryArticles }: HeroSectionProps) {
  const mainTheme = getCategoryTheme(mainArticle?.category?.slug);

  return (
    <section
      className="relative overflow-hidden bg-slate-50 text-slate-700"
      style={{
        backgroundImage:
          'radial-gradient(44rem 26rem at 88% -8%, rgba(167,201,181,0.34), transparent 62%), radial-gradient(30rem 20rem at -4% 100%, rgba(232,182,108,0.16), transparent 62%)',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Pernyataan utama */}
          <div className="lg:col-span-6 xl:col-span-6">
            <h2 className="font-heading text-4xl font-extrabold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              Berbagi pengetahuan, berbagi pengalaman.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
              Catatan terbuka tentang teknologi, transformasi digital, dan praktik di lapangan.
              Gratis dibaca, ditulis agar mudah dipahami.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-xl bg-kn-700 px-6 py-3 text-base font-bold text-white shadow-lift transition-colors hover:bg-kn-800"
              >
                Mulai membaca
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-xl px-6 py-3 text-base font-semibold text-slate-700 ring-1 ring-slate-300 transition-colors hover:bg-white hover:text-slate-900"
              >
                Kenali ZETARAZ
              </Link>
            </div>
          </div>

          {/* Ilustrasi utama */}
          <div className="lg:col-span-6">
            <HeroIllustration className="mx-auto h-auto w-full max-w-[520px] lg:max-w-none" />
          </div>
        </div>

        {/* Sorotan: satu artikel utama dan beberapa artikel unggulan lainnya */}
        {mainArticle && (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
            <article className="group lg:col-span-7">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-lift ring-1 ring-slate-200 md:flex-row">
                <Link
                  href={`/articles/${mainArticle.slug}`}
                  className="relative block aspect-[16/10] shrink-0 overflow-hidden bg-slate-900 md:aspect-auto md:w-[44%]"
                >
                  <Image
                    src={mainArticle.featuredImage}
                    alt={mainArticle.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${mainTheme.chip}`}>
                    {mainArticle.category?.name || 'Wawasan'}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <time>{formatDateIndonesian(mainArticle.publishedAt)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {mainArticle.readTimeMinutes} menit baca
                    </span>
                  </div>

                  <h3 className={`font-heading text-2xl font-bold leading-tight text-slate-900 transition-colors ${mainTheme.hoverTitle}`}>
                    <Link href={`/articles/${mainArticle.slug}`}>{mainArticle.title}</Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-slate-600">
                    {mainArticle.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <div className="flex min-w-0 items-center gap-2.5">
                      {mainArticle.author?.avatar ? (
                        <img
                          src={mainArticle.author.avatar}
                          alt={mainArticle.author.name}
                          className="h-9 w-9 rounded-full object-cover ring-2 ring-kn-200"
                        />
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kn-600 font-heading text-sm font-bold text-white">
                          {mainArticle.author?.name?.charAt(0) || 'Z'}
                        </span>
                      )}
                      <span className="truncate text-sm font-semibold text-slate-800">
                        {mainArticle.author?.name || 'Redaksi ZETARAZ'}
                      </span>
                    </div>

                    <Link
                      href={`/articles/${mainArticle.slug}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-kn-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-kn-800"
                    >
                      Baca artikel
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-4 lg:col-span-5">
              {secondaryArticles.map((article) => {
                const theme = getCategoryTheme(article.category?.slug);
                return (
                  <article
                    key={article.id}
                    className="group flex flex-1 gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition-shadow hover:shadow-lift"
                  >
                    <Link
                      href={`/articles/${article.slug}`}
                      className="relative aspect-[4/3] w-28 shrink-0 self-center overflow-hidden rounded-xl bg-slate-900"
                    >
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="min-w-0 self-center">
                      <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-600">
                        <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                        <span>{article.category?.name}</span>
                        <span className="text-slate-500">{article.readTimeMinutes} menit</span>
                      </div>
                      <h3 className="line-clamp-3 font-heading text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-kn-700">
                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                      </h3>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
