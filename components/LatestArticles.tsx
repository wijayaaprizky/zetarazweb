import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, User, BookOpen, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface LatestArticlesProps {
  articles: any[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles || articles.length === 0) {
    return (
      <div>
        <div className="mb-6 pb-3 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
              Kurasi Editorial
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
              Ruang Terbitan & Naskah Pengetahuan
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Standar Penulisan Terbuka
          </span>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-teal-50/40 border border-slate-200/90 rounded-2xl p-8 sm:p-12 text-center my-4 relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-brand-teal flex items-center justify-center mx-auto mb-5 border border-teal-200 shadow-sm">
            <BookOpen className="w-7 h-7" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3 text-brand-teal" />
            <span>Kurasi Naskah Sedang Berjalan</span>
          </span>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mb-3">
            Koleksi Naskah Terbaru Sedang Dipersiapkan
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8 font-normal">
            ZETARAZ Knowledge menjunjung tinggi kurasi mendalam untuk memastikan setiap tulisan menyajikan rujukan primer yang sahih dan pengalaman lapangan yang aplikatif. Kami menyambut kontribusi naskah dari para praktisi, peneliti, dan akademisi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact?topic=submission"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5 text-teal-400" />
              <span>Ajukan Naskah / Pengalaman</span>
            </Link>
            <Link
              href="/about#kredibilitas"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-all border border-slate-200 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
              <span>Standar Kredibilitas Redaksi</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 pb-3 border-b border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
            Terbitan Terkini
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
            Artikel & Catatan Pengalaman Terbaru
          </h2>
        </div>
        <Link
          href="/articles"
          className="text-xs font-bold text-brand-teal hover:text-brand-navy flex items-center gap-1 uppercase tracking-wider"
        >
          <span>Semua Terbitan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div>
              <Link
                href={`/articles/${art.slug}`}
                className="relative aspect-[16/10] block overflow-hidden bg-slate-100"
              >
                <Image
                  src={art.featuredImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-brand-navy rounded-full shadow-sm backdrop-blur-sm border border-slate-200">
                    {art.contentType}
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="font-bold text-brand-teal uppercase tracking-wider text-[11px]">
                    {art.category?.name}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDateIndonesian(art.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTimeMinutes} menit baca
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-2.5">
                  <Link href={`/articles/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-600 font-medium">
                {art.author?.name}
              </span>
              <Link
                href={`/articles/${art.slug}`}
                className="text-xs font-bold text-brand-teal group-hover:text-brand-navy flex items-center gap-1"
              >
                <span>Baca Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
