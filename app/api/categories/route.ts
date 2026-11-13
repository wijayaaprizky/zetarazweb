import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            articles: {
              where: { status: 'PUBLISHED' },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    console.error('Categories GET error:', error);
    return NextResponse.json({
      success: true,
      categories: [
        { id: 'cat-1', name: 'Pengetahuan', slug: 'pengetahuan', description: 'Panduan konsep, teori, tutorial terstruktur', icon: 'BookOpen' },
        { id: 'cat-2', name: 'Pengalaman', slug: 'pengalaman', description: 'Catatan lapangan nyata & lessons learned', icon: 'Compass' },
        { id: 'cat-3', name: 'Opini', slug: 'opini', description: 'Sudut pandang kritis & refleksi pemikiran', icon: 'PenTool' },
      ],
    });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const { name, slug: customSlug, description, icon } = await request.json();
    if (!name) {
      return NextResponse.json({ error: 'Nama kategori wajib diisi' }, { status: 400 });
    }

    const slug = slugify(customSlug || name);
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Kategori dengan slug tersebut sudah ada' }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        icon: icon || 'BookOpen',
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error('Category POST error:', error);
    return NextResponse.json({ error: 'Gagal membuat kategori baru' }, { status: 500 });
  }
}
