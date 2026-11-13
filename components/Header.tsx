'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  ChevronDown,
  BookOpen,
  Compass,
  PenTool,
  FileText,
  Send,
  ArrowRight,
} from 'lucide-react';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown states
  const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsArticlesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsArticlesDropdownOpen(false);
    }, 150);
  };

  // Close dropdown on route change
  useEffect(() => {
    setIsArticlesDropdownOpen(false);
  }, [pathname]);

  const categoryItems = [
    {
      name: 'Pengetahuan',
      slug: 'pengetahuan',
      desc: 'Panduan konsep, teori, tutorial teknis, dan wawasan edukatif terstruktur',
      icon: BookOpen,
      color: 'text-blue-600 bg-blue-50 group-hover:bg-blue-100 border border-blue-100',
    },
    {
      name: 'Pengalaman',
      slug: 'pengalaman',
      desc: 'Catatan lapangan nyata, studi kasus empiris, perjalanan implementasi, & lessons learned',
      icon: Compass,
      color: 'text-teal-600 bg-teal-50 group-hover:bg-teal-100 border border-teal-100',
    },
    {
      name: 'Opini',
      slug: 'opini',
      desc: 'Sudut pandang pribadi, esai kritis, refleksi pemikiran, & analisis perspektif',
      icon: PenTool,
      color: 'text-amber-600 bg-amber-50 group-hover:bg-amber-100 border border-amber-100',
    },
  ];

  const isArticlesActive =
    pathname?.startsWith('/category') || pathname?.startsWith('/articles');

  return (
    <>
      {/* Top Banner — Tagline & Supporting Message */}
      <div className="bg-brand-navy text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              ZETARAZ KNOWLEDGE
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-200 hidden sm:inline font-medium">
              Berbagi Pengetahuan, Berbagi Pengalaman.
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
            <span className="italic hidden md:inline text-teal-300/90">
              "Temukan Pengetahuan. Perluas Wawasan."
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Wordmark */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-navy via-brand-dark to-brand-blue flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md group-hover:scale-105 transition-transform border border-slate-700/50">
                  Z
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-black text-2xl tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                      ZETARAZ
                    </span>
                    <span className="font-heading font-bold text-base tracking-tight text-brand-teal">
                      Knowledge
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium tracking-wide hidden sm:block">
                    Berbagi Pengetahuan, Berbagi Pengalaman
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation: Exactly 3 Menu Items (Beranda, Daftar Artikel ▾, Tentang) */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* 1. Beranda */}
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'text-brand-blue bg-blue-50 font-bold'
                    : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Beranda
              </Link>

              {/* 2. Daftar Artikel (Dropdown: Pengetahuan, Pengalaman, Opini) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsArticlesDropdownOpen(!isArticlesDropdownOpen)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    isArticlesActive
                      ? 'text-brand-blue bg-blue-50 font-bold'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                  aria-expanded={isArticlesDropdownOpen}
                >
                  <span>Daftar Artikel</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isArticlesDropdownOpen ? 'rotate-180 text-brand-teal' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {isArticlesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mt-1 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <span>Klasifikasi Artikel</span>
                      <Link
                        href="/articles"
                        className="text-brand-teal hover:underline normal-case text-xs font-semibold flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Semua Artikel ({'13+'})</span>
                      </Link>
                    </div>

                    {/* 3 Classification Cards */}
                    <div className="grid grid-cols-3 gap-2.5 pt-3">
                      {categoryItems.map((cat) => {
                        const Icon = cat.icon;
                        const isCatActive = pathname === `/category/${cat.slug}`;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className={`p-3 rounded-xl transition-all flex flex-col items-start gap-2 group ${
                              isCatActive
                                ? 'bg-teal-50/70 border border-teal-200'
                                : 'hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-heading font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors">
                                {cat.name}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed mt-1">
                                {cat.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Dropdown Footer: Link to all articles */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end px-2">
                      <Link
                        href="/articles"
                        className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 transition-colors"
                      >
                        <span>Jelajahi Seluruh Tulisan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Tentang */}
              <Link
                href="/about"
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/about'
                    ? 'text-brand-blue bg-blue-50 font-bold'
                    : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Tentang
              </Link>
            </nav>

            {/* Right actions: Search */}
            <div className="flex items-center space-x-2.5">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 text-xs font-medium"
                aria-label="Cari artikel dan pengetahuan"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline text-slate-600">Cari...</span>
                <span className="hidden md:inline text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl+K
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Buka menu navigasi"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
}
