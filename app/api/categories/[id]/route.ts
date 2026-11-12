import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const { id } = params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      );
    }

    // Integrity protection: Do not delete if category still has articles
    if (category._count.articles > 0) {
      return NextResponse.json(
        {
          error: `Kategori "${category.name}" tidak dapat dihapus karena masih memiliki ${category._count.articles} artikel terkait. Harap pindahkan atau hapus artikel tersebut terlebih dahulu.`,
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Kategori "${category.name}" berhasil dihapus.`,
    });
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus kategori' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Tidak terotorisasi' }, { status: 401 });
    }

    const { id } = params;
    const { name, slug: customSlug, description, icon } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Nama kategori wajib diisi' },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json(
        { error: 'Kategori tidak ditemukan' },
        { status: 404 }
      );
    }

    const slug = slugify(customSlug || name);
    if (slug !== category.slug) {
      const existing = await prisma.category.findUnique({ where: { slug } });
      if (existing) {
        return NextResponse.json(
          { error: 'Slug kategori sudah digunakan oleh kategori lain' },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        icon: icon || category.icon,
      },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui kategori' },
      { status: 500 }
    );
  }
}
