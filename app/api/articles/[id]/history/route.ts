import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const { id } = params;

    const [syncLogs, publicationLogs, versions] = await Promise.all([
      prisma.syncHistory.findMany({
        where: { articleId: id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      prisma.publicationHistory.findMany({
        where: { articleId: id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      prisma.articleVersion.findMany({
        where: { articleId: id },
        orderBy: { version: 'desc' },
        take: 20,
      }),
    ]);

    return NextResponse.json({
      success: true,
      syncLogs,
      publicationLogs,
      versions,
    });
  } catch (error: any) {
    console.error('History GET error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil riwayat audit artikel' },
      { status: 500 }
    );
  }
}
