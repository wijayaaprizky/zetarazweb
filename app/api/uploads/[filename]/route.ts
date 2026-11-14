import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.avif':
      return 'image/avif';
    default:
      return 'application/octet-stream';
  }
}

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    // 1. Check local /public/uploads
    const publicPath = path.join(process.cwd(), 'public', 'uploads', filename);
    if (fs.existsSync(publicPath)) {
      const buffer = fs.readFileSync(publicPath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': getMimeType(filename),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Check /tmp/uploads
    const tmpPath = path.join('/tmp', 'uploads', filename);
    if (fs.existsSync(tmpPath)) {
      const buffer = fs.readFileSync(tmpPath);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': getMimeType(filename),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 3. Fallback: Query SQLite database MediaAsset
    const asset = await prisma.mediaAsset.findUnique({
      where: { filename },
    });

    if (asset && asset.dataBase64) {
      const buffer = Buffer.from(asset.dataBase64, 'base64');

      // Opportunistically cache to /tmp
      try {
        const tmpDir = path.join('/tmp', 'uploads');
        if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
        fs.writeFileSync(tmpPath, buffer);
      } catch {}

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': asset.mimeType || getMimeType(filename),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return new NextResponse('Image not found', { status: 404 });
  } catch (error: any) {
    console.error('Error serving upload asset:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
