import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Tidak memiliki otorisasi admin (Unauthorized)' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'File gambar tidak ditemukan dalam permintaan' },
        { status: 400 }
      );
    }

    // Validate mime type
    const mimeType = file.type;
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'image/avif',
    ];

    if (!mimeType || !allowedMimes.includes(mimeType)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Harap unggah gambar JPG, PNG, WebP, GIF, atau SVG.' },
        { status: 400 }
      );
    }

    // Max 10MB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file melebihi batas maksimum 10MB' },
        { status: 400 }
      );
    }

    // Generate safe, clean unique filename
    const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanOriginalName}`;

    // 1. Persist to SQLite dev.db (Resilient across all serverless restarts)
    try {
      await prisma.mediaAsset.upsert({
        where: { filename },
        create: {
          filename,
          originalName: file.name,
          mimeType,
          dataBase64: buffer.toString('base64'),
          size: buffer.length,
        },
        update: {
          mimeType,
          dataBase64: buffer.toString('base64'),
          size: buffer.length,
        },
      });
    } catch (dbErr) {
      console.warn('Could not save to MediaAsset table, continuing with disk write:', dbErr);
    }

    // 2. Save to local public/uploads directory if writable
    try {
      const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(publicUploadsDir)) {
        fs.mkdirSync(publicUploadsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(publicUploadsDir, filename), buffer);
    } catch (fsErr) {
      // In serverless read-only filesystem, public might fail, which is expected
      console.log('Notice: public/uploads write skipped (serverless environment)');
    }

    // 3. Save to /tmp/uploads if on Vercel
    if (process.env.VERCEL) {
      try {
        const tmpUploadsDir = path.join('/tmp', 'uploads');
        if (!fs.existsSync(tmpUploadsDir)) {
          fs.mkdirSync(tmpUploadsDir, { recursive: true });
        }
        fs.writeFileSync(path.join(tmpUploadsDir, filename), buffer);
      } catch (tmpErr) {
        console.warn('Notice: /tmp/uploads write failed:', tmpErr);
      }
    }

    const publicUrl = `/api/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Gambar berhasil diunggah',
      url: publicUrl,
      filename,
      size: buffer.length,
      mimeType,
    });
  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses unggahan gambar: ' + (error.message || 'Kesalahan server') },
      { status: 500 }
    );
  }
}
