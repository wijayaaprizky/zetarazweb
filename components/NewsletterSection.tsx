'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-ex-100 py-20 text-slate-700">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Kurasi pengetahuan dan pengalaman, langsung ke email Anda
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Rangkuman artikel pilihan seputar teknologi, metodologi riset, sains data terapan, dan catatan pengalaman praktis.
        </p>

        {status === 'success' ? (
          <div className="bg-white ring-1 ring-kn-200 rounded-2xl p-6 max-w-lg mx-auto flex items-center gap-3 text-left">
            <CheckCircle className="w-6 h-6 text-kn-600 shrink-0" />
            <div>
              <h4 className="font-heading font-bold text-kn-800 text-sm">
                Pendaftaran Berhasil
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">{message}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda..."
                  required
                  aria-label="Alamat email untuk berlangganan buletin pengetahuan"
                  disabled={status === 'loading'}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-kn-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-kn-700 hover:bg-kn-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer"
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
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-xs text-slate-600 mt-4">
              Privasi Anda aman. Kami hanya mengirimkan konten pengetahuan bermanfaat dan Anda bebas berhenti berlangganan kapan saja.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
