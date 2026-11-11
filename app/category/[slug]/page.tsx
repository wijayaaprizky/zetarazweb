import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatDateIndonesian } from '@/lib/utils';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { type?: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    return { title: 'Kategori Tidak Ditemukan | ZETARAZ' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/category/${category.slug}`;

  return {
    title: `${category.name} — Pengetahuan & Riset | ZETARAZ`,
    description:
      category.description ||
      `Kumpulan artikel, kajian, dan panduan komprehensif dalam domain ${category.name} di platform ZETARAZ.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} | ZETARAZ`,
      description: category.description || `Eksplorasi domain ${category.name}.`,
      url,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  const selectedType = searchParams.type;

  const whereClause: any = {
    categoryId: category.id,
    status: 'PUBLISHED',
  };

  if (selectedType && selectedType !== 'ALL') {
    whereClause.contentType = selectedType;
  }

  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: { publishedAt: 'desc' },
    include: {
      author: true,
      category: true,
    },
  });

  const contentTypes = ['ALL', 'EDITORIAL', 'RESEARCH', 'TUTORIAL', 'ANALYSIS'];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header Banner */}
      <header className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-3">
              Domain Pengetahuan
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
              {category.name}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {category.description ||
                'Eksplorasi telaah ilmiah, metodologi praktis, dan artikel terkini.'}
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="text-teal-400 font-bold">{articles.length}</span>{' '}
              Artikel Publikasi Terverifikasi
            </div>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 overflow-x-auto py-3 no-scrollbar">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Tipe Konten:
            </span>
            {contentTypes.map((type) => {
              const isActive = (selectedType || 'ALL') === type;
              return (
                <Link
                  key={type}
                  href={`/category/${category.slug}${
                    type === 'ALL' ? '' : `?type=${type}`
                  }`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'ALL' ? 'Semua Format' : type}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Articles Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-800">
              Belum Ada Artikel dalam Format Ini
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Silakan pilih filter lain atau lihat seluruh publikasi pada kategori ini.
            </p>
            <Link
              href={`/category/${category.slug}`}
              className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-brand-blue transition-colors"
            >
              Tampilkan Semua Format
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <Link
                    href={`/articles/${art.slug}`}
                    className="relative aspect-[16/10] block overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={art.featuredImage}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy rounded-full shadow-sm backdrop-blur-sm border border-slate-200">
                        {art.contentType}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateIndonesian(art.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTimeMinutes} menit baca
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-2.5">
                      <Link href={`/articles/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-600 font-medium">
                    {art.author.name}
                  </span>
                  <Link
                    href={`/articles/${art.slug}`}
                    className="text-xs font-bold text-brand-teal group-hover:text-brand-navy flex items-center gap-1"
                  >
                    <span>Baca Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
