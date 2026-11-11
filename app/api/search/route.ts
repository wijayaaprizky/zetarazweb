import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';
    const categorySlug = searchParams.get('category');
    const contentType = searchParams.get('type');
    const sort = searchParams.get('sort') || 'relevance';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Only search published articles (including those with pending updates)
    const where: any = {
      publicationStatus: { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] },
    };

    if (categorySlug && categorySlug !== 'all') {
      where.category = { slug: categorySlug };
    }

    if (contentType && contentType !== 'all') {
      where.contentType = contentType;
    }

    if (query) {
      where.OR = [
        { title: { contains: query } },
        { excerpt: { contains: query } },
        { publishedContent: { contains: query } },
        { content: { contains: query } },
        { category: { name: { contains: query } } },
        { tags: { some: { tag: { name: { contains: query } } } } },
      ];
    }

    let orderBy: any = { publishedAt: 'desc' };
    if (sort === 'popular') {
      orderBy = { viewCount: 'desc' };
    } else if (sort === 'oldest') {
      orderBy = { publishedAt: 'asc' };
    }

    const rawArticles = await prisma.article.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        category: true,
        author: { select: { id: true, name: true, avatar: true } },
        tags: { include: { tag: true } },
      },
    });

    // Never expose draftContent through search
    const articles = rawArticles.map((art) => ({
      ...art,
      content: art.publishedContent || art.content,
      draftContent: undefined,
    }));

    // Provide helpful suggestions if no articles found
    let suggestions: string[] = [];
    if (articles.length === 0 && query) {
      suggestions = [
        'Manajemen Pengetahuan',
        'Kecerdasan Buatan',
        'Sains Data',
        'Arsitektur Enterprise',
        'Metodologi Penelitian',
        'Keamanan Siber',
      ];
    }

    return NextResponse.json({
      success: true,
      query,
      count: articles.length,
      articles,
      suggestions,
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Gagal melakukan pencarian pengetahuan' },
      { status: 500 }
    );
  }
}
