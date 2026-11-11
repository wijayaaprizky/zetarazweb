import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import LatestArticles from '@/components/LatestArticles';
import ExploreCategories from '@/components/ExploreCategories';
import ResearchInsights from '@/components/ResearchInsights';
import PopularArticles from '@/components/PopularArticles';
import RecommendedLearning from '@/components/RecommendedLearning';
import NewsletterSection from '@/components/NewsletterSection';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // Fetch featured articles
  const featuredArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED', isFeatured: true },
    orderBy: { publishedAt: 'desc' },
    take: 4,
    include: {
      category: true,
      author: true,
    },
  });

  const mainFeatured = featuredArticles[0] || null;
  const secondaryFeatured = featuredArticles.slice(1, 4);

  // Latest articles (excluding the main hero if present)
  const latestArticles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      ...(mainFeatured ? { id: { not: mainFeatured.id } } : {}),
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: {
      category: true,
      author: true,
    },
  });

  // Categories with counts
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: {
          articles: { where: { status: 'PUBLISHED' } },
        },
      },
    },
  });

  // Research category articles
  const researchArticles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      category: { slug: 'research' },
    },
    orderBy: { publishedAt: 'desc' },
    take: 2,
    include: {
      category: true,
      author: true,
    },
  });

  // Popular articles (strictly ordered by viewCount)
  const popularArticles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { viewCount: 'desc' },
    take: 5,
    include: {
      category: true,
      author: true,
    },
  });

  // Learning / Tutorials
  const learningArticles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { category: { slug: 'learning' } },
        { contentType: 'TUTORIAL' },
      ],
    },
    orderBy: { publishedAt: 'desc' },
    take: 4,
    include: {
      category: true,
      author: true,
    },
  });

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        mainArticle={mainFeatured}
        secondaryArticles={secondaryFeatured}
      />

      {/* 2. Explore Knowledge Categories */}
      <ExploreCategories categories={categories} />

      {/* 3. Main Editorial Feed + Popular Sidebar */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 cols: Latest Knowledge Grid */}
            <div className="lg:col-span-8">
              <LatestArticles articles={latestArticles} />
            </div>

            {/* Right 4 cols: Popular / Most Read Sidebar */}
            <div className="lg:col-span-4 lg:pt-12">
              <div className="sticky top-28 space-y-8">
                <PopularArticles articles={popularArticles} />

                {/* Editorial Mission Callout Box */}
                <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800">
                  <div className="text-[10px] font-black tracking-widest text-teal-400 uppercase mb-2">
                    Manifesto ZETARAZ
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-white mb-2">
                    Demokratisasi Pengetahuan Kritis
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Kami meyakini bahwa pengetahuan sejati harus terbebas dari jargon artifisial, dapat diverifikasi secara saintifik, dan mudah diakses oleh para pembelajar di seluruh nusantara.
                  </p>
                  <a
                    href="/about"
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                  >
                    Pelajari Filosofi Kami →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Research & Scientific Insights */}
      <ResearchInsights articles={researchArticles} />

      {/* 5. Recommended Learning & Guides */}
      <RecommendedLearning articles={learningArticles} />

      {/* 6. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
