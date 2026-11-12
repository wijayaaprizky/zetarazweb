'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Mohon lengkapi nama, email, dan pesan Anda.');
      return;
    }

    setStatus('loading');

    // Simulate sending message or calling api
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        topic: 'general',
        subject: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Terjadi kendala jaringan saat mengirim pesan. Silakan coba kembali.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-lg text-teal-950 mb-2">
          Pesan Anda Berhasil Terkirim!
        </h3>
        <p className="text-xs sm:text-sm text-teal-800 max-w-md mx-auto mb-6 leading-relaxed">
          Terima kasih telah menghubungi ZETARAZ Knowledge. Tim redaksi kami akan membaca pesan Anda dan membalas melalui email secepatnya.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-5 py-2 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Kirim Pesan Lainnya
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Nama Lengkap <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="mis. Rizky Aditya"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-brand-teal transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Alamat Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="nama@email.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-brand-teal transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Topik Pembahasan
          </label>
          <select
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-brand-teal bg-white transition-all"
          >
            <option value="general">Pertanyaan Umum</option>
            <option value="submission">Pengajuan Naskah / Pengalaman</option>
            <option value="correction">Koreksi Data / Editorial</option>
            <option value="partnership">Kemitraan & Kolaborasi</option>
            <option value="bug">Laporan Kendala Teknis</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Subjek Singkat
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Ringkasan hal yang ingin dibahas"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-brand-teal transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Pesan Lengkap <span className="text-rose-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tuliskan pesan, rujukan, atau pertanyaan Anda secara rinci..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-brand-teal transition-all resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto px-6 py-3 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Mengirim Pesan...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Kirim Pesan ke Redaksi</span>
          </>
        )}
      </button>
    </form>
  );
}
