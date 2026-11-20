import { contentTypeLabel } from '@/lib/contentTypes';
import { getCategoryTheme } from '@/lib/categoryTheme';
import ReadingControls from '@/components/ReadingControls';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { formatDateIndonesian, calculateReadTime } from '@/lib/utils';
import { getSiteUrl, getCanonicalUrl } from '@/lib/siteConfig';
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

  const isPubliclyAvailable =
    article &&
    (article.publicationStatus === 'PUBLISHED' ||
      article.publicationStatus === 'UPDATE_AVAILABLE' ||
      article.status === 'PUBLISHED');

  if (!article || !isPubliclyAvailable) {
    notFound();
  }

  const url = getCanonicalUrl(`/articles/${article.slug}`);

  // Layout sudah menambahkan " | ZETARAZ Knowledge" lewat title template; buang akhiran
  // yang sudah tertulis di seoTitle supaya nama situs tidak tampil dua kali.
  const pageTitle = (article.seoTitle || article.title)
    .replace(/\s*[|\u2014\u2013-]\s*ZETARAZ Knowledge\s*$/i, '')
    .trim();

  return {
    title: pageTitle,
    description: article.seoDescription || article.excerpt,
    alternates: {
      canonical: article.canonicalUrl || url,
    },
    openGraph: {
      title: pageTitle,
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
      title: pageTitle,
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

  const isPubliclyAvailable =
    article &&
    (article.publicationStatus === 'PUBLISHED' ||
      article.publicationStatus === 'UPDATE_AVAILABLE' ||
      article.status === 'PUBLISHED');

  if (!article || !isPubliclyAvailable) {
    notFound();
  }

  // Controlled Publishing: Public visitors only see the approved published version
  const publicContent = article.publishedContent || article.content;

  // Hitung dari isi sebenarnya, bukan nilai tersimpan yang bisa kedaluwarsa.
  const readTimeMinutes = calculateReadTime(publicContent);
  const articleTheme = getCategoryTheme(article.category.slug);

  // Related articles in the same category
  const relatedArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
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
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      publishedAt: { lt: article.publishedAt || new Date() },
    },
    orderBy: { publishedAt: 'desc' },
    select: { title: true, slug: true },
  });

  const nextArticle = await prisma.article.findFirst({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      publishedAt: { gt: article.publishedAt || new Date() },
    },
    orderBy: { publishedAt: 'asc' },
    select: { title: true, slug: true },
  });

  const siteUrl = getSiteUrl();
  const articleUrl = getCanonicalUrl(`/articles/${article.slug}`);

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
      name: 'ZETARAZ Knowledge',
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
        name: 'Beranda',
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

      <article className="min-h-screen bg-slate-50">
        {/* Bagian atas: gelap dengan cahaya warna kategori. Gambar utama menimpa batas
            gelap-terang di bawahnya supaya halaman terasa berlapis, tidak datar. */}
        <div
          className="relative overflow-hidden bg-slate-950 pb-28 sm:pb-36"
          style={{
            backgroundImage: `radial-gradient(48rem 24rem at 90% -20%, ${articleTheme.glow}, transparent 62%), radial-gradient(34rem 18rem at -5% 110%, rgba(255,255,255,0.06), transparent 60%)`,
          }}
        >
          <div className={`h-1.5 ${articleTheme.bar}`} aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Jejak halaman"
              className="flex items-center gap-2 py-5 text-sm text-slate-300 overflow-x-auto whitespace-nowrap"
            >
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/category/${article.category.slug}`} className="hover:text-white font-medium">
                {article.category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
            </nav>

            <header className="pt-6 lg:grid lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-8">
                {/* Kategori dan format */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <Link
                    href={`/category/${article.category.slug}`}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-opacity hover:opacity-80 ${articleTheme.chip}`}
                  >
                    {article.category.name}
                  </Link>
                  <span className="px-2.5 py-1 bg-white/10 text-slate-200 text-xs font-semibold rounded-full ring-1 ring-inset ring-white/15">
                    {contentTypeLabel(article.contentType)}
                  </span>
                </div>

                {/* Judul */}
                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.25rem] text-white leading-[1.08] tracking-tight mb-5">
                  {article.title}
                </h1>

                {/* Subjudul */}
                {article.subtitle && (
                  <p className="font-read text-xl sm:text-[1.375rem] text-slate-300 leading-relaxed mb-8">
                    {article.subtitle}
                  </p>
                )}

                {/* Penulis dan keterangan terbit */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    {article.author.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-slate-300">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="font-heading font-bold text-sm text-white">
                        {article.author.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        {article.author.bio || 'Penulis di ZETARAZ Knowledge'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDateIndonesian(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {readTimeMinutes} menit baca
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {article.viewCount.toLocaleString('id-ID')} pembaca
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <ShareButtons title={article.title} url={articleUrl} />
                </div>
              </div>
            </header>
          </div>
        </div>

        {/* Gambar utama: naik menimpa bagian gelap di atasnya */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <figure>
                <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-slate-900 shadow-[0_30px_60px_-20px_rgba(14,17,40,0.55)] ring-1 ring-white/10">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1024px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {article.imageCaption && (
                  <figcaption className="text-center text-sm text-slate-500 mt-3">
                    {article.imageCaption}
                  </figcaption>
                )}
              </figure>
            </div>
          </div>
        </div>

        {/* Main Content Area + Table of Contents Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Article Column (8 cols) */}
            <div className="lg:col-span-8">
              <div className="reading-panel">
                <ReadingControls />
                <ArticleContent content={publicContent} />
              </div>

              {/* Tags Section */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-600">
                    <TagIcon className="w-4 h-4 text-kn-600" />
                    <span>Topik Terkait</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map(({ tag }) => (
                      <Link
                        key={tag.id}
                        href={`/search?q=${encodeURIComponent(tag.name)}`}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-kn-50 hover:text-kn-700 text-sm font-medium text-slate-700 transition-colors border border-slate-200/60"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-8 p-6 rounded-3xl bg-white ring-1 ring-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
                  <span className="text-sm font-semibold text-ex-700">
                    Tentang penulis
                  </span>
                  <h4 className="font-heading font-bold text-base text-slate-900 mt-0.5">
                    {article.author.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {article.author.bio ||
                      'Penulis dan kontributor di ZETARAZ Knowledge, mendedikasikan tulisan pada diseminasi pengetahuan bermutu dan pengalaman praktis.'}
                  </p>
                </div>
              </div>

              {/* Prev / Next Article Navigation */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    href={`/articles/${prevArticle.slug}`}
                    className="p-5 rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-kn-400 hover:shadow-lift transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Artikel sebelumnya
                    </span>
                    <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-kn-700 line-clamp-2">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArticle ? (
                  <Link
                    href={`/articles/${nextArticle.slug}`}
                    className="p-5 rounded-2xl bg-white ring-1 ring-slate-200 hover:ring-kn-400 hover:shadow-lift transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="text-xs font-semibold text-slate-500 flex items-center justify-end gap-1 mb-1">
                      Artikel berikutnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-kn-700 line-clamp-2">
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
              <TableOfContents content={publicContent} />
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="bg-white border-t border-slate-200 py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                    Lanjut membaca di {article.category.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <article
                    key={rel.id}
                    className="bg-slate-50 rounded-3xl overflow-hidden ring-1 ring-slate-200 hover:shadow-lift transition-shadow group flex flex-col justify-between"
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
                        <span className={`text-xs font-semibold block mb-1.5 ${articleTheme.text}`}>
                          {contentTypeLabel(rel.contentType)}
                        </span>
                        <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-kn-700 transition-colors line-clamp-2 leading-snug mb-2">
                          <Link href={`/articles/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 text-xs text-slate-500 flex items-center justify-between border-t border-slate-200 mt-2">
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
