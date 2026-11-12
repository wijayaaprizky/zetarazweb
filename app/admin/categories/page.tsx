'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderTree,
  Plus,
  CheckCircle,
  Loader2,
  BookOpen,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Delete modal state
  const [categoryToDelete, setCategoryToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description, icon }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({ type: 'success', message: `Kategori "${name}" berhasil dibuat.` });
        setName('');
        setSlug('');
        setDescription('');
        fetchCategories();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Gagal membuat kategori.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Gangguan server saat membuat kategori.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback({ type: 'success', message: data.message || `Kategori "${categoryToDelete.name}" berhasil dihapus.` });
        setCategoryToDelete(null);
        fetchCategories();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Gagal menghapus kategori.' });
        setCategoryToDelete(null);
      }
    } catch {
      setFeedback({ type: 'error', message: 'Gangguan server saat menghapus kategori.' });
      setCategoryToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Kelola Kategori & Pilar Pengetahuan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kategori menentukan struktur taksonomi dan navigasi utama platform ZETARAZ
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <span>{feedback.message}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs underline ml-2 opacity-80 hover:opacity-100"
          >
            Tutup
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Categories List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Daftar Kategori Terdaftar ({categories.length})
            </h3>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-brand-teal" />
              <span>Memuat kategori...</span>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 hover:bg-slate-50/70 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-heading font-bold text-sm text-slate-900">
                        {cat.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        /{cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cat.description || 'Tidak ada deskripsi.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-full bg-teal-50 text-brand-teal text-xs font-bold">
                      {cat._count?.articles || 0} Artikel
                    </span>

                    <button
                      type="button"
                      onClick={() => setCategoryToDelete(cat)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title={`Hapus Kategori ${cat.name}`}
                      aria-label={`Hapus Kategori ${cat.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Add Category Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-heading font-bold text-base text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-brand-teal" />
            <span>Tambah Kategori Baru</span>
          </h3>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Nama Kategori *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                placeholder="Contoh: Tata Kelola Digital"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Slug URL (Opsional)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="tata-kelola-digital"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Deskripsi Kategori
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Penjelasan cakupan disiplin dan ranah kajian..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>Simpan Kategori</span>
            </button>
          </form>
        </div>
      </div>

      {/* Delete Category Confirmation Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Hapus Kategori Pengetahuan
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Apakah Anda yakin ingin menghapus kategori{' '}
              <strong className="text-slate-900">"{categoryToDelete.name}"</strong>?
            </p>

            {(categoryToDelete._count?.articles || 0) > 0 ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs mb-4">
                <strong>Peringatan Integritas:</strong> Kategori ini masih memiliki{' '}
                <strong>{categoryToDelete._count.articles} artikel terkait</strong>. Anda harus memindahkan atau menghapus artikel tersebut terlebih dahulu sebelum kategori ini dapat dihapus.
              </div>
            ) : (
              <p className="text-xs text-slate-400 mb-4">
                Kategori ini tidak memiliki artikel terkait dan dapat dihapus dengan aman dari sistem.
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteCategory}
                disabled={isDeleting || (categoryToDelete._count?.articles || 0) > 0}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Hapus Kategori</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
