'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, Compass } from 'lucide-react';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Knowledge', href: '/category/knowledge' },
    { name: 'Technology', href: '/category/technology' },
    { name: 'Science & Research', href: '/category/science-research' },
    { name: 'Data & Analytics', href: '/category/data-analytics' },
    { name: 'Business & Management', href: '/category/business-management' },
    { name: 'Learning', href: '/category/learning' },
    { name: 'About', href: '/about' },
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

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-brand-blue bg-blue-50'
                        : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center space-x-2">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 text-xs sm:text-sm font-medium"
                aria-label="Cari artikel dan pengetahuan"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline text-slate-600">Cari topik...</span>
                <span className="hidden md:inline text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl+K
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
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
        links={navLinks}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />
    </>
  );
}
