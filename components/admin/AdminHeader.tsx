'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Bell, Plus, User } from 'lucide-react';

interface AdminHeaderProps {
  user: any;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          ZETARAZ KMS Management System
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
          Environment: Production Ready
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href="/admin/articles/new"
          className="px-3.5 py-1.5 bg-brand-teal hover:bg-teal-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tulis Artikel</span>
        </Link>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-800">{user.name}</div>
            <div className="text-[10px] text-slate-400">{user.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
