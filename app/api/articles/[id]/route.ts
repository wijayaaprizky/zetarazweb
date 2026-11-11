import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify, calculateReadTime } from '@/lib/utils';
import { publishArticle } from '@/lib/syncService';

export const dynamic = 'force-dynamic';

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

    // Public visitors must only access articles with an active published version
    const isPubliclyVisible =
      article.publicationStatus === 'PUBLISHED' ||
      article.publicationStatus === 'UPDATE_AVAILABLE' ||
      article.status === 'PUBLISHED';

    if (!isPubliclyVisible && !isAdmin) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    }

    // If request is from a public visitor, strip draft-only fields and serve publishedContent
    if (!isAdmin) {
      const publicArticle = {
        ...article,
        content: article.publishedContent || article.content,
        draftContent: undefined, // Never expose draft content through public APIs
      };
      return NextResponse.json({ success: true, article: publicArticle });
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
    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EDITOR')) {
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
      publicationStatus,
      googleDocId,
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

    // If explicit publish action requested
    if (status === 'PUBLISHED' && existing.publicationStatus !== 'PUBLISHED') {
      const publishRes = await publishArticle(id, {
        publisherName: currentUser.name,
      });
      if (!publishRes.success) {
        return NextResponse.json({ error: publishRes.error }, { status: 400 });
      }
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

    // Determine content update behavior
    let updateData: any = {
      ...(title !== undefined && { title }),
      slug: finalSlug,
      ...(subtitle !== undefined && { subtitle }),
      ...(excerpt !== undefined && { excerpt }),
      ...(featuredImage !== undefined && { featuredImage }),
      ...(imageCaption !== undefined && { imageCaption }),
      ...(categoryId !== undefined && { categoryId }),
      ...(contentType !== undefined && { contentType }),
      ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
      ...(seoTitle !== undefined && { seoTitle }),
      ...(seoDescription !== undefined && { seoDescription }),
      ...(canonicalUrl !== undefined && { canonicalUrl }),
      ...(googleDocId !== undefined && { googleDocId }),
      readTimeMinutes,
    };

    // If content is edited:
    if (content !== undefined) {
      if (existing.publicationStatus === 'PUBLISHED') {
        // Modifying content of an already published article creates a draft update
        updateData.draftContent = content;
        updateData.draftVersion = existing.draftVersion + 1;
        updateData.publicationStatus = 'UPDATE_AVAILABLE';
        // publishedContent is preserved!
      } else {
        // DRAFT article or UPDATE_AVAILABLE
        updateData.draftContent = content;
        if (existing.publicationStatus === 'DRAFT') {
          updateData.content = content;
        }
      }
    }

    if (publicationStatus !== undefined) {
      updateData.publicationStatus = publicationStatus;
    }

    const updated = await prisma.article.update({
      where: { id },
      data: updateData,
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
      return NextResponse.json(
        { error: 'Hanya Administrator yang berhak menghapus artikel' },
        { status: 403 }
      );
    }

    const { id } = params;
    await prisma.syncHistory.deleteMany({ where: { articleId: id } });
    await prisma.publicationHistory.deleteMany({ where: { articleId: id } });
    await prisma.articleVersion.deleteMany({ where: { articleId: id } });
    await prisma.articleTag.deleteMany({ where: { articleId: id } });
    await prisma.article.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch (error: any) {
    console.error('Article DELETE error:', error);
    return NextResponse.json({ error: 'Gagal menghapus artikel' }, { status: 500 });
  }
}
