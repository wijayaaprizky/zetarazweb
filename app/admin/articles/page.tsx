'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  AlertTriangle,
  Loader2,
  CheckCircle,
  RefreshCw,
  Columns,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  // Delete modal state
  const [articleToDelete, setArticleToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (categoryFilter !== 'ALL') params.set('category', categoryFilter);

      const res = await fetch(`/api/articles?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error('Fetch articles error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [statusFilter, categoryFilter]);

  const handleSyncNow = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSyncingId(id);
    try {
      const res = await fetch(`/api/articles/${id}/sync`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setFeedback(
          data.updated
            ? `Pembaruan draf (v${data.draftVersion}) berhasil disinkronkan dari Google Docs!`
            : 'Dokumen Google Docs sudah mutakhir.'
        );
        fetchArticles();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Gagal sinkronisasi');
      }
    } catch (err: any) {
      alert(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setSyncingId(null);
    }
  };

  const handleDelete = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/articles/${articleToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback(`Artikel "${articleToDelete.title}" berhasil dihapus.`);
        setArticleToDelete(null);
        fetchArticles();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(data.error || 'Gagal menghapus artikel');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredArticles = articles.filter((art) => {
    if (!searchQuery.trim()) return true;
    return (
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Repositori Naskah & Publikasi
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ZETARAZ Controlled Publishing — Sinkronisasi Google Docs dengan Persetujuan Manual
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 bg-brand-navy hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* Success Feedback banner */}
      {feedback && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-brand-teal shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul atau ringkasan naskah..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Semua Status Publikasi</option>
            <option value="UPDATE_AVAILABLE">⚠️ Ada Pembaruan (UPDATE_AVAILABLE)</option>
            <option value="PUBLISHED">Terbit (PUBLISHED)</option>
            <option value="DRAFT">Draf (DRAFT)</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-teal" />
            <span>Memuat repositori artikel...</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            Tidak ada artikel yang cocok dengan kriteria filter saat ini.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Artikel</th>
                  <th className="px-5 py-3.5">Kategori</th>
                  <th className="px-5 py-3.5">Google Docs & Sync</th>
                  <th className="px-5 py-3.5">Status Publikasi</th>
                  <th className="px-5 py-3.5">Views</th>
                  <th className="px-5 py-3.5">Pembaruan</th>
                  <th className="px-5 py-3.5 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredArticles.map((art) => {
                  const pubStatus = art.publicationStatus || art.status;
                  const isUpdateAvailable = pubStatus === 'UPDATE_AVAILABLE';
                  const isPublished = pubStatus === 'PUBLISHED';

                  return (
                    <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={art.featuredImage}
                              alt={art.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="max-w-xs sm:max-w-sm">
                            <Link
                              href={`/admin/articles/${art.id}/edit`}
                              className="font-heading font-bold text-slate-900 hover:text-brand-blue line-clamp-1 text-sm"
                            >
                              {art.title}
                            </Link>
                            <div className="text-[11px] text-slate-400 font-mono truncate">
                              /{art.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">
                          {art.category?.name}
                        </span>
                      </td>

                      {/* Google Docs & Sync Status */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              art.syncStatus === 'SYNCED'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : art.syncStatus === 'SYNCING'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200 animate-pulse'
                                : art.syncStatus === 'SYNC_ERROR'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {art.syncStatus || 'IDLE'}
                          </span>
                          {art.googleDocId && (
                            <button
                              type="button"
                              onClick={(e) => handleSyncNow(art.id, e)}
                              disabled={syncingId === art.id}
                              title="Sinkronkan dokumen Google Docs sekarang"
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <RefreshCw
                                className={`w-3.5 h-3.5 ${
                                  syncingId === art.id ? 'animate-spin text-blue-600' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Publication Status & Version */}
                      <td className="px-5 py-4">
                        {isUpdateAvailable ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-300">
                              <AlertCircle className="w-3 h-3 text-amber-600" />
                              Update Available (v{art.draftVersion})
                            </span>
                            <div className="text-[10px] text-slate-500 font-mono">
                              Live Publik: v{art.publishedVersion}
                            </div>
                          </div>
                        ) : isPublished ? (
                          <span className="px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                            PUBLISHED (v{art.publishedVersion || 1})
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full font-bold text-[10px] tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
                            DRAFT (v{art.draftVersion || 1})
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 font-mono font-semibold">
                        {art.viewCount.toLocaleString('id-ID')}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {formatDateIndonesian(art.updatedAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Preview Draft */}
                          <Link
                            href={`/admin/articles/${art.id}/preview`}
                            className="p-1.5 text-slate-500 hover:text-brand-teal hover:bg-teal-50 rounded-lg transition-colors"
                            title="Pratinjau Draf"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Compare Diff (if update available) */}
                          {isUpdateAvailable && (
                            <Link
                              href={`/admin/articles/${art.id}/edit?tab=diff`}
                              className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Bandingkan Versi Publik vs Draf"
                            >
                              <Columns className="w-4 h-4" />
                            </Link>
                          )}

                          {/* Public View link if published */}
                          {(isPublished || isUpdateAvailable) && (
                            <Link
                              href={`/articles/${art.slug}`}
                              target="_blank"
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Lihat Halaman Publik (Versi Live)"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}

                          {/* Edit */}
                          <Link
                            href={`/admin/articles/${art.id}/edit`}
                            className="p-1.5 text-brand-blue hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Kelola & Edit Artikel"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setArticleToDelete(art)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Hapus Artikel Repositori
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus artikel{' '}
              <strong className="text-slate-900">"{articleToDelete.title}"</strong> beserta seluruh riwayat versinya? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm transition-colors flex items-center gap-2"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Ya, Hapus Artikel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
