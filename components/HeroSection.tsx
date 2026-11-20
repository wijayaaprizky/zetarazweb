'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowUpRight, BookOpen, Compass, PenTool } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';
import { getCategoryTheme } from '@/lib/categoryTheme';

interface HeroSectionProps {
  mainArticle: any;
  secondaryArticles: any[];
}

/**
 * Pintu masuk per kategori. Warnanya sama dengan warna kategori di seluruh situs,
 * jadi pembaca belajar mengenalinya sejak layar pertama.
 */
const ENTRIES = [
  {
    slug: 'pengetahuan',
    name: 'Pengetahuan',
    desc: 'Konsep, teori, dan panduan teknis',
    icon: BookOpen,
    tile: 'bg-kn-500/20 text-kn-200',
  },
  {
    slug: 'pengalaman',
    name: 'Pengalaman',
    desc: 'Catatan lapangan dan studi kasus',
    icon: Compass,
    tile: 'bg-ex-500/20 text-ex-200',
  },
  {
    slug: 'opini',
    name: 'Opini',
    desc: 'Esai dan sudut pandang kritis',
    icon: PenTool,
    tile: 'bg-op-500/20 text-op-200',
  },
];

/**
 * Peta pengetahuan: tiga simpul besar adalah tiga kategori, simpul kecil adalah
 * tulisan, dan garis menunjukkan bahwa ilmu, pengalaman, dan opini saling terhubung.
 * Garis digambar satu kali saat halaman dibuka (lihat .node-line di globals.css),
 * lalu diam. Pengguna dengan "reduce motion" langsung melihat gambar jadi.
 */
function KnowledgeMap() {
  const kn = 'stroke-kn-300';
  const ex = 'stroke-ex-300';
  const op = 'stroke-op-300';
  const mix = 'stroke-slate-500';
  const lines: Array<[string, string]> = [
    // Pengetahuan
    ['M180 200 L70 110', kn], ['M180 200 L110 330', kn], ['M180 200 L250 90', kn],
    // Pengalaman
    ['M450 150 L570 80', ex], ['M450 150 L580 260', ex], ['M450 150 L380 40', ex],
    // Opini
    ['M330 400 L180 480', op], ['M330 400 L480 470', op], ['M330 400 L560 380', op],
    // Hubungan antarkategori lewat satu gagasan di tengah
    ['M180 200 L330 270', 'stroke-sun-400'], ['M450 150 L330 270', 'stroke-sun-400'], ['M330 400 L330 270', 'stroke-sun-400'],
    ['M180 200 L450 150', mix], ['M180 200 L330 400', mix],
    ['M580 260 L560 380', mix], ['M250 90 L380 40', mix],
  ];
  const small: Array<[number, number, number, string]> = [
    [70, 110, 6, 'fill-kn-300'], [110, 330, 7, 'fill-kn-300'], [250, 90, 7, 'fill-kn-300'],
    [570, 80, 7, 'fill-ex-300'], [580, 260, 8, 'fill-ex-300'], [380, 40, 6, 'fill-ex-300'],
    [180, 480, 7, 'fill-op-300'], [480, 470, 8, 'fill-op-300'], [560, 380, 6, 'fill-op-300'],
    [330, 270, 10, 'fill-sun-400'],
  ];
  const hubs: Array<[number, number, string, string, number]> = [
    [180, 200, 'Pengetahuan', 'fill-kn-300', 38],
    [450, 150, 'Pengalaman', 'fill-ex-300', 38],
    [330, 400, 'Opini', 'fill-op-300', 38],
  ];

  return (
    <svg aria-hidden="true" viewBox="0 0 640 540" className="h-auto w-full" fill="none">
      {lines.map(([d, color], i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          strokeWidth={1.5}
          strokeLinecap="round"
          className={`node-line ${color}`}
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
      {small.map(([cx, cy, r, fill]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r * 2.4} className={`${fill} opacity-10`} />
          <circle cx={cx} cy={cy} r={r} className={fill} />
        </g>
      ))}
      {hubs.map(([cx, cy, label, fill, dy]) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={34} className={`${fill} opacity-10`} />
          <circle cx={cx} cy={cy} r={14} className={fill} />
          <text
            x={cx}
            y={cy + dy}
            textAnchor="middle"
            className="fill-white font-heading"
            style={{ fontSize: 17, fontWeight: 700, paintOrder: 'stroke', stroke: '#0E1128', strokeWidth: 5 }}
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
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

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ENTRIES.map((e) => {
                const Icon = e.icon;
                return (
                  <Link
                    key={e.slug}
                    href={`/category/${e.slug}`}
                    className="group rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:ring-white/25"
                  >
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${e.tile}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="mt-3 block font-heading text-base font-bold text-white">
                      {e.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-slate-300">
                      {e.desc}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Peta pengetahuan */}
          <div className="hidden md:block lg:col-span-5">
            <KnowledgeMap />
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
