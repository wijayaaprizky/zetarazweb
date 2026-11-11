import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify, calculateReadTime } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const tagSlug = searchParams.get('tag');
    const contentType = searchParams.get('type');
    const featuredOnly = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const sort = searchParams.get('sort') || 'latest';
    const statusFilter = searchParams.get('status');

    // Authentication check for draft visibility
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'EDITOR');

    // Build where clause
    const where: any = {};

    if (isAdmin && statusFilter) {
      if (statusFilter === 'UPDATE_AVAILABLE') {
        where.publicationStatus = 'UPDATE_AVAILABLE';
      } else if (statusFilter === 'DRAFT') {
        where.publicationStatus = 'DRAFT';
      } else if (statusFilter === 'PUBLISHED') {
        where.publicationStatus = { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] };
      } else {
        where.status = statusFilter;
      }
    } else {
      // Public visitors MUST only see published articles (including those with pending updates)
      where.publicationStatus = { in: ['PUBLISHED', 'UPDATE_AVAILABLE'] };
    }

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (contentType) {
      where.contentType = contentType;
    }

    if (featuredOnly) {
      where.isFeatured = true;
    }

    if (tagSlug) {
      where.tags = {
        some: {
          tag: { slug: tagSlug },
        },
      };
    }

    // Determine orderBy
    let orderBy: any = { publishedAt: 'desc' };
    if (sort === 'popular') {
      orderBy = { viewCount: 'desc' };
    } else if (sort === 'title') {
      orderBy = { title: 'asc' };
    }

    const rawArticles = await prisma.article.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        category: {
          select: { id: true, name: true, slug: true, icon: true },
        },
        author: {
          select: { id: true, name: true, avatar: true },
        },
        tags: {
          include: {
            tag: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    // Public API protection: Never expose draft content through public APIs
    const articles = rawArticles.map((art) => {
      if (!isAdmin) {
        return {
          ...art,
          content: art.publishedContent || art.content,
          draftContent: undefined,
        };
      }
      return art;
    });

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error('Articles GET error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data artikel' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      subtitle,
      excerpt,
      content,
      featuredImage,
      imageCaption,
      categoryId,
      contentType = 'EDITORIAL',
      status = 'DRAFT',
      googleDocId,
      isFeatured = false,
      seoTitle,
      seoDescription,
      canonicalUrl,
      tagIds = [],
    } = body;

    if (!title || !excerpt || !content || !categoryId) {
      return NextResponse.json(
        { error: 'Judul, ringkasan, konten, dan kategori wajib diisi' },
        { status: 400 }
      );
    }

    // Handle slug uniqueness
    let finalSlug = slugify(customSlug || title);
    const existing = await prisma.article.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const readTimeMinutes = calculateReadTime(content);
    const isPublishingNow = status === 'PUBLISHED';
    const publicationStatus = isPublishingNow ? 'PUBLISHED' : 'DRAFT';
    const publishedVersion = isPublishingNow ? 1 : 0;
    const publishedContent = isPublishingNow ? content : null;

    const article = await prisma.article.create({
      data: {
        title,
        slug: finalSlug,
        subtitle,
        excerpt,
        content,
        publishedContent,
        draftContent: content,
        publishedVersion,
        draftVersion: 1,
        publicationStatus,
        status: publicationStatus,
        googleDocId: googleDocId || null,
        syncStatus: googleDocId ? 'SYNCED' : 'IDLE',
        featuredImage:
          featuredImage ||
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
        imageCaption,
        categoryId,
        authorId: currentUser.id,
        contentType,
        isFeatured: Boolean(isFeatured),
        readTimeMinutes,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        canonicalUrl,
        publishedAt: isPublishingNow ? new Date() : null,
        tags: {
          create: tagIds.map((tagId: string) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    if (isPublishingNow) {
      await prisma.publicationHistory.create({
        data: {
          articleId: article.id,
          action: 'PUBLISH',
          version: 1,
          publishedBy: currentUser.name,
          notes: 'Publikasi perdana saat pembuatan artikel.',
        },
      });

      await prisma.articleVersion.create({
        data: {
          articleId: article.id,
          version: 1,
          title,
          content,
          excerpt,
          createdById: currentUser.name,
        },
      });
    }

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error: any) {
    console.error('Article POST error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat artikel baru' },
      { status: 500 }
    );
  }
}
