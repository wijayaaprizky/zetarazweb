'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Search,
  ChevronRight,
  ChevronDown,
  Cpu,
  Briefcase,
  Palette,
  Users,
  FileText,
  Home,
  Info,
  Send,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  onOpenSearch,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [isArticlesExpanded, setIsArticlesExpanded] = useState(true);

  if (!isOpen) return null;

  const categories = [
    {
      name: 'Teknologi',
      href: '/category/teknologi',
      desc: 'AI, software, keamanan siber',
      icon: Cpu,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'Tata Kelola',
      href: '/category/tata-kelola',
      desc: 'BPM, enterprise, arsitektur sistem',
      icon: Briefcase,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      name: 'Hobby',
      href: '/category/hobby',
      desc: 'Fotografi, jurnal, kreasi minat',
      icon: Palette,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      name: 'Sosial',
      href: '/category/sosial',
      desc: 'Komunitas, literasi publik, dialog',
      icon: Users,
      color: 'text-teal-600 bg-teal-50',
    },
  ];

  const complementaryPages = [
    { name: 'Layanan & Program', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Bantuan (Support)', href: '/support' },
    { name: 'Hubungi Kami', href: '/contact' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigasi Mobile"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white font-bold text-lg">
              Z
            </div>
            <div>
              <span className="font-heading font-black text-lg text-brand-navy">
                ZETARAZ
              </span>
              <span className="font-heading font-bold text-sm text-brand-teal ml-1">
                Knowledge
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Tutup menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button in Mobile */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors text-sm"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Cari topik atau artikel...</span>
          </button>
        </div>

        {/* Navigation list: 3 Core Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
            Menu Utama
          </div>

          {/* 1. Beranda */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              pathname === '/'
                ? 'bg-blue-50 text-brand-blue font-bold'
                : 'text-slate-700 hover:bg-slate-50 hover:text-brand-navy'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className="w-4 h-4 text-slate-400" />
              <span>Beranda</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 2. Daftar Artikel (Accordion with 4 Classifications) */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setIsArticlesExpanded(!isArticlesExpanded)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-brand-teal" />
                <span>Daftar Artikel</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  isArticlesExpanded ? 'rotate-180 text-brand-teal' : ''
                }`}
              />
            </button>

            {isArticlesExpanded && (
              <div className="p-2 space-y-1 bg-slate-50/70 border-t border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Klasifikasi Kategori
                </div>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = pathname === cat.href;
                  return (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-teal-50 text-teal-800 font-bold'
                          : 'text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${cat.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="leading-tight">{cat.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{cat.desc}</div>
                      </div>
                    </Link>
                  );
                })}

                <div className="pt-1.5 mt-1 border-t border-slate-200">
                  <Link
                    href="/articles"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-brand-blue hover:bg-white"
                  >
                    <span>Lihat Semua Artikel</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. Tentang */}
          <Link
            href="/about"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              pathname === '/about'
                ? 'bg-blue-50 text-brand-blue font-bold'
                : 'text-slate-700 hover:bg-slate-50 hover:text-brand-navy'
            }`}
          >
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-slate-400" />
              <span>Tentang</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Complementary links */}
          <div className="pt-4 mt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Halaman Lainnya
            </div>
            {complementaryPages.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors"
              >
                <span>{item.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 text-center">
          <p className="font-semibold text-slate-800">ZETARAZ Knowledge</p>
          <p className="text-[11px] text-brand-teal font-medium mt-0.5">
            Berbagi Pengetahuan, Berbagi Pengalaman
          </p>
        </div>
      </div>
    </div>
  );
}
