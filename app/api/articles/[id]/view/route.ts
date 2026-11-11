import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const slugOrId = params.id;

    // Try finding by slug first, then by id
    let article = await prisma.article.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
      select: { id: true, slug: true, viewCount: true },
    });

    if (!article) {
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    const updated = await prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
      select: { id: true, slug: true, viewCount: true },
    });

    return NextResponse.json({ success: true, viewCount: updated.viewCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to increment view' }, { status: 500 });
  }
}
