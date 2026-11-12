'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, X, BookOpen, ArrowRight, Loader2, FileText, Tag } from 'lucide-react';
import { formatDateIndonesian } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        if (data.success) {
          setResults(data.articles || []);
        }
      } catch (err) {
        console.error('Quick search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-20 transition-all cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Pengetahuan"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b border-slate-200 px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik topik, teori, metodologi, atau kata kunci..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
          />
          {isLoading && <Loader2 className="w-4 h-4 text-teal-600 animate-spin mr-2 shrink-0" />}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 rounded font-medium"
          >
            Esc
          </button>
        </form>

        {/* Results Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              Mencari pengetahuan relevan...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
                Hasil Teratas ({results.length})
              </div>
              {results.map((art) => (
                <Link
                  key={art.id}
                  href={`/articles/${art.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-brand-teal uppercase tracking-wider">
                        {art.category?.name}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400">
                        {formatDateIndonesian(art.publishedAt)}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-brand-blue line-clamp-1">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {art.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0 self-center" />
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1"
                >
                  Lihat semua hasil untuk "{query}" <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : query.trim() ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-600 font-medium">
                Tidak ada artikel yang cocok dengan "{query}".
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Coba gunakan kata kunci yang lebih umum seperti "KMS", "BPM", "AI", atau "Riset".
              </p>
            </div>
          ) : (
            <div className="py-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
                Kategori Pengetahuan Utama
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Knowledge', href: '/category/knowledge' },
                  { name: 'Technology', href: '/category/technology' },
                  { name: 'Science & Research', href: '/category/science-research' },
                  { name: 'Data & Analytics', href: '/category/data-analytics' },
                  { name: 'Business & Management', href: '/category/business-management' },
                  { name: 'Learning', href: '/category/learning' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 text-xs font-medium text-slate-700 hover:text-teal-700 transition-all flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Enter</kbd> untuk mencari</span>
          <span className="text-[11px] text-brand-teal font-medium">ZETARAZ Discovery Engine</span>
        </div>
      </div>
    </div>
  );
}
