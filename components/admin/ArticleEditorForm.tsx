'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Save,
  Send,
  Eye,
  Edit3,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  Code,
  Table as TableIcon,
  List,
  Sparkles,
  Loader2,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Columns,
  History,
  RotateCcw,
  ExternalLink,
  AlertCircle,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import ArticleContent from '@/components/ArticleContent';
import DiffViewer from '@/components/admin/DiffViewer';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { slugify } from '@/lib/utils';

interface ArticleEditorFormProps {
  initialData?: any;
  categories: any[];
}

export default function ArticleEditorForm({
  initialData,
  categories,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(
    initialData?.draftContent || initialData?.content || ''
  );
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId || categories[0]?.id || ''
  );
  const [contentType, setContentType] = useState(
    initialData?.contentType || 'EDITORIAL'
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage ||
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80'
  );
  const [imageCaption, setImageCaption] = useState(
    initialData?.imageCaption || ''
  );
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seoDescription || ''
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    initialData?.canonicalUrl || ''
  );

  // Google Docs & Versioning State
  const [googleDocId, setGoogleDocId] = useState(
    initialData?.googleDocId || ''
  );
  const [syncStatus, setSyncStatus] = useState(
    initialData?.syncStatus || 'IDLE'
  );
  const [publicationStatus, setPublicationStatus] = useState(
    initialData?.publicationStatus || initialData?.status || 'DRAFT'
  );
  const [publishedVersion, setPublishedVersion] = useState<number>(
    initialData?.publishedVersion || 0
  );
  const [draftVersion, setDraftVersion] = useState<number>(
    initialData?.draftVersion || 1
  );
  const [publishedContent, setPublishedContent] = useState<string | null>(
    initialData?.publishedContent || null
  );
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(
    initialData?.lastSyncedAt || null
  );

  // Tabs: editor | preview | diff | history
  const initialTab = (searchParams.get('tab') as any) || 'editor';
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'diff' | 'history'>(
    initialTab
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Confirmation Modals
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // Audit History Data
  const [historyData, setHistoryData] = useState<{
    syncLogs: any[];
    publicationLogs: any[];
    versions: any[];
  }>({ syncLogs: [], publicationLogs: [], versions: [] });
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Load audit history when history tab is selected
  useEffect(() => {
    if (activeTab === 'history' && initialData?.id) {
      setLoadingHistory(true);
      fetch(`/api/articles/${initialData.id}/history`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setHistoryData(data);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingHistory(false));
    }
  }, [activeTab, initialData?.id]);

  // Auto-generate slug from title if new article
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title));
    }
  }, [title, isEditing]);

  const insertMarkdownSnippet = (snippet: string) => {
    setContent((prev: string) => prev + '\n' + snippet);
  };

  // Google Docs Sync Handler
  const handleSyncGoogleDocs = async () => {
    if (!googleDocId.trim()) {
      setErrorMessage('Masukkan Google Docs ID atau URL terlebih dahulu.');
      return;
    }

    if (!isEditing) {
      setErrorMessage('Simpan draf artikel terlebih dahulu sebelum menyinkronkan.');
      return;
    }

    setIsSyncing(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/articles/${initialData.id}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleDocId }),
      });

      const data = await res.json();

      if (data.success) {
        setSyncStatus(data.syncStatus || 'SYNCED');
        setPublicationStatus(data.publicationStatus || publicationStatus);
        setDraftVersion(data.draftVersion || draftVersion);
        setLastSyncedAt(new Date().toISOString());

        // Refresh article data
        const artRes = await fetch(`/api/articles/${initialData.id}`);
        const artData = await artRes.json();
        if (artData.article) {
          setContent(artData.article.draftContent);
          setPublishedContent(artData.article.publishedContent);
        }

        setSuccessMessage(
          data.updated
            ? `Dokumen Google Docs berhasil disinkronkan ke draf v${data.draftVersion}! Konten publik tidak berubah.`
            : 'Dokumen Google Docs sudah mutakhir.'
        );
      } else {
        setErrorMessage(data.error || 'Gagal menyinkronkan dokumen Google Docs.');
        setSyncStatus('SYNC_ERROR');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi gangguan jaringan saat sinkronisasi.');
      setSyncStatus('SYNC_ERROR');
    } finally {
      setIsSyncing(false);
    }
  };

  // Publish Handler
  const handlePublishConfirmed = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // First save current form changes to draft
      await handleSaveDraft(false);

      const res = await fetch(`/api/articles/${initialData.id}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes:
            publicationStatus === 'UPDATE_AVAILABLE'
              ? `Pembaruan draf v${draftVersion} disetujui dan dirilis oleh administrator.`
              : `Publikasi perdana disetujui oleh administrator.`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsPublishModalOpen(false);
        setPublicationStatus('PUBLISHED');
        setPublishedVersion(data.publishedVersion);
        setPublishedContent(content);
        setSuccessMessage(`Artikel berhasil dipublikasikan (Versi ${data.publishedVersion})!`);
        setTimeout(() => {
          router.refresh();
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Gagal mempublikasikan artikel.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Discard Draft Handler
  const handleDiscardConfirmed = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch(`/api/articles/${initialData.id}/discard-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Pembaruan draf dibatalkan oleh administrator dari form editor.',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsDiscardModalOpen(false);
        setPublicationStatus('PUBLISHED');
        setDraftVersion(publishedVersion);
        setContent(publishedContent || '');
        setSuccessMessage('Draf pembaruan berhasil dibatalkan. Versi publik tetap aktif.');
        setTimeout(() => {
          router.refresh();
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Gagal membatalkan draf.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save Draft Form Submitter
  const handleSaveDraft = async (showNotification = true) => {
    if (!title.trim() || !excerpt.trim() || !content.trim() || !categoryId) {
      setErrorMessage('Judul, ringkasan, konten, dan kategori wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    if (showNotification) {
      setErrorMessage('');
      setSuccessMessage('');
    }

    const payload = {
      title,
      slug,
      subtitle,
      excerpt,
      content,
      categoryId,
      contentType,
      featuredImage,
      imageCaption,
      isFeatured,
      googleDocId,
      status: publicationStatus === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      publicationStatus,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      canonicalUrl,
    };

    try {
      const endpoint = isEditing ? `/api/articles/${initialData.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (showNotification) {
          setSuccessMessage(
            isEditing
              ? 'Draf artikel berhasil disimpan di repositori.'
              : 'Draf artikel baru berhasil dibuat di repositori!'
          );
          if (!isEditing && data.article?.id) {
            setTimeout(() => {
              router.push(`/admin/articles/${data.article.id}/edit`);
            }, 1000);
          }
        }
      } else {
        setErrorMessage(data.error || 'Terjadi kesalahan saat menyimpan artikel.');
      }
    } catch (err) {
      setErrorMessage('Terjadi gangguan jaringan atau server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const imagePresets = [
    { label: 'Technology / Network', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Analytics / Dashboard', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Enterprise / Architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80' },
    { label: 'AI / Neural', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Research / Science', url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80' },
  ];

  const isUpdateAvailable = publicationStatus === 'UPDATE_AVAILABLE';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/articles')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {isEditing ? 'Kelola Artikel & Publikasi' : 'Tulis Artikel Pengetahuan Baru'}
              </h1>
              {isEditing && (
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    publicationStatus === 'UPDATE_AVAILABLE'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : publicationStatus === 'PUBLISHED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {publicationStatus === 'UPDATE_AVAILABLE'
                    ? 'UPDATE AVAILABLE'
                    : publicationStatus === 'PUBLISHED'
                    ? `PUBLISHED (v${publishedVersion})`
                    : 'DRAFT'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              ZETARAZ Knowledge — Controlled Publishing & Versioning System
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isEditing && (
            <Link
              href={`/admin/articles/${initialData.id}/preview`}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-brand-teal" />
              <span>Pratinjau Draf</span>
            </Link>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSaveDraft(true)}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Simpan Draf</span>
          </button>

          {isUpdateAvailable ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsPublishModalOpen(true)}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Publikasikan Pembaruan (v{draftVersion})</span>
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsPublishModalOpen(true)}
              className="px-5 py-2 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {publicationStatus === 'PUBLISHED'
                  ? 'Publikasikan Ulang'
                  : 'Publikasikan Sekarang'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Controlled Publishing Alert Banner for UPDATE_AVAILABLE */}
      {isUpdateAvailable && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-amber-950">
                Pembaruan dari Google Docs Tersedia (Draf v{draftVersion})
              </h4>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Versi publik saat ini tetap <strong>v{publishedVersion}</strong> dan tidak berubah.
                Sinkronisasi otomatis telah menyimpan naskah baru sebagai draf yang menunggu persetujuan editorial Anda.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('diff')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Bandingkan Versi (Diff)</span>
            </button>
            <button
              type="button"
              onClick={() => setIsDiscardModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Batalkan Draf</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Publikasikan Pembaruan</span>
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Google Docs Source of Truth Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Google Docs Content Source of Truth
              </h3>
              <p className="text-xs text-slate-500">
                Tautkan dokumen Google Docs untuk sinkronisasi otomatis ke draf CMS.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Status Sinkronisasi:</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold ${
                syncStatus === 'SYNCED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : syncStatus === 'SYNCING'
                  ? 'bg-blue-100 text-blue-800 animate-pulse'
                  : syncStatus === 'SYNC_ERROR'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {syncStatus}
            </span>
            {lastSyncedAt && (
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                • {new Date(lastSyncedAt).toLocaleTimeString('id-ID')}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={googleDocId}
            onChange={(e) => setGoogleDocId(e.target.value)}
            placeholder="Tempel URL Dokumen Google Docs atau Document ID (contoh: https://docs.google.com/document/d/...)"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 font-mono text-slate-800"
          />
          <button
            type="button"
            onClick={handleSyncGoogleDocs}
            disabled={isSyncing || !googleDocId.trim()}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span>Sinkronkan Sekarang</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center space-x-1">
        <button
          type="button"
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2.5 border-b-2 font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeTab === 'editor'
              ? 'border-brand-teal text-brand-navy'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Editor & Naskah Draf</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2.5 border-b-2 font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
            activeTab === 'preview'
              ? 'border-brand-teal text-brand-navy'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Pratinjau Draf (v{draftVersion})</span>
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => setActiveTab('diff')}
            className={`px-4 py-2.5 border-b-2 font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'diff'
                ? 'border-brand-teal text-brand-navy'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Columns className="w-4 h-4" />
            <span>Bandingkan Versi (Diff)</span>
            {isUpdateAvailable && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        )}

        {isEditing && (
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 border-b-2 font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'history'
                ? 'border-brand-teal text-brand-navy'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Riwayat Audit</span>
          </button>
        )}
      </div>

      {/* TAB 1: EDITOR */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masukkan judul artikel yang berbobot dan menarik..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-lg font-heading font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Anak Judul / Subtitle (Opsional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Penjelasan ringkas pelengkap judul artikel..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ringkasan / Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Tuliskan 2-3 kalimat ringkasan inti naskah yang menarik pembaca..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            {/* Markdown Body Editor */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Editor Toolbar */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700">
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('## Subjudul Baru')}
                  className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold flex items-center gap-1"
                  title="Heading 2"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('### Sub-bagian Baru')}
                  className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold flex items-center gap-1"
                  title="Heading 3"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('**Teks Tebal**')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('*Teks Miring*')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('> Kutipan penting atau pernyataan utama di sini.')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('```python\n# Contoh kode atau pseudocode\ndef proses_data():\n    return True\n```')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Code Block"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('| Parameter | Deskripsi | Standar |\n| --- | --- | --- |\n| Metrik A | Nilai empiris | Optimal |\n| Metrik B | Uji kendali | Valid |')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Tabel Markdown"
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdownSnippet('* Poin pengamatan 1\n* Poin pengamatan 2\n* Poin pengamatan 3')}
                  className="p-1.5 hover:bg-slate-200 rounded"
                  title="Daftar List"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Textarea */}
              <div className="p-4">
                <textarea
                  rows={20}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan naskah dalam format Markdown, atau sinkronkan langsung dari dokumen Google Docs..."
                  className="w-full p-3 font-mono text-xs sm:text-sm text-slate-800 bg-white focus:outline-none resize-y leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar: Meta & Settings (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category & Content Type */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Klasifikasi Pengetahuan
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Kategori Utama <span className="text-red-500">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Format Konten
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="EDITORIAL">EDITORIAL (Telaah Mendalam)</option>
                  <option value="RESEARCH">RESEARCH (Riset & Bukti Ilmiah)</option>
                  <option value="TUTORIAL">TUTORIAL (Panduan Praktis)</option>
                  <option value="ANALYSIS">ANALYSIS (Analisis Fenomena)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-brand-teal rounded border-slate-300 focus:ring-teal-400"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Jadikan Artikel Unggulan (Hero Utama)
                  </span>
                </label>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Gambar Editorial
              </h3>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={featuredImage}
                  alt="Preview Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  URL Gambar Resolusi Tinggi
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Keterangan Gambar (Caption)
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Kredit foto atau keterangan konteks gambar..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              {/* Presets */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Pilihan Gambar Editorial:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFeaturedImage(preset.url)}
                      className="px-2 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-brand-teal text-[10px] font-bold rounded-lg text-left transition-colors truncate"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Optimization */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                Optimasi Mesin Pencari (SEO)
              </h3>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  SEO Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'Judul untuk Google Search'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={excerpt || 'Deskripsi untuk cuplikan Google...'}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-4xl mx-auto">
          <div className="mb-6 pb-6 border-b border-slate-200">
            <span className="px-3 py-1 bg-teal-50 text-brand-teal text-xs font-bold rounded-full border border-teal-200 uppercase tracking-wider">
              {contentType}
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-brand-navy mt-3 mb-2">
              {title || 'Judul Artikel Belum Diisi'}
            </h1>
            {subtitle && (
              <p className="text-lg text-slate-600 italic">{subtitle}</p>
            )}
          </div>
          <ArticleContent content={content} />
        </div>
      )}

      {/* TAB 3: VISUAL DIFF VIEWER */}
      {activeTab === 'diff' && isEditing && (
        <div className="space-y-4">
          <DiffViewer
            publishedContent={publishedContent}
            draftContent={content}
            publishedVersion={publishedVersion}
            draftVersion={draftVersion}
          />
        </div>
      )}

      {/* TAB 4: AUDIT HISTORY */}
      {activeTab === 'history' && isEditing && (
        <div className="space-y-6">
          {loadingHistory ? (
            <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Memuat riwayat audit...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sync History */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Riwayat Sinkronisasi Google Docs
                  </h3>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historyData.syncLogs.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-4 text-center">
                      Belum ada catatan riwayat sinkronisasi.
                    </div>
                  ) : (
                    historyData.syncLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              log.status === 'SUCCESS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {log.status} (Draf v{log.draftVersion})
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            {new Date(log.createdAt).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {log.message}
                        </p>
                        {log.revisionId && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            Revision: {log.revisionId}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Publication History */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    Riwayat Publikasi Editorial
                  </h3>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {historyData.publicationLogs.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-4 text-center">
                      Belum ada catatan riwayat publikasi.
                    </div>
                  ) : (
                    historyData.publicationLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              log.action === 'PUBLISH'
                                ? 'bg-teal-100 text-teal-800'
                                : log.action === 'PUBLISH_UPDATE'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {log.action} (Versi {log.version})
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            {new Date(log.createdAt).toLocaleString('id-ID')}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {log.notes || 'Persetujuan publikasi oleh administrator.'}
                        </p>
                        <div className="text-[10px] text-slate-500">
                          Oleh: {log.publishedBy || 'Administrator'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal for Publish */}
      <ConfirmModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={handlePublishConfirmed}
        title={
          isUpdateAvailable
            ? 'Konfirmasi Publikasikan Pembaruan Draf'
            : 'Konfirmasi Publikasi Artikel'
        }
        description={
          isUpdateAvailable
            ? `Apakah Anda yakin ingin mempublikasikan versi draf v${draftVersion}? Versi ini akan menggantikan versi publik saat ini (v${publishedVersion}) secara atomik.`
            : `Apakah Anda yakin ingin mempublikasikan artikel ini sekarang? Versi draf akan dirilis sebagai Versi 1 di website publik.`
        }
        confirmLabel={
          isUpdateAvailable
            ? `Publikasikan Pembaruan (v${draftVersion})`
            : 'Ya, Publikasikan Sekarang'
        }
        variant="success"
        isLoading={isSubmitting}
      />

      {/* Confirmation Modal for Discard */}
      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={handleDiscardConfirmed}
        title="Konfirmasi Batalkan Draf Pembaruan"
        description={`Apakah Anda yakin ingin membatalkan draf pembaruan ini? Draf akan dikembalikan ke versi publik saat ini (v${publishedVersion}). Versi publik tetap aktif dan aman.`}
        confirmLabel="Ya, Batalkan Draf"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
}
