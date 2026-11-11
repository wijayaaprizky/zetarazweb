import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { syncArticleFromGoogleDocs } from '@/lib/syncService';
import { extractDocId } from '@/lib/googleDocs';

export const dynamic = 'force-dynamic';

/**
 * Webhook receiver for Google Docs / Google Drive push notifications.
 * Automatically synchronizes changes and saves them as a new draft.
 * CRITICAL RULE: Automatic synchronization NEVER means automatic publication.
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const secret = process.env.SYNC_WEBHOOK_SECRET || process.env.JWT_SECRET || 'zetaraz-sync-secret';

    // Optional webhook token verification
    if (authHeader && authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Webhook token tidak valid' }, { status: 401 });
    }

    let payload: any = {};
    try {
      payload = await request.json();
    } catch {
      payload = {};
    }

    const { articleId, googleDocId, forceContent, forceRevision } = payload;

    if (!articleId && !googleDocId) {
      return NextResponse.json(
        { error: 'articleId atau googleDocId wajib disertakan dalam payload webhook' },
        { status: 400 }
      );
    }

    let targetArticleId = articleId;

    if (!targetArticleId && googleDocId) {
      const cleanDocId = extractDocId(googleDocId);
      const matched = await prisma.article.findFirst({
        where: {
          OR: [
            { googleDocId: { contains: cleanDocId } },
            { googleDocId: googleDocId },
          ],
        },
      });

      if (!matched) {
        return NextResponse.json(
          { error: `Tidak ada artikel yang terhubung dengan Google Doc ID: ${googleDocId}` },
          { status: 404 }
        );
      }
      targetArticleId = matched.id;
    }

    const syncResult = await syncArticleFromGoogleDocs(targetArticleId, {
      forceContent,
      forceRevision,
      googleDocId,
    });

    return NextResponse.json({
      success: syncResult.success,
      articleId: targetArticleId,
      updated: syncResult.updated,
      draftVersion: syncResult.draftVersion,
      publicationStatus: syncResult.publicationStatus,
      message: syncResult.message || 'Webhook berhasil diproses. Draf telah disinkronkan.',
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal memproses webhook sinkronisasi' },
      { status: 500 }
    );
  }
}
