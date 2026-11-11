'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Mail,
  ExternalLink,
  LogOut,
  Shield,
} from 'lucide-react';

interface AdminSidebarProps {
  user: any;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      // fallback
    }
  };

  const navItems = [
    { name: 'Dashboard KMS', href: '/admin', icon: LayoutDashboard },
    { name: 'Daftar Artikel', href: '/admin/articles', icon: FileText },
    { name: 'Tulis Artikel Baru', href: '/admin/articles/new', icon: PlusCircle },
    { name: 'Kelola Kategori', href: '/admin/categories', icon: FolderTree },
    { name: 'Pelanggan Buletin', href: '/admin/subscribers', icon: Mail },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-teal-500 flex items-center justify-center text-white font-heading font-black text-xl shadow-md">
              Z
            </div>
            <div>
              <span className="font-heading font-black text-lg text-white">
                ZETARAZ
              </span>
              <span className="block text-[9px] font-bold text-teal-400 uppercase tracking-widest">
                KMS Management
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
            Menu Operasional
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <span>Lihat Website Publik</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi (Logout)</span>
        </button>

        {/* User Card */}
        <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900/60 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-700">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{user.name}</div>
            <div className="text-[10px] text-teal-400 font-mono truncate">{user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
