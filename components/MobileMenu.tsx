'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Search, ChevronRight, BookOpen } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
  onOpenSearch: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  onOpenSearch,
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

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

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Menu Utama
          </div>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-brand-blue'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-brand-navy'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              6 Pilar Pengetahuan
            </div>
            {[
              { name: 'Knowledge', href: '/category/knowledge' },
              { name: 'Technology', href: '/category/technology' },
              { name: 'Science & Research', href: '/category/science-research' },
              { name: 'Data & Analytics', href: '/category/data-analytics' },
              { name: 'Business & Management', href: '/category/business-management' },
              { name: 'Learning', href: '/category/learning' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors"
              >
                <span>{cat.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </Link>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Layanan & Bantuan
            </div>
            {[
              { name: 'Layanan & Program', href: '/services' },
              { name: 'Arsip Pengetahuan', href: '/archive' },
              { name: 'Testimoni Pembaca', href: '/testimonials' },
              { name: 'FAQ (Tanya Jawab)', href: '/faq' },
              { name: 'Pusat Bantuan', href: '/support' },
              { name: 'Hubungi Kami', href: '/contact' },
              { name: 'Promosi & Kemitraan', href: '/advertise' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-navy transition-colors"
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
