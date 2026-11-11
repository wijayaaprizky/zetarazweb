'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import ArticleContent from '@/components/ArticleContent';
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
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
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

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-generate slug from title if not custom
  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title));
    }
  }, [title, isEditing]);

  const insertMarkdownSnippet = (snippet: string) => {
    setContent((prev: string) => prev + '\n' + snippet);
  };

  const handleSubmit = async (targetStatus: 'DRAFT' | 'PUBLISHED') => {
    if (!title.trim() || !excerpt.trim() || !content.trim() || !categoryId) {
      setErrorMessage('Judul, ringkasan, konten, dan kategori wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

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
      status: targetStatus,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      canonicalUrl,
    };

    try {
      const endpoint = isEditing
        ? `/api/articles/${initialData.id}`
        : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(
          targetStatus === 'PUBLISHED'
            ? 'Artikel berhasil diterbitkan secara publik!'
            : 'Draf artikel berhasil disimpan di repositori.'
        );
        setTimeout(() => {
          router.push('/admin/articles');
          router.refresh();
        }, 1200);
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

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {isEditing ? 'Perbarui Naskah Artikel' : 'Tulis Artikel Pengetahuan Baru'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Platform Manajemen Pengetahuan ZETARAZ
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('DRAFT')}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Simpan Draf</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('PUBLISHED')}
            className="px-5 py-2.5 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Publikasikan Sekarang</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-medium">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Content & Writing */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Judul Utama Artikel *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pengantar Sistem Manajemen Pengetahuan (KMS)..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-heading font-bold text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  URL Slug (Auto / Kustom)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs text-slate-400 font-mono">
                    /articles/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-r-xl text-xs font-mono text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Tipe Konten
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="EDITORIAL">Editorial Terpilih</option>
                  <option value="RESEARCH">Research & Paper</option>
                  <option value="TUTORIAL">Tutorial & Panduan</option>
                  <option value="ANALYSIS">Analisis Strategis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Subjudul / Lead In (Opsional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Penjelasan mendalam yang mengantarkan esensi naskah..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Ringkasan Eksekutif (Excerpt) *
              </label>
              <textarea
                rows={3}
                required
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Ringkasan singkat 2-3 kalimat yang akan muncul di feed kartu dan meta deskripsi..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none"
              />
            </div>
          </div>

          {/* Markdown Content Editor & Live Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Editor Bar Header & Tabs */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'editor'
                      ? 'bg-white text-brand-navy shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor Markdown</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'preview'
                      ? 'bg-white text-brand-navy shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pratinjau Langsung</span>
                </button>
              </div>

              {/* Formatting Toolbar */}
              {activeTab === 'editor' && (
                <div className="flex items-center space-x-1 text-slate-600">
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('## Subjudul Bagian Baru\n')}
                    className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold"
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('### Sub-bagian\n')}
                    className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold"
                    title="Heading 3"
                  >
                    <Heading3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('> **Kutipan Kunci:** Teks kutipan penting di sini.\n')}
                    className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold"
                    title="Blockquote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('```\n// Blok kode atau diagram ASCII\n```\n')}
                    className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold"
                    title="Code Block"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownSnippet('| Kolom 1 | Kolom 2 |\n| :--- | :--- |\n| Baris 1 | Data A |\n')}
                    className="p-1.5 hover:bg-slate-200 rounded text-xs font-bold"
                    title="Table"
                  >
                    <TableIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Editor Area */}
            {activeTab === 'editor' ? (
              <div className="p-4">
                <textarea
                  rows={20}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Mulai menulis konten artikel berformat markdown...
## Judul Seksi 1
Tulis analisis terstruktur di sini. Dukung dengan kutipan dan tabel."
                  className="w-full font-mono text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none resize-y min-h-[400px]"
                />
              </div>
            ) : (
              <div className="p-8 bg-white min-h-[400px]">
                {content.trim() ? (
                  <ArticleContent content={content} />
                ) : (
                  <div className="text-center py-20 text-slate-400 text-xs">
                    Belum ada konten yang ditulis untuk dipratinjau.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Metadata, Category, Image & SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category & Status Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Kategorisasi & Penempatan
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Kategori Utama *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-teal focus:ring-teal-400"
                />
                <span className="text-xs font-bold text-slate-700">
                  Tampilkan di Hero Utama (Sorotan Unggulan)
                </span>
              </label>
            </div>
          </div>

          {/* Featured Image Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Gambar Utama Artikel (Cover)
            </h3>

            {featuredImage && (
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <Image
                  src={featuredImage}
                  alt="Pratinjau Gambar Cover"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                URL Gambar Cover
              </label>
              <input
                type="url"
                required
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Keterangan Gambar (Caption)
              </label>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Sumber dan deskripsi gambar..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Pilihan Gambar Cepat:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {imagePresets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFeaturedImage(p.url)}
                    className="text-left text-[11px] text-brand-blue hover:bg-blue-50 px-2 py-1 rounded transition-colors truncate"
                  >
                    • {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Metadata Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Metadata Mesin Pencari (SEO)
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                SEO Title (Max 60 chars)
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder={title || 'Judul untuk Google Search'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                SEO Meta Description (Max 160 chars)
              </label>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder={excerpt || 'Deskripsi untuk cuplikan Google...'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Canonical URL (Opsional)
              </label>
              <input
                type="url"
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://zetaraz.com/articles/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
