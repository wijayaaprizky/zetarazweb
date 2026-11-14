import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import {
  getAllPagesContent,
  getPageContent,
  savePageContent,
  saveAllPagesContent,
  AllPagesContent,
} from '@/lib/pagesContent';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('page') as keyof AllPagesContent | null;

    if (pageKey) {
      const pageData = getPageContent(pageKey);
      return NextResponse.json({ success: true, page: pageData });
    }

    const all = getAllPagesContent();
    return NextResponse.json({ success: true, pages: all });
  } catch (error: any) {
    console.error('Pages content GET error:', error);
    return NextResponse.json(
      { error: 'Gagal memuat konten halaman' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Tidak memiliki hak akses (Unauthorized)' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pageKey, content, allPages } = body;

    let result;
    if (pageKey && content) {
      result = savePageContent(pageKey as keyof AllPagesContent, content);
    } else if (allPages) {
      result = saveAllPagesContent(allPages);
    } else {
      return NextResponse.json(
        { error: 'Parameter pageKey & content atau allPages wajib diisi' },
        { status: 400 }
      );
    }

    try {
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Konten halaman berhasil diperbarui dan dipublikasikan',
      data: result,
    });
  } catch (error: any) {
    console.error('Pages content POST error:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan konten halaman' },
      { status: 500 }
    );
  }
}
