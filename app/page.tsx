import React from 'react';
import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/HeroSection';
import LatestArticles from '@/components/LatestArticles';
import ExploreCategories from '@/components/ExploreCategories';
import ResearchInsights from '@/components/ResearchInsights';
import PopularArticles from '@/components/PopularArticles';
import RecommendedLearning from '@/components/RecommendedLearning';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  // Fetch featured articles
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

  // Latest articles (excluding the main hero if present)
  const latestArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      ...(mainFeatured ? { id: { not: mainFeatured.id } } : {}),
    },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: {
      category: true,
      author: true,
    },
  });

  // All 6 categories with counts
  const categories = await prisma.category.findMany({
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
  });

  // Science & Research category articles
  const scienceResearchArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      category: { slug: 'science-research' },
    },
    orderBy: { publishedAt: 'desc' },
    take: 2,
    include: {
      category: true,
      author: true,
    },
  });

  // Trending / Popular articles (strictly ordered by viewCount)
  const popularArticles = await prisma.article.findMany({
    where: { publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] } },
    orderBy: { viewCount: 'desc' },
    take: 5,
    include: {
      category: true,
      author: true,
    },
  });

  // Learning / Tutorials & Practical Guides
  const learningArticles = await prisma.article.findMany({
    where: {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
      OR: [
        { category: { slug: 'learning' } },
        { contentType: 'TUTORIAL' },
        { contentType: 'EXPERIENCE' },
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
      {/* 1. Hero Section (Featured Knowledge) */}
      <HeroSection
        mainArticle={mainFeatured}
        secondaryArticles={secondaryFeatured}
      />

      {/* 2. Explore Categories (6 Disciplines) */}
      <ExploreCategories categories={categories} />

      {/* 3. Main Editorial Feed + Trending Topics Sidebar */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 cols: Latest Knowledge Grid */}
            <div className="lg:col-span-8">
              <LatestArticles articles={latestArticles} />
            </div>

            {/* Right 4 cols: Trending / Popular Sidebar */}
            <div className="lg:col-span-4 lg:pt-12">
              <div className="sticky top-28 space-y-8">
                <PopularArticles articles={popularArticles} />

                {/* Friendly Invitation Callout Box */}
                <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800">
                  <div className="text-[10px] font-black tracking-widest text-teal-400 uppercase mb-2">
                    Semangat ZETARAZ
                  </div>
                  <h4 className="font-heading font-extrabold text-lg text-white mb-2">
                    Berbagi Pengetahuan, Berbagi Pengalaman
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                    Setiap pemahaman dan pengalaman yang dibagikan secara jujur dan terbuka akan menjadi lentera belajar bagi sesama.
                  </p>
                  <a
                    href="/about"
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                  >
                    Mengenal Inisiatif Kami →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Tutorials & Learning */}
      <RecommendedLearning articles={learningArticles} />

      {/* 5. Science & Research Insights */}
      <ResearchInsights articles={scienceResearchArticles} />

      {/* 6. About ZETARAZ Knowledge (Dedicated welcoming section) */}
      <AboutSection />

      {/* 7. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
