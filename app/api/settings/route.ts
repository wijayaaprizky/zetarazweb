import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import { getSiteSettings, saveSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { error: 'Gagal memuat pengaturan website' },
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
    const updated = saveSiteSettings(body);

    try {
      revalidatePath('/', 'layout');
    } catch (revalError) {
      console.warn('Revalidation warning:', revalError);
    }

    return NextResponse.json({
      success: true,
      message: 'Pengaturan website dan footer berhasil disimpan',
      settings: updated,
    });
  } catch (error: any) {
    console.error('Settings POST error:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan pengaturan' },
      { status: 500 }
    );
  }
}
