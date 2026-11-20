import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import LatestArticles from '@/components/LatestArticles';
import PopularArticles from '@/components/PopularArticles';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // 1. Featured articles for the Hero section (Headlines)
  const featuredArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      isFeatured: true,
    },
    orderBy: { publishedAt: 'desc' },
    take: 4,
    include: {
      category: true,
      author: true,
    },
  });

  const mainFeatured = featuredArticles[0] || null;
  const secondaryFeatured = featuredArticles.slice(1, 4);

  // 2. All latest articles for the news-style article list (excluding main headline)
  const latestArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      ...(mainFeatured ? { id: { not: mainFeatured.id } } : {}),
    },
    orderBy: { publishedAt: 'desc' },
    take: 12,
    include: {
      category: true,
      author: true,
    },
  });

  // 3. Trending / Popular articles (strictly ordered by viewCount)
  const popularArticles = await prisma.article.findMany({
    where: { publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] } },
    orderBy: { viewCount: 'desc' },
    take: 5,
    include: {
      category: true,
      author: true,
    },
  });

  return (
    <div className="flex flex-col">
      <h1 className="sr-only">ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman</h1>
      
      {/* 1. Hero Section (Sorotan Berita Utama) */}
      <HeroSection
        mainArticle={mainFeatured}
        secondaryArticles={secondaryFeatured}
      />

      {/* 2. News-Style Articles Feed + Trending Sidebar */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 cols: News-style Article List with category filter tabs */}
            <div className="lg:col-span-8">
              <LatestArticles articles={latestArticles} />
            </div>

            {/* Right 4 cols: Trending / Popular Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                <PopularArticles articles={popularArticles} />

                {/* Ajakan mengenal ZETARAZ */}
                <div className="rounded-3xl bg-ex-100 p-6">
                  <h4 className="font-heading text-xl font-bold text-slate-900 mb-2">
                    Pengetahuan tumbuh saat dibagikan
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Setiap pemahaman dan pengalaman yang dibagikan secara jujur dan terbuka akan menjadi lentera belajar bagi sesama.
                  </p>
                  <a
                    href="/about"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-kn-700 underline underline-offset-4 hover:text-kn-900"
                  >
                    Kenali ZETARAZ lebih dekat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About ZETARAZ Knowledge */}
      <AboutSection />

      {/* 4. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
