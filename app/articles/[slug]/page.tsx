import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatDateIndonesian } from '@/lib/utils';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import ArticleContent from '@/components/ArticleContent';
import ShareButtons from '@/components/ShareButtons';
import ViewCounter from '@/components/ViewCounter';
import {
  Clock,
  Calendar,
  Eye,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Tag as TagIcon,
  BookOpen,
  User,
} from 'lucide-react';

interface ArticlePageProps {
  params: { slug: string };
}

// Generate dynamic SEO metadata for each article
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { category: true, author: true },
  });

  if (!article || article.status !== 'PUBLISHED') {
    return {
      title: 'Artikel Tidak Ditemukan | ZETARAZ',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/articles/${article.slug}`;

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: {
      canonical: article.canonicalUrl || url,
    },
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      url,
      type: 'article',
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.author.name],
      section: article.category.name,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
    },
  });

  if (!article || article.status !== 'PUBLISHED') {
    notFound();
  }

  // Related articles in the same category
  const relatedArticles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: article.categoryId,
      id: { not: article.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: { category: true, author: true },
  });

  // Previous & Next navigation
  const prevArticle = await prisma.article.findFirst({
    where: {
      status: 'PUBLISHED',
      publishedAt: { lt: article.publishedAt || new Date() },
    },
    orderBy: { publishedAt: 'desc' },
    select: { title: true, slug: true },
  });

  const nextArticle = await prisma.article.findFirst({
    where: {
      status: 'PUBLISHED',
      publishedAt: { gt: article.publishedAt || new Date() },
    },
    orderBy: { publishedAt: 'asc' },
    select: { title: true, slug: true },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  // JSON-LD structured data: Article + Breadcrumbs
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ZETARAZ',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category.name,
        item: `${siteUrl}/category/${article.category.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <ReadingProgressBar />
      <ViewCounter slug={article.slug} />

      {/* JSON-LD Script Tags */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="min-h-screen bg-white">
        {/* Breadcrumb Bar */}
        <div className="bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-brand-blue">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={`/category/${article.category.slug}`}
                className="hover:text-brand-blue font-medium text-slate-700"
              >
                {article.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-8 pb-10 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category badge + content type */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Link
                href={`/category/${article.category.slug}`}
                className="px-3 py-1 bg-teal-50 text-brand-teal text-xs font-bold rounded-full border border-teal-200 uppercase tracking-wider hover:bg-teal-100 transition-colors"
              >
                {article.category.name}
              </Link>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                {article.contentType}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-[1.15] tracking-tight mb-4">
              {article.title}
            </h1>

            {/* Subtitle / Lead Excerpt */}
            {article.subtitle && (
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-6">
                {article.subtitle}
              </p>
            )}

            {/* Author and Metadata Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="font-heading font-bold text-sm text-slate-900">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {article.author.bio || 'Peneliti & Analis Pengetahuan ZETARAZ'}
                  </div>
                </div>
              </div>

              {/* Publication details */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatDateIndonesian(article.publishedAt)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readTimeMinutes} menit baca
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {article.viewCount.toLocaleString('id-ID')} views
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-4 flex justify-end">
              <ShareButtons title={article.title} url={articleUrl} />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-slate-900">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-center text-xs text-slate-500 mt-2.5 italic">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* Main Content Area + Table of Contents Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Article Column (8 cols) */}
            <div className="lg:col-span-8">
              <ArticleContent content={article.content} />

              {/* Tags Section */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <TagIcon className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Topik Terkait</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(({ tag }) => (
                      <Link
                        key={tag.id}
                        href={`/search?q=${encodeURIComponent(tag.name)}`}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-xs font-medium text-slate-700 transition-colors border border-slate-200/60"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {article.author.avatar ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <User className="w-8 h-8 text-slate-500" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal">
                    Tentang Penulis
                  </span>
                  <h4 className="font-heading font-bold text-base text-slate-900 mt-0.5">
                    {article.author.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {article.author.bio ||
                      'Penulis dan periset independen di ZETARAZ, mendedikasikan analisis pada penemuan dan diseminasi pengetahuan bermutu tinggi.'}
                  </p>
                </div>
              </div>

              {/* Prev / Next Article Navigation */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.slug}`}
                    className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue hover:bg-blue-50/30 transition-all group flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Artikel Sebelumnya
                    </span>
                    <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-brand-blue line-clamp-2">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    href={`/articles/${nextArticle.slug}`}
                    className="p-4 rounded-xl border border-slate-200 hover:border-brand-blue hover:bg-blue-50/30 transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1 mb-1">
                      Artikel Selanjutnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-brand-blue line-clamp-2">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Right Sidebar: Table of Contents (4 cols) */}
            <div className="lg:col-span-4 hidden lg:block">
              <TableOfContents content={article.content} />
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="bg-slate-50 border-t border-slate-200 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
                    Telaah Terkait
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl text-brand-navy mt-1">
                    Artikel Terkait di Kategori {article.category.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <article
                    key={rel.id}
                    className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <Link
                        href={`/articles/${rel.slug}`}
                        className="relative aspect-[16/10] block overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={rel.featuredImage}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-5">
                        <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider block mb-1.5">
                          {rel.contentType}
                        </span>
                        <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug mb-2">
                          <Link href={`/articles/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 mt-2">
                      <span>{rel.readTimeMinutes} menit baca</span>
                      <span>{formatDateIndonesian(rel.publishedAt)}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
