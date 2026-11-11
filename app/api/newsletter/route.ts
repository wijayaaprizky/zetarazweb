import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Alamat email wajib diisi' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Format alamat email tidak valid' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        await prisma.newsletterSubscriber.update({
          where: { email: cleanEmail },
          data: { status: 'ACTIVE' },
        });
        return NextResponse.json({
          success: true,
          message: 'Langganan Anda telah diaktifkan kembali. Terima kasih telah bergabung dengan ZETARAZ!',
        });
      }
      return NextResponse.json({
        success: true,
        message: 'Email Anda sudah terdaftar dalam buletin intelijen ZETARAZ.',
      });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: cleanEmail,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Selamat datang! Anda telah berhasil berlangganan buletin berkala ZETARAZ.',
    });
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json(
      { error: 'Terjadi gangguan saat memproses langganan' },
      { status: 500 }
    );
  }
}
