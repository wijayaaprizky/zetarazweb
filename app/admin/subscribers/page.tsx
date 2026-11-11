import React from 'react';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { formatDateIndonesian } from '@/lib/utils';
import { Mail, CheckCircle2, Users } from 'lucide-react';

export default async function AdminSubscribersPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }

  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
          Pelanggan Buletin Intelijen
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daftar alamat email terverifikasi untuk diseminasi buletin berkala ZETARAZ
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-teal" />
            <h3 className="font-heading font-bold text-sm text-slate-900">
              Total Pelanggan Aktif: {subscribers.length}
            </h3>
          </div>
        </div>

        {subscribers.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-400">
            Belum ada pelanggan buletin yang terdaftar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Tanggal Langganan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3.5 font-sans font-medium text-slate-900">
                      {sub.email}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> {sub.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-sans text-slate-400">
                      {formatDateIndonesian(sub.subscribedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
