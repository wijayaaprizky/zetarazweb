import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { checkAllArticlesSync } from '@/lib/syncService';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const authHeader = request.headers.get('authorization');
    const isSecretAuthorized =
      authHeader === `Bearer ${process.env.JWT_SECRET || 'zetaraz-production-secure-jwt-key-2026-kms-platform'}`;

    if (!currentUser && !isSecretAuthorized) {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const result = await checkAllArticlesSync();
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Check all sync error:', error);
    return NextResponse.json(
      { error: 'Gagal memeriksa sinkronisasi massal' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
