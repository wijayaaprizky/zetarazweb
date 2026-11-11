'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, BookOpen, Compass, Shield, Sparkles } from 'lucide-react';
import SearchModal from './SearchModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Knowledge', href: '/category/knowledge' },
    { name: 'Research', href: '/category/research' },
    { name: 'Technology', href: '/category/technology' },
    { name: 'Business & Management', href: '/category/business-management' },
    { name: 'Learning', href: '/category/learning' },
    { name: 'About ZETARAZ', href: '/about' },
  ];

  return (
    <>
      {/* Top Banner / Editorial Status Bar */}
      <div className="bg-brand-dark text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              EDISI INDONESIA
            </span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline italic">
              "Knowledge. Intelligence. Discovery."
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 hidden md:inline">
              Platform Manajemen Pengetahuan & Publikasi Intelektual
            </span>
            <Link
              href="/admin"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700"
            >
              <Shield className="w-3 h-3 text-teal-400" />
              <span>KMS Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-brand-navy via-brand-dark to-brand-blue flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md group-hover:scale-105 transition-transform border border-slate-700/50">
                  Z
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-2xl tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors">
                      ZETARAZ
                    </span>
                    <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 bg-teal-50 text-brand-teal rounded border border-teal-200/60 uppercase">
                      KMS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium tracking-wider uppercase hidden sm:block">
                    Independent Knowledge Company
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                      isActive
                        ? 'text-brand-blue bg-blue-50/80'
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
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200 text-sm"
                aria-label="Cari artikel dan pengetahuan"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span className="hidden md:inline text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl+K
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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
