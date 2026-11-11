import React from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatDateIndonesian } from '@/lib/utils';
import ArticleContent from '@/components/ArticleContent';
import TableOfContents from '@/components/TableOfContents';
import PreviewActionsBar from '@/components/admin/PreviewActionsBar';
import {
  Calendar,
  Clock,
  ChevronRight,
  User,
  AlertTriangle,
  ArrowLeft,
  FileCheck2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminArticlePreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'EDITOR')) {
    redirect('/admin/login');
  }

  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      author: true,
      tags: { include: { tag: true } },
    },
  });

  if (!article) {
    notFound();
  }

  // The draft content to be previewed
  const previewContent = article.draftContent;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Floating Admin Preview Banner */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-xl px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/articles/${article.id}/edit`}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Kembali ke Editor"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-teal-400">
                  Pratinjau Draf Google Docs
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Draf v{article.draftVersion}
                </span>
                {article.publicationStatus === 'UPDATE_AVAILABLE' ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                    Versi Publik Saat Ini: v{article.publishedVersion}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-400">
                    Belum Terbit (Draf Baru)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block mt-0.5">
                Ini adalah tampilan pratinjau internal. Versi publik tidak akan berubah sampai administrator menekan tombol publikasi.
              </p>
            </div>
          </div>

          <PreviewActionsBar
            articleId={article.id}
            publicationStatus={article.publicationStatus}
            draftVersion={article.draftVersion}
            publishedVersion={article.publishedVersion}
          />
        </div>
      </div>

      {/* Simulated Public Article Layout */}
      <article className="min-h-screen bg-white pb-20">
        {/* Breadcrumb */}
        <div className="bg-slate-50 border-b border-slate-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-xs text-slate-500">
              <span>Home</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.category.name}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="pt-8 pb-10 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-teal-50 text-brand-teal text-xs font-bold rounded-full border border-teal-200 uppercase tracking-wider">
                {article.category.name}
              </span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                {article.contentType}
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-brand-navy leading-[1.15] tracking-tight mb-4">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-6">
                {article.subtitle}
              </p>
            )}

            {/* Author Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="font-heading font-bold text-sm text-slate-900">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {article.author.bio || 'Penulis di ZETARAZ Knowledge'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatDateIndonesian(article.publishedAt || new Date())}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readTimeMinutes} menit baca
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Body + Table of Contents */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <ArticleContent content={previewContent} />
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <TableOfContents content={previewContent} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
