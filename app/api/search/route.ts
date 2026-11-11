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

    const where: any = {
      status: 'PUBLISHED',
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

    const articles = await prisma.article.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        category: true,
        author: { select: { id: true, name: true, avatar: true } },
        tags: { include: { tag: true } },
      },
    });

    // Provide helpful suggestions if no articles found
    let suggestions: string[] = [];
    if (articles.length === 0 && query) {
      suggestions = [
        'Knowledge Management',
        'Business Process Management',
        'Enterprise Architecture',
        'Artificial Intelligence',
        'Keamanan Siber',
        'Metodologi Riset',
      ];
    }

    return NextResponse.json({
      success: true,
      query,
      total: articles.length,
      articles,
      suggestions,
    });
  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Gagal melakukan pencarian' }, { status: 500 });
  }
}
