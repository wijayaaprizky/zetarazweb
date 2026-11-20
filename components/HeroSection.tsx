'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowUpRight, ArrowRight, BookOpen, Compass, MessageSquareQuote } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';
import { getCategoryTheme } from '@/lib/categoryTheme';

interface HeroSectionProps {
  mainArticle: any;
  secondaryArticles: any[];
}

/**
 * Tiga kartu kategori yang bertumpuk seperti kertas catatan. Tiap kartu satu ide:
 * buku untuk Pengetahuan, kompas untuk Pengalaman, balon ucapan untuk Opini.
 * Kartunya bisa diklik, jadi visual ini sekaligus pintu masuk ke tiap kategori.
 * Di layar lebar (xl) kartu bertumpuk menurun; di layar lebih kecil berjajar
 * sebagai daftar biasa agar teks tidak pernah terpotong.
 */
const CARDS = [
  {
    slug: 'pengetahuan',
    name: 'Pengetahuan',
    desc: 'Konsep, teori, dan panduan teknis yang disusun runtut.',
    icon: BookOpen,
    surface: 'bg-kn-50 ring-kn-200',
    tile: 'bg-kn-600 text-white',
    mark: 'text-kn-700',
    arrow: 'bg-kn-100 text-kn-700 group-hover:bg-kn-600 group-hover:text-white',
    pos: 'xl:left-0 xl:top-0 xl:z-10 xl:-rotate-2',
  },
  {
    slug: 'pengalaman',
    name: 'Pengalaman',
    desc: 'Catatan lapangan, studi kasus, dan pelajaran dari praktik.',
    icon: Compass,
    surface: 'bg-ex-50 ring-ex-200',
    tile: 'bg-ex-600 text-white',
    mark: 'text-ex-700',
    arrow: 'bg-ex-100 text-ex-700 group-hover:bg-ex-600 group-hover:text-white',
    pos: 'xl:left-14 xl:top-[118px] xl:z-20',
  },
  {
    slug: 'opini',
    name: 'Opini',
    desc: 'Esai dan sudut pandang kritis untuk diajak berpikir.',
    icon: MessageSquareQuote,
    surface: 'bg-op-50 ring-op-200',
    tile: 'bg-op-600 text-white',
    mark: 'text-op-700',
    arrow: 'bg-op-100 text-op-700 group-hover:bg-op-600 group-hover:text-white',
    pos: 'xl:left-28 xl:top-[236px] xl:z-30 xl:rotate-2',
  },
];

function CategoryCards() {
  return (
    <div className="flex flex-col gap-3 xl:relative xl:block xl:h-[400px]">
      {CARDS.map((c) => {
        const Icon = c.icon;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl p-5 shadow-xl shadow-black/25 ring-1 transition-transform duration-300 hover:-translate-y-1.5 xl:absolute xl:h-[150px] xl:w-[calc(100%-7rem)] xl:p-6 ${c.surface} ${c.pos}`}
          >
            <Icon
              aria-hidden="true"
              className={`pointer-events-none absolute -bottom-6 right-6 h-32 w-32 opacity-[0.07] ${c.mark}`}
            />
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.tile}`}>
              <Icon className="h-7 w-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-xl font-bold text-slate-900">{c.name}</span>
              <span className="mt-1 block text-sm leading-snug text-slate-600">{c.desc}</span>
            </span>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${c.arrow}`}>
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function HeroSection({ mainArticle, secondaryArticles }: HeroSectionProps) {
  const mainTheme = getCategoryTheme(mainArticle?.category?.slug);

  return (
    <section
      className="relative overflow-hidden bg-slate-950 text-white"
      style={{
        backgroundImage:
          'radial-gradient(60rem 30rem at 85% -10%, rgba(75,91,247,0.35), transparent 60%), radial-gradient(40rem 24rem at 0% 110%, rgba(18,168,140,0.22), transparent 60%)',
      }}
    >
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Pernyataan utama */}
          <div className="lg:col-span-7">
            <h2 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Berbagi pengetahuan, berbagi pengalaman.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Catatan terbuka tentang teknologi, transformasi digital, dan praktik di lapangan.
              Gratis dibaca, ditulis agar mudah dipahami.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-xl bg-sun-400 px-6 py-3 text-base font-bold text-slate-950 transition-colors hover:bg-sun-300"
              >
                Mulai membaca
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-xl px-6 py-3 text-base font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
              >
                Kenali ZETARAZ
              </Link>
            </div>
          </div>

          {/* Kartu kategori */}
          <div className="lg:col-span-5">
            <CategoryCards />
          </div>
        </div>

        {/* Sorotan: satu artikel utama dan beberapa artikel unggulan lainnya */}
        {mainArticle && (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12">
            <article className="group lg:col-span-7">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl shadow-black/30 ring-1 ring-white/10 md:flex-row">
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
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-kn-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-kn-700"
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
                    className="group flex flex-1 gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10"
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
                      <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-300">
                        <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                        <span>{article.category?.name}</span>
                        <span className="text-slate-400">{article.readTimeMinutes} menit</span>
                      </div>
                      <h3 className="line-clamp-3 font-heading text-[15px] font-bold leading-snug text-white">
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
