import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify, calculateReadTime } from '@/lib/utils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const currentUser = await getCurrentUser();
    const isAdmin = currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'EDITOR');

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        author: { select: { id: true, name: true, avatar: true, bio: true } },
        tags: { include: { tag: true } },
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    // Protect draft articles from non-admins
    if (article.status !== 'PUBLISHED' && !isAdmin) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error('Article GET by id error:', error);
    return NextResponse.json({ error: 'Gagal memuat artikel' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const { id } = params;
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
      contentType,
      status,
      isFeatured,
      seoTitle,
      seoDescription,
      canonicalUrl,
      tagIds,
    } = body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (customSlug && customSlug !== existing.slug) {
      finalSlug = slugify(customSlug);
      const duplicate = await prisma.article.findFirst({
        where: { slug: finalSlug, NOT: { id } },
      });
      if (duplicate) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const readTimeMinutes = content ? calculateReadTime(content) : existing.readTimeMinutes;
    
    // Set publishedAt if transitioning to PUBLISHED
    let publishedAt = existing.publishedAt;
    if (status === 'PUBLISHED' && !existing.publishedAt) {
      publishedAt = new Date();
    }

    // Update tags if provided
    if (Array.isArray(tagIds)) {
      await prisma.articleTag.deleteMany({ where: { articleId: id } });
      if (tagIds.length > 0) {
        await prisma.articleTag.createMany({
          data: tagIds.map((tagId: string) => ({
            articleId: id,
            tagId,
          })),
        });
      }
    }

    const updated = await prisma.article.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        slug: finalSlug,
        ...(subtitle !== undefined && { subtitle }),
        ...(excerpt !== undefined && { excerpt }),
        ...(content !== undefined && { content }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(imageCaption !== undefined && { imageCaption }),
        ...(categoryId !== undefined && { categoryId }),
        ...(contentType !== undefined && { contentType }),
        ...(status !== undefined && { status }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(seoTitle !== undefined && { seoTitle }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(canonicalUrl !== undefined && { canonicalUrl }),
        readTimeMinutes,
        publishedAt,
      },
      include: {
        category: true,
        tags: { include: { tag: true } },
      },
    });

    return NextResponse.json({ success: true, article: updated });
  } catch (error: any) {
    console.error('Article PUT error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui artikel' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Hanya Administrator yang berhak menghapus artikel' }, { status: 403 });
    }

    const { id } = params;
    await prisma.articleTag.deleteMany({ where: { articleId: id } });
    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch (error: any) {
    console.error('Article DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus artikel' }, { status: 500 });
  }
}
