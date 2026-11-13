'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Sparkles,
  Link as LinkIcon,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  Info,
} from 'lucide-react';

interface SiteLink {
  name: string;
  href: string;
}

interface SiteSettings {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  description: string;
  motto: string;
  location: string;
  contactEmail: string;
  copyrightText: string;
  directoryLinks: SiteLink[];
  legalLinks: SiteLink[];
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'branding' | 'links' | 'preview'>('branding');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => {
        console.error('Fetch settings error:', err);
        setFeedback({ type: 'error', message: 'Gagal memuat pengaturan website dari server.' });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: 'Seluruh pengaturan identitas dan footer berhasil diperbarui secara live!',
        });
        setSettings(data.settings);
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Gagal menyimpan pengaturan ke sistem.',
        });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Terjadi kesalahan jaringan saat menyimpan.' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleLinkChange = (
    type: 'directoryLinks' | 'legalLinks',
    index: number,
    key: 'name' | 'href',
    val: string
  ) => {
    if (!settings) return;
    const list = [...settings[type]];
    list[index] = { ...list[index], [key]: val };
    setSettings({ ...settings, [type]: list });
  };

  const handleAddLink = (type: 'directoryLinks' | 'legalLinks') => {
    if (!settings) return;
    const list = [...settings[type], { name: 'Tautan Baru', href: '/' }];
    setSettings({ ...settings, [type]: list });
  };

  const handleRemoveLink = (type: 'directoryLinks' | 'legalLinks', index: number) => {
    if (!settings) return;
    const list = settings[type].filter((_, idx) => idx !== index);
    setSettings({ ...settings, [type]: list });
  };

  if (isLoading || !settings) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-brand-teal mb-3" />
        <p className="text-sm font-medium">Memuat modul pengaturan website...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-xs font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>KMS Configuration Engine</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Pengaturan Website & Footer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ubah identitas brand, deskripsi narasi, kontak, dan struktur tautan footer secara terpusat.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={isSaving}
          className="px-5 py-2.5 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan Perubahan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Seluruh Pengaturan</span>
            </>
          )}
        </button>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs sm:text-sm font-medium transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'branding'
              ? 'bg-brand-navy text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>1. Identitas & Narasi Footer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'links'
              ? 'bg-brand-navy text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>2. Tautan & Kolom Footer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 ${
            activeTab === 'preview'
              ? 'bg-brand-navy text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>3. Pratinjau Visual Footer</span>
        </button>
      </div>

      {/* TAB 1: BRANDING & NARASI */}
      {activeTab === 'branding' && (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Card: Brand Names */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-teal" />
              <span>Nama Brand & Slogan Utama</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Utama Brand
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => updateField('brandName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold"
                  placeholder="Contoh: ZETARAZ"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sub-Nama Brand
                </label>
                <input
                  type="text"
                  value={settings.brandSubtitle}
                  onChange={(e) => updateField('brandSubtitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold text-teal-600"
                  placeholder="Contoh: Knowledge"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Tagline / Sub-Judul
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  placeholder="Contoh: Berbagi Pengetahuan, Berbagi Pengalaman"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Motto / Kutipan Inspirasi
                </label>
                <input
                  type="text"
                  value={settings.motto}
                  onChange={(e) => updateField('motto', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 italic font-serif"
                  placeholder='Contoh: "Temukan Pengetahuan. Perluas Wawasan."'
                />
              </div>
            </div>
          </div>

          {/* Card: Narasi Deskripsi Footer */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-teal" />
              <span>Paragraf Deskripsi Profil Website (Footer)</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Isi Paragraf Profil
              </label>
              <textarea
                rows={4}
                value={settings.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 leading-relaxed text-slate-700"
                placeholder="Tuliskan deskripsi lengkap profil platform Anda..."
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Teks ini tampil di kolom kiri footer di bawah logo ZETARAZ.
              </span>
            </div>
          </div>

          {/* Card: Kontak & Copyright */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-teal" />
              <span>Kontak, Lokasi, dan Hak Cipta</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Wilayah / Lokasi
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={settings.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Contoh: Indonesia"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Kontak Resmi
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Contoh: kontak@zetaraz.org"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Teks Hak Cipta (Bagian Bawah Baris Copyright)
              </label>
              <input
                type="text"
                value={settings.copyrightText}
                onChange={(e) => updateField('copyrightText', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Contoh: Berbagi Pengetahuan, Berbagi Pengalaman. Terbuka untuk semua pembelajar."
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Identitas & Narasi</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: LINK FOOTER */}
      {activeTab === 'links' && (
        <div className="space-y-6">
          {/* Column 1: Jelajahi & Direktori */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-brand-teal" />
                  <span>Kolom 1: Jelajahi & Direktori</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tautan eksplorasi umum di kolom tengah footer.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddLink('directoryLinks')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Tautan</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {settings.directoryLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl"
                >
                  <span className="text-xs font-bold text-slate-400 w-6 text-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        handleLinkChange('directoryLinks', idx, 'name', e.target.value)
                      }
                      placeholder="Label Tautan (Contoh: Tentang Kami)"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) =>
                        handleLinkChange('directoryLinks', idx, 'href', e.target.value)
                      }
                      placeholder="URL Tujuan (Contoh: /about)"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink('directoryLinks', idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus tautan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Bantuan & Regulasi Legal */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-brand-teal" />
                  <span>Kolom 2: Bantuan & Regulasi Legal</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tautan regulasi kebijakan, kepatuhan, dan pusat bantuan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddLink('legalLinks')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-brand-blue font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Tautan</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {settings.legalLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl"
                >
                  <span className="text-xs font-bold text-slate-400 w-6 text-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        handleLinkChange('legalLinks', idx, 'name', e.target.value)
                      }
                      placeholder="Label Tautan (Contoh: FAQ)"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) =>
                        handleLinkChange('legalLinks', idx, 'href', e.target.value)
                      }
                      placeholder="URL Tujuan (Contoh: /faq)"
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink('legalLinks', idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus tautan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={isSaving}
              className="px-6 py-3 bg-brand-teal hover:bg-teal-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Tautan Footer</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-brand-teal" />
              <span>Pratinjau Hasil Tampilan Footer di Website Publik</span>
            </div>
            <span className="text-xs text-slate-400 italic">
              *Tampilan interaktif real-time sesuai input Anda
            </span>
          </div>

          <div className="bg-brand-navy text-slate-400 text-sm rounded-2xl border border-slate-800 p-8 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-teal-500 flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md">
                    Z
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading font-black text-2xl tracking-tight text-white">
                        {settings.brandName}
                      </span>
                      <span className="font-heading font-bold text-base tracking-tight text-teal-400">
                        {settings.brandSubtitle}
                      </span>
                    </div>
                    <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                      {settings.tagline}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                  {settings.description}
                </p>

                <div className="pt-2 text-xs text-slate-300">
                  <span className="italic font-serif text-teal-300 font-medium">
                    "{settings.motto}"
                  </span>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{settings.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{settings.contactEmail}</span>
                  </div>
                </div>
              </div>

              {/* Classification */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Klasifikasi Artikel
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>Pengetahuan</li>
                  <li>Pengalaman</li>
                  <li>Opini</li>
                  <li className="pt-2 border-t border-slate-800 text-teal-400 font-semibold">
                    Semua Artikel →
                  </li>
                </ul>
              </div>

              {/* Directory */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Jelajahi & Direktori
                </h4>
                <ul className="space-y-2 text-xs">
                  {settings.directoryLinks.map((l, i) => (
                    <li key={i}>{l.name}</li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Bantuan & Regulasi Legal
                </h4>
                <ul className="space-y-2 text-xs">
                  {settings.legalLinks.map((l, i) => (
                    <li key={i}>{l.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs text-slate-500">
              © {new Date().getFullYear()} {settings.brandName} {settings.brandSubtitle}.{' '}
              {settings.copyrightText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
