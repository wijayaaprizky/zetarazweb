import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { publishArticle } from '@/lib/syncService';

export const dynamic = 'force-dynamic';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { notes } = body;

    const result = await publishArticle(params.id, {
      publisherName: currentUser.name,
      notes,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Article publish error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Gagal mempublikasikan artikel' },
      { status: 500 }
    );
  }
}
