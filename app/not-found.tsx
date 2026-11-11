import React from 'react';
import Link from 'next/link';
import { BookOpen, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-slate-50 text-center">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center mx-auto mb-6 border border-teal-100">
          <BookOpen className="w-8 h-8" />
        </div>
        <div className="text-4xl font-heading font-black text-brand-navy mb-2">404</div>
        <h1 className="text-xl font-heading font-bold text-slate-800 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 leading-relaxed">
          Artikel atau halaman yang Anda cari mungkin telah dipindahkan, diarsipkan, atau tautan tidak valid.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Cari di Direktori</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
