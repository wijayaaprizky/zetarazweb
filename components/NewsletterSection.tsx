'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Terima kasih telah bergabung dengan ZETARAZ Knowledge.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Terjadi kesalahan saat mendaftar. Silakan coba kembali.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white relative overflow-hidden">
      {/* Subtle decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZETARAZ Knowledge Dispatch</span>
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mb-4">
          Dapatkan Kurasi Pengetahuan & Pengalaman Berkala
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          Dapatkan rangkuman artikel pilihan seputar teknologi, metodologi riset, sains data terapan, dan catatan pengalaman praktis langsung di email Anda.
        </p>

        {status === 'success' ? (
          <div className="bg-teal-900/40 border border-teal-500/50 rounded-2xl p-6 max-w-lg mx-auto flex items-center gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-teal-400 shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-teal-300 text-sm">
                Pendaftaran Berhasil
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">{message}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda..."
                  required
                  disabled={status === 'loading'}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-brand-teal hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-teal-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <span>Berlangganan</span>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 mt-4">
              Privasi Anda aman. Kami hanya mengirimkan konten pengetahuan bermanfaat dan Anda bebas berhenti berlangganan kapan saja.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
