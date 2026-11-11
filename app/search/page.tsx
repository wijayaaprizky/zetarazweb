'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search as SearchIcon,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Loader2,
  X,
} from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialSort = searchParams.get('sort') || 'relevance';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [contentType, setContentType] = useState(initialType);
  const [sort, setSort] = useState(initialSort);

  const [articles, setArticles] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  // Fetch categories for dropdown filter
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategoriesList(data.categories);
      })
      .catch(() => {});
  }, []);

  // Fetch search results
  const performSearch = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (category !== 'all') params.set('category', category);
      if (contentType !== 'all') params.set('type', contentType);
      if (sort !== 'relevance') params.set('sort', sort);

      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.articles || []);
        setSuggestions(data.suggestions || []);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
    // Update URL query parameters
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    if (contentType !== 'all') params.set('type', contentType);
    if (sort !== 'relevance') params.set('sort', sort);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [category, contentType, sort]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    if (contentType !== 'all') params.set('type', contentType);
    if (sort !== 'relevance') params.set('sort', sort);
    router.replace(`/search?${params.toString()}`);
  };

  // Keyword highlighting helper
  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-amber-200 text-slate-900 px-0.5 rounded font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner */}
      <header className="bg-gradient-to-r from-brand-navy via-brand-dark to-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZETARAZ Knowledge</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
            Temukan Pengetahuan. Perluas Wawasan.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Berbagi pengetahuan, berbagi pengalaman seputar teknologi, riset, analitika, manajemen, dan pembelajaran.
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative flex items-center">
            <div className="relative w-full">
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berdasarkan judul, panduan praktis, teknologi, atau topik..."
                className="w-full pl-12 pr-28 py-3.5 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 text-base focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                  }}
                  className="absolute right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Cari</span>}
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>

              {/* Category Filter */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="all">Semua Kategori</option>
                {categoriesList.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Content Type Filter */}
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-blue"
              >
                <option value="all">Semua Tipe Konten</option>
                <option value="EDITORIAL">Editorial</option>
                <option value="RESEARCH">Research</option>
                <option value="TUTORIAL">Tutorial</option>
                <option value="ANALYSIS">Analysis</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Urutkan:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none"
              >
                <option value="relevance">Paling Relevan</option>
                <option value="popular">Paling Banyak Dibaca</option>
                <option value="oldest">Publikasi Terlama</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Ditemukan <strong className="text-slate-900 font-bold">{articles.length}</strong> artikel{' '}
            {query.trim() && (
              <>
                untuk kata kunci <strong className="text-brand-blue">"{query}"</strong>
              </>
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-brand-teal animate-spin mx-auto mb-2" />
            <p className="text-sm text-slate-500">Menyisir korpus pengetahuan...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
              Tidak Ada Hasil yang Cocok
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Tidak ditemukan artikel yang sesuai dengan kriteria penelusuran Anda. Silakan coba kata kunci lain atau pilih rekomendasi di bawah ini:
            </p>

            {suggestions.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Saran Topik Penelusuran:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setQuery(s);
                        setCategory('all');
                        setContentType('all');
                      }}
                      className="px-3 py-1.5 bg-teal-50 text-brand-teal hover:bg-teal-100 rounded-lg text-xs font-semibold transition-colors border border-teal-200/60"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        {art.category?.name}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
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

                    <h2 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2 mb-2.5">
                      <Link href={`/articles/${art.slug}`}>
                        {highlightMatch(art.title, query)}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {highlightMatch(art.excerpt, query)}
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
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 py-20 text-center text-slate-500 text-sm">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-teal" />
          Memuat halaman pencarian...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
