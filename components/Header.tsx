'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  ChevronDown,
  BookOpen,
  Cpu,
  FlaskConical,
  BarChart3,
  Briefcase,
  GraduationCap,
  Archive,
  FileText,
  Sparkles,
  Info,
  Heart,
  HelpCircle,
  Send,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  const categoryItems = [
    {
      name: 'Knowledge',
      slug: 'knowledge',
      desc: 'Konsep dasar, literasi kognitif, & organisasi informasi',
      icon: BookOpen,
      color: 'text-emerald-500 bg-emerald-50 group-hover:bg-emerald-100',
    },
    {
      name: 'Technology',
      slug: 'technology',
      desc: 'Kecerdasan buatan, rekayasa perangkat lunak, & keamanan siber',
      icon: Cpu,
      color: 'text-blue-500 bg-blue-50 group-hover:bg-blue-100',
    },
    {
      name: 'Science & Research',
      slug: 'science-research',
      desc: 'Metodologi saintifik, ulasan bukti empiris, & telaah literatur',
      icon: FlaskConical,
      color: 'text-teal-500 bg-teal-50 group-hover:bg-teal-100',
    },
    {
      name: 'Data & Analytics',
      slug: 'data-analytics',
      desc: 'Sains data, teknik visualisasi, & analitika terapan',
      icon: BarChart3,
      color: 'text-cyan-500 bg-cyan-50 group-hover:bg-cyan-100',
    },
    {
      name: 'Business & Management',
      slug: 'business-management',
      desc: 'Proses bisnis (BPM), arsitektur enterprise, & manajemen tim',
      icon: Briefcase,
      color: 'text-indigo-500 bg-indigo-50 group-hover:bg-indigo-100',
    },
    {
      name: 'Learning',
      slug: 'learning',
      desc: 'Tutorial langkah-demi-langkah & catatan pengalaman lapangan',
      icon: GraduationCap,
      color: 'text-amber-500 bg-amber-50 group-hover:bg-amber-100',
    },
  ];

  const publicationItems = [
    {
      name: 'Semua Artikel & Kajian',
      href: '/articles',
      desc: 'Katalog terbitan naskah pengetahuan terverifikasi',
      icon: FileText,
    },
    {
      name: 'Arsip Kronologis',
      href: '/archive',
      desc: 'Rekam jejak publikasi berdasarkan tahun dan bulan',
      icon: Archive,
    },
    {
      name: 'Direktori Topik & Tag',
      href: '/search',
      desc: 'Pencarian cepat berdasarkan kata kunci & subjek spesifik',
      icon: Search,
    },
  ];

  const initiativeItems = [
    {
      name: 'Tentang ZETARAZ',
      href: '/about',
      desc: 'Filosofi, visi-misi, dan semangat berbagi wawasan terbuka',
      icon: Info,
    },
    {
      name: 'Layanan & Program',
      href: '/services',
      desc: 'Kurasi redaksi, repositori, dan kerja sama edukatif',
      icon: Sparkles,
    },
    {
      name: 'Testimoni Pembaca',
      href: '/testimonials',
      desc: 'Ulasan dan refleksi dari akademisi, mahasiswa, & praktisi',
      icon: Heart,
    },
    {
      name: 'Pusat Tanya Jawab (FAQ)',
      href: '/faq',
      desc: 'Pertanyaan seputar inisiatif, sitasi, dan kurasi naskah',
      icon: HelpCircle,
    },
    {
      name: 'Pusat Bantuan (Support)',
      href: '/support',
      desc: 'Panduan navigasi, kendala teknis, dan laporan bug',
      icon: LifeBuoy,
    },
    {
      name: 'Hubungi Redaksi',
      href: '/contact',
      desc: 'Formulir kontak langsung dan alamat surel resmi',
      icon: Send,
    },
  ];

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

            {/* Desktop Navigation with Dropdowns */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* 1. Beranda */}
              <Link
                href="/"
                className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Beranda
              </Link>

              {/* 2. Pilar Pengetahuan (Mega Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('categories')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                  className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    pathname?.startsWith('/category')
                      ? 'text-brand-blue bg-blue-50'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'categories'}
                >
                  <span>Pilar Pengetahuan</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'categories' ? 'rotate-180 text-brand-teal' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === 'categories' && (
                  <div className="absolute top-full left-0 w-[540px] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 mt-1 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                      <span>6 Domain Ilmu Pengetahuan</span>
                      <Link
                        href="/#kategori"
                        className="text-brand-teal hover:underline normal-case text-xs font-semibold"
                      >
                        Lihat Ikhtisar →
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {categoryItems.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cat.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-brand-blue transition-colors">
                                {cat.name}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                                {cat.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Publikasi & Arsip (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('publications')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'publications' ? null : 'publications')}
                  className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    pathname?.startsWith('/articles') || pathname === '/archive'
                      ? 'text-brand-blue bg-blue-50'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'publications'}
                >
                  <span>Publikasi & Arsip</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'publications' ? 'rotate-180 text-brand-teal' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === 'publications' && (
                  <div className="absolute top-full left-0 w-[320px] bg-white rounded-2xl shadow-xl border border-slate-200 p-3 mt-1 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 space-y-1">
                    {publicationItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-brand-teal flex items-center justify-center shrink-0 border border-teal-100">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-brand-blue transition-colors">
                              {item.name}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Layanan & Program */}
              <Link
                href="/services"
                className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-colors ${
                  pathname === '/services'
                    ? 'text-brand-blue bg-blue-50'
                    : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                }`}
              >
                Layanan & Program
              </Link>

              {/* 5. Inisiatif & Informasi (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('initiative')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === 'initiative' ? null : 'initiative')}
                  className={`px-3.5 py-2 text-xs lg:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                    ['/about', '/testimonials', '/faq', '/support', '/advertise', '/contact'].includes(pathname)
                      ? 'text-brand-blue bg-blue-50'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                  aria-expanded={activeDropdown === 'initiative'}
                >
                  <span>Inisiatif ▾</span>
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === 'initiative' && (
                  <div className="absolute top-full right-0 w-[340px] bg-white rounded-2xl shadow-xl border border-slate-200 p-3 mt-1 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 space-y-1">
                    {initiativeItems.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-teal-50 group-hover:text-brand-teal transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-heading font-bold text-xs text-slate-900 group-hover:text-brand-blue transition-colors">
                              {item.name}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right actions: Search + Contributor CTA */}
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

              {/* Contributor Action Button */}
              <Link
                href="/contact?topic=submission"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-teal-400" />
                <span>Kirim Naskah</span>
              </Link>

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
        links={[
          { name: 'Beranda', href: '/' },
          { name: 'Semua Artikel', href: '/articles' },
          { name: 'Arsip Pengetahuan', href: '/archive' },
          { name: 'Layanan & Program', href: '/services' },
          { name: 'Tentang ZETARAZ', href: '/about' },
        ]}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
}
