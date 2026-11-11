import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { syncArticleFromGoogleDocs } from '@/lib/syncService';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    // Allow authorized admin or editor, or internal header / webhook token
    const authHeader = request.headers.get('authorization');
    const isWebhookAuthorized =
      authHeader === `Bearer ${process.env.JWT_SECRET || 'zetaraz-production-secure-jwt-key-2026-kms-platform'}`;

    if (!currentUser && !isWebhookAuthorized) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { forceContent, forceRevision, googleDocId } = body;

    const result = await syncArticleFromGoogleDocs(params.id, {
      forceContent,
      forceRevision,
      googleDocId,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Article sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal menyinkronkan dokumen Google Docs' },
      { status: 500 }
    );
  }
}
