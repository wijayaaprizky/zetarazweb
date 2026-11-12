import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDateIndonesian } from '@/lib/utils';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  Archive,
  Calendar,
  FolderOpen,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Tag,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arsip Pengetahuan (Knowledge Archive) — ZETARAZ Knowledge',
  description:
    'Indeks kronologis seluruh terbitan artikel, ulasan riset, dan panduan belajar di ZETARAZ Knowledge berdasarkan tahun, bulan, dan domain ilmu.',
  alternates: {
    canonical: getCanonicalUrl('/archive'),
  },
};

export default async function ArchivePage() {
  const [articles, categories, tags] = await Promise.all([
    prisma.article.findMany({
      where: { publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] } },
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            articles: {
              where: { publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] } },
            },
          },
        },
      },
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    }),
  ]);

  // Group articles by year and month
  const groupedByYear: { [year: string]: { [month: string]: typeof articles } } = {};

  articles.forEach((art) => {
    const date = art.publishedAt ? new Date(art.publishedAt) : new Date(art.createdAt);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });

    if (!groupedByYear[year]) {
      groupedByYear[year] = {};
    }
    if (!groupedByYear[year][month]) {
      groupedByYear[year][month] = [];
    }
    groupedByYear[year][month].push(art);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Arsip Publikasi</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Archive className="w-3.5 h-3.5" />
            <span>Indeks Kronologis</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Arsip Pengetahuan (Archive Page)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Jelajahi rekam jejak publikasi, dokumentasi pemikiran, dan catatan pengalaman yang telah diterbitkan dari waktu ke waktu.
          </p>
          <div className="text-xs text-slate-400 mt-4">
            Total Arsip: <span className="text-teal-400 font-bold">{articles.length}</span> Entri Pengetahuan
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Chronological Articles (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {articles.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center mx-auto mb-4 border border-teal-100">
                  <Archive className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  Arsip Masih Kosong
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                  Belum ada artikel yang masuk ke dalam arsip publikasi. Begitu artikel baru diterbitkan, entri akan otomatis tersusun rapi berdasarkan bulan dan tahun di sini.
                </p>
                <Link
                  href="/"
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <span>Kembali ke Beranda</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              years.map((year) => (
                <div key={year} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-100">
                    <Calendar className="w-5 h-5 text-brand-teal" />
                    <h2 className="font-heading font-extrabold text-2xl text-brand-navy">
                      Tahun {year}
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {Object.keys(groupedByYear[year]).map((month) => (
                      <div key={month} className="space-y-4">
                        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-teal bg-teal-50/80 px-3 py-1 rounded-md inline-block">
                          {month}
                        </h3>

                        <div className="divide-y divide-slate-100">
                          {groupedByYear[year][month].map((art) => (
                            <article key={art.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                              <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                                  [{art.contentType}]
                                </span>
                                <Link
                                  href={`/articles/${art.slug}`}
                                  className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-brand-blue transition-colors"
                                >
                                  {art.title}
                                </Link>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                                <span>{art.category?.name}</span>
                                <span>•</span>
                                <span>{art.readTimeMinutes} menit</span>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Categories & Tags Breakdown (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Categories breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <FolderOpen className="w-4 h-4 text-brand-teal" />
                <h3 className="font-heading font-bold text-sm text-brand-navy uppercase tracking-wider">
                  Arsip Berdasarkan Domain
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/category/${c.slug}`}
                      className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 hover:text-brand-navy"
                    >
                      <span className="font-medium">{c.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">
                        {c._count?.articles || 0}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags cloud */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Tag className="w-4 h-4 text-brand-teal" />
                <h3 className="font-heading font-bold text-sm text-brand-navy uppercase tracking-wider">
                  Topik & Tag
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link
                    key={t.id}
                    href={`/search?q=${encodeURIComponent(t.name)}`}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg text-xs text-slate-600 hover:text-brand-teal transition-all"
                  >
                    #{t.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
