'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
  RefreshCw,
  Info,
  HelpCircle,
  ShieldCheck,
  Scale,
  Lock,
  Mail,
  BookOpen,
  FileText,
  Briefcase,
  LifeBuoy,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import type {
  AllPagesContent,
  AboutPageContent,
  ServicesPageContent,
  TermsPageContent,
  PrivacyPageContent,
  DisclaimerPageContent,
  FaqPageContent,
  SupportPageContent,
  ContactPageContent,
} from '@/lib/pagesContent';

type PageKey = 'about' | 'services' | 'terms' | 'privacy' | 'disclaimer' | 'faq' | 'support' | 'contact';

interface PageTabMeta {
  key: PageKey;
  label: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const pageTabs: PageTabMeta[] = [
  {
    key: 'about',
    label: 'Tentang Kami',
    url: '/about',
    icon: Sparkles,
    description: 'Profil inisiatif, visi misi, identitas wadah, dan nilai-nilai editorial',
  },
  {
    key: 'services',
    label: 'Layanan & Program',
    url: '/services',
    icon: Briefcase,
    description: 'Daftar inisiatif program, kurasi pengetahuan terbuka, dan kemitraan literasi',
  },
  {
    key: 'terms',
    label: 'Ketentuan Pengguna (Terms)',
    url: '/terms',
    icon: Scale,
    description: 'Syarat penggunaan platform, hak cipta edukatif, dan etika pengutipan',
  },
  {
    key: 'privacy',
    label: 'Kebijakan Privasi (Privacy)',
    url: '/privacy',
    icon: Lock,
    description: 'Pengelolaan data email buletin, privasi pembaca, dan komitmen keamanan',
  },
  {
    key: 'disclaimer',
    label: 'Disclaimer (Penafian)',
    url: '/disclaimer',
    icon: AlertCircle,
    description: 'Penafian hukum dan editorial, batas tanggung jawab materi edukatif & kode',
  },
  {
    key: 'faq',
    label: 'FAQ (Tanya Jawab)',
    url: '/faq',
    icon: HelpCircle,
    description: 'Koleksi pertanyaan yang sering diajukan pembaca & kontributor naskah',
  },
  {
    key: 'support',
    label: 'Pusat Bantuan (Support)',
    url: '/support',
    icon: LifeBuoy,
    description: 'Kategori kendala pembaca, waktu respons redaksi, dan kontak dukungan',
  },
  {
    key: 'contact',
    label: 'Hubungi Kami (Kontak)',
    url: '/contact',
    icon: Mail,
    description: 'Alamat surel resmi, basis wilayah, jam pelayanan redaksi, & etika kirim pesan',
  },
];

export default function AdminPagesManager() {
  const [activeTab, setActiveTab] = useState<PageKey>('about');
  const [pages, setPages] = useState<AllPagesContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    try {
      setLoading(true);
      const res = await fetch('/api/pages-content');
      const data = await res.json();
      if (data.success && data.pages) {
        setPages(data.pages);
      } else {
        setMessage({ type: 'error', text: 'Gagal mengambil data halaman dari server' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Koneksi gagal saat mengambil data halaman' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveCurrentPage() {
    if (!pages) return;
    try {
      setSaving(true);
      setMessage(null);
      const res = await fetch('/api/pages-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: activeTab,
          content: pages[activeTab],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: 'success',
          text: `Perubahan halaman "${pageTabs.find((p) => p.key === activeTab)?.label}" berhasil disimpan dan langsung tayang!`,
        });
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Gagal menyimpan perubahan' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem saat menyimpan' });
    } finally {
      setSaving(false);
    }
  }

  const currentMeta = pageTabs.find((p) => p.key === activeTab)!;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-teal-50 text-teal-700 rounded-lg">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="font-heading font-black text-2xl text-slate-900 tracking-tight">
              Kelola Konten Halaman Statis & Informasi
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Ubah seluruh isi teks, visi misi, program, bab ketentuan, FAQ, hingga kontak langsung dari dashboard ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={currentMeta.url}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Lihat Halaman Publik ({currentMeta.url})</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </Link>

          <button
            onClick={handleSaveCurrentPage}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md shadow-teal-500/20 disabled:opacity-60"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Menyimpan...' : 'Simpan Halaman Ini'}</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
            message.type === 'success'
              ? 'bg-teal-50 border-teal-200 text-teal-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 font-medium">{message.text}</div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs opacity-60 hover:opacity-100 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
        {pageTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setMessage(null);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-teal-700 shadow-sm border border-slate-200 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
              <span className="text-center truncate w-full">{tab.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Banner Meta */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <currentMeta.icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">
              Sedang Mengedit: {currentMeta.label}
            </h2>
            <p className="text-xs text-slate-500">{currentMeta.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono bg-white px-3 py-1 rounded-lg border border-slate-200">
            Path: {currentMeta.url}
          </span>
        </div>
      </div>

      {/* Form Content */}
      {loading || !pages ? (
        <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
          <p className="text-sm">Memuat konten halaman...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <AboutEditor
              data={pages.about}
              onChange={(updated) =>
                setPages({ ...pages, about: { ...pages.about, ...updated } })
              }
            />
          )}

          {/* TAB 2: SERVICES */}
          {activeTab === 'services' && (
            <ServicesEditor
              data={pages.services}
              onChange={(updated) =>
                setPages({ ...pages, services: { ...pages.services, ...updated } })
              }
            />
          )}

          {/* TAB 3: TERMS */}
          {activeTab === 'terms' && (
            <TermsEditor
              data={pages.terms}
              onChange={(updated) =>
                setPages({ ...pages, terms: { ...pages.terms, ...updated } })
              }
            />
          )}

          {/* TAB 4: PRIVACY */}
          {activeTab === 'privacy' && (
            <PrivacyEditor
              data={pages.privacy}
              onChange={(updated) =>
                setPages({ ...pages, privacy: { ...pages.privacy, ...updated } })
              }
            />
          )}

          {/* TAB 5: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <DisclaimerEditor
              data={pages.disclaimer}
              onChange={(updated) =>
                setPages({ ...pages, disclaimer: { ...pages.disclaimer, ...updated } })
              }
            />
          )}

          {/* TAB 6: FAQ */}
          {activeTab === 'faq' && (
            <FaqEditor
              data={pages.faq}
              onChange={(updated) =>
                setPages({ ...pages, faq: { ...pages.faq, ...updated } })
              }
            />
          )}

          {/* TAB 7: SUPPORT */}
          {activeTab === 'support' && (
            <SupportEditor
              data={pages.support}
              onChange={(updated) =>
                setPages({ ...pages, support: { ...pages.support, ...updated } })
              }
            />
          )}

          {/* TAB 8: CONTACT */}
          {activeTab === 'contact' && (
            <ContactEditor
              data={pages.contact}
              onChange={(updated) =>
                setPages({ ...pages, contact: { ...pages.contact, ...updated } })
              }
            />
          )}

          {/* Bottom Save Bar */}
          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={handleSaveCurrentPage}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-md shadow-teal-500/20 disabled:opacity-60"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? 'Menyimpan...' : 'Simpan Seluruh Perubahan Halaman'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================= */
/* SUB-EDITORS FOR EACH PAGE                                                 */
/* ========================================================================= */

// 1. ABOUT EDITOR
function AboutEditor({
  data,
  onChange,
}: {
  data: AboutPageContent;
  onChange: (updated: Partial<AboutPageContent>) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          1. Hero Banner Atas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label Kecil
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Utama Hero
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Subjudul / Slogan Hero
            </label>
            <input
              type="text"
              value={data.heroSubtitle || ''}
              onChange={(e) => onChange({ heroSubtitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paragraf Deskripsi Hero
            </label>
            <textarea
              rows={3}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Motto Kutipan Inspiratif Hero
            </label>
            <input
              type="text"
              value={data.heroMotto || ''}
              onChange={(e) => onChange({ heroMotto: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 italic font-serif text-teal-800"
            />
          </div>
        </div>
      </div>

      {/* Identitas & Visi Misi */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          2. Identitas Kami & Filosofi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Bagian
            </label>
            <input
              type="text"
              value={data.identityBadge || ''}
              onChange={(e) => onChange({ identityBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Identitas
            </label>
            <input
              type="text"
              value={data.identityTitle || ''}
              onChange={(e) => onChange({ identityTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paragraf Filosofi 1
            </label>
            <textarea
              rows={3}
              value={data.identityDescription1 || ''}
              onChange={(e) => onChange({ identityDescription1: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paragraf Filosofi 2 (Penegasan Wadah)
            </label>
            <textarea
              rows={3}
              value={data.identityDescription2 || ''}
              onChange={(e) => onChange({ identityDescription2: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <ImageUploader
              value={data.identityImageUrl || ''}
              onChange={(url) => onChange({ identityImageUrl: url })}
              label="Gambar Banner Samping (Tentang Kami)"
              aspectRatio="aspect-square sm:aspect-video"
              helperText="Pilih upload file gambar dari komputer atau tempelkan tautan URL gambar."
            />
          </div>
        </div>

        {/* Poin-Poin Misi */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Poin-Poin Komitmen & Misi (Checklist)
            </label>
            <button
              type="button"
              onClick={() => {
                const list = [...(data.identityPoints || [])];
                list.push('Komitmen edukatif baru...');
                onChange({ identityPoints: list });
              }}
              className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Poin
            </button>
          </div>
          <div className="space-y-2">
            {(data.identityPoints || []).map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const list = [...data.identityPoints];
                    list[idx] = e.target.value;
                    onChange({ identityPoints: list });
                  }}
                  className="flex-1 text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const list = data.identityPoints.filter((_, i) => i !== idx);
                    onChange({ identityPoints: list });
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nilai-Nilai & Prinsip Karakter */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              3. Nilai yang Menjiwai Setiap Tulisan (5 Prinsip Utama)
            </h3>
            <p className="text-xs text-slate-500">
              Atribut karakter penulisan yang membedakan ZETARAZ Knowledge
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const attrs = [...(data.brandAttributes || [])];
              attrs.push({ title: 'Prinsip Baru', desc: 'Deskripsi prinsip...' });
              onChange({ brandAttributes: attrs });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Nilai
          </button>
        </div>

        <div className="space-y-4">
          {(data.brandAttributes || []).map((attr, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  Nilai 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const attrs = data.brandAttributes.filter((_, i) => i !== idx);
                    onChange({ brandAttributes: attrs });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Judul Nilai..."
                  value={attr.title}
                  onChange={(e) => {
                    const attrs = [...data.brandAttributes];
                    attrs[idx] = { ...attrs[idx], title: e.target.value };
                    onChange({ brandAttributes: attrs });
                  }}
                  className="w-full text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  placeholder="Deskripsi Nilai..."
                  value={attr.desc}
                  onChange={(e) => {
                    const attrs = [...data.brandAttributes];
                    attrs[idx] = { ...attrs[idx], desc: e.target.value };
                    onChange({ brandAttributes: attrs });
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kredibilitas, Privasi & Ketentuan Footer */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          4. Kredibilitas & Etika Pengetahuan Terbuka
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Kredibilitas
            </label>
            <input
              type="text"
              value={data.credibilityTitle || ''}
              onChange={(e) => onChange({ credibilityTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Teks Tanggal Pembaruan
            </label>
            <input
              type="text"
              value={data.lastUpdated || ''}
              onChange={(e) => onChange({ lastUpdated: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paragraf Kredibilitas 1
            </label>
            <textarea
              rows={2}
              value={data.credibilityParagraph1 || ''}
              onChange={(e) => onChange({ credibilityParagraph1: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Paragraf Kredibilitas 2 (Koreksi & Pembaruan)
            </label>
            <textarea
              rows={2}
              value={data.credibilityParagraph2 || ''}
              onChange={(e) => onChange({ credibilityParagraph2: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Ringkasan Privasi Pembaca
            </label>
            <textarea
              rows={2}
              value={data.privacyParagraph || ''}
              onChange={(e) => onChange({ privacyParagraph: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Ringkasan Ketentuan & Hak Cipta Edukatif
            </label>
            <textarea
              rows={2}
              value={data.termsParagraph || ''}
              onChange={(e) => onChange({ termsParagraph: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. SERVICES EDITOR
function ServicesEditor({
  data,
  onChange,
}: {
  data: ServicesPageContent;
  onChange: (updated: Partial<ServicesPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Hero Banner Layanan & Program
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Utama
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Hero
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Program List */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Daftar Program & Inisiatif Terbuka
            </h3>
            <p className="text-xs text-slate-500">
              Kelola kartu program yang tampil di halaman /services
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const progs = [...(data.programs || [])];
              progs.push({
                title: 'Program Inisiatif Baru',
                subtitle: 'Standar Mutu Terbuka',
                desc: 'Deskripsi lengkap program inisiatif...',
                benefits: ['Keuntungan 1', 'Keuntungan 2'],
              });
              onChange({ programs: progs });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Program
          </button>
        </div>

        <div className="space-y-6">
          {(data.programs || []).map((prog, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-lg">
                  Program #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const progs = data.programs.filter((_, i) => i !== idx);
                    onChange({ programs: progs });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Program
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Judul Program
                  </label>
                  <input
                    type="text"
                    value={prog.title}
                    onChange={(e) => {
                      const progs = [...data.programs];
                      progs[idx] = { ...progs[idx], title: e.target.value };
                      onChange({ programs: progs });
                    }}
                    className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Subjudul / Kategori
                  </label>
                  <input
                    type="text"
                    value={prog.subtitle}
                    onChange={(e) => {
                      const progs = [...data.programs];
                      progs[idx] = { ...progs[idx], subtitle: e.target.value };
                      onChange({ programs: progs });
                    }}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Penjelasan Program
                  </label>
                  <textarea
                    rows={2}
                    value={prog.desc}
                    onChange={(e) => {
                      const progs = [...data.programs];
                      progs[idx] = { ...progs[idx], desc: e.target.value };
                      onChange({ programs: progs });
                    }}
                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">
                    Poin Fitur / Manfaat
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const progs = [...data.programs];
                      const benefits = [...(progs[idx].benefits || [])];
                      benefits.push('Manfaat baru...');
                      progs[idx] = { ...progs[idx], benefits };
                      onChange({ programs: progs });
                    }}
                    className="text-[11px] text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Tambah Manfaat
                  </button>
                </div>
                <div className="space-y-1.5">
                  {(prog.benefits || []).map((ben, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ben}
                        onChange={(e) => {
                          const progs = [...data.programs];
                          const benefits = [...progs[idx].benefits];
                          benefits[bIdx] = e.target.value;
                          progs[idx] = { ...progs[idx], benefits };
                          onChange({ programs: progs });
                        }}
                        className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const progs = [...data.programs];
                          const benefits = progs[idx].benefits.filter((_, i) => i !== bIdx);
                          progs[idx] = { ...progs[idx], benefits };
                          onChange({ programs: progs });
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. TERMS EDITOR
function TermsEditor({
  data,
  onChange,
}: {
  data: TermsPageContent;
  onChange: (updated: Partial<TermsPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Header Ketentuan Pengguna
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tanggal Efektif
            </label>
            <input
              type="text"
              value={data.effectiveDate || ''}
              onChange={(e) => onChange({ effectiveDate: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Pasal-Pasal Ketentuan (Sections)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola klausul dan butir ketentuan pengguna secara terstruktur
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const secs = [...(data.sections || [])];
              secs.push({
                title: 'Pasal Baru',
                content: 'Isi penjelasan pasal ketentuan...',
              });
              onChange({ sections: secs });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Pasal
          </button>
        </div>

        <div className="space-y-5">
          {(data.sections || []).map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-lg">
                  Pasal {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const secs = data.sections.filter((_, i) => i !== idx);
                    onChange({ sections: secs });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Pasal
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Judul Pasal
                </label>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], title: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Isi Ketentuan (Paragraf)
                </label>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], content: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-amber-800 uppercase mb-1">
                  Kotak Peringatan Khusus / Catatan (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Opsional: Teks peringatan penting di dalam kotak kuning..."
                  value={sec.noteBox || ''}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], noteBox: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed text-amber-950"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. PRIVACY EDITOR
function PrivacyEditor({
  data,
  onChange,
}: {
  data: PrivacyPageContent;
  onChange: (updated: Partial<PrivacyPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Header Kebijakan Privasi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tanggal Efektif
            </label>
            <input
              type="text"
              value={data.effectiveDate || ''}
              onChange={(e) => onChange({ effectiveDate: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Bab Kebijakan Privasi (Sections)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola komitmen perlindungan data dan privasi pembaca
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const secs = [...(data.sections || [])];
              secs.push({
                title: 'Bab Privasi Baru',
                content: 'Isi penjelasan kebijakan privasi...',
              });
              onChange({ sections: secs });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Bab
          </button>
        </div>

        <div className="space-y-5">
          {(data.sections || []).map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-lg">
                  Bab {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const secs = data.sections.filter((_, i) => i !== idx);
                    onChange({ sections: secs });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Bab
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Judul Bab
                </label>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], title: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Isi Kebijakan (Paragraf)
                </label>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], content: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. DISCLAIMER EDITOR
function DisclaimerEditor({
  data,
  onChange,
}: {
  data: DisclaimerPageContent;
  onChange: (updated: Partial<DisclaimerPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Header Disclaimer (Penafian Hukum)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tanggal Efektif
            </label>
            <input
              type="text"
              value={data.effectiveDate || ''}
              onChange={(e) => onChange({ effectiveDate: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Poin-Poin Batasan Tanggung Jawab
            </h3>
            <p className="text-xs text-slate-500">
              Kelola klausul penafian hukum, tutorial kode, dan opini independen
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const secs = [...(data.sections || [])];
              secs.push({
                title: 'Poin Penafian Baru',
                content: 'Isi penjelasan batasan tanggung jawab...',
              });
              onChange({ sections: secs });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Poin
          </button>
        </div>

        <div className="space-y-5">
          {(data.sections || []).map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-lg">
                  Poin {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const secs = data.sections.filter((_, i) => i !== idx);
                    onChange({ sections: secs });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Poin
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Judul Penafian
                </label>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], title: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Isi Batasan (Paragraf)
                </label>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => {
                    const secs = [...data.sections];
                    secs[idx] = { ...secs[idx], content: e.target.value };
                    onChange({ sections: secs });
                  }}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6. FAQ EDITOR
function FaqEditor({
  data,
  onChange,
}: {
  data: FaqPageContent;
  onChange: (updated: Partial<FaqPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Header FAQ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Categories & Questions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Kategori & Daftar Pertanyaan
            </h3>
            <p className="text-xs text-slate-500">
              Kelola kelompok tanya-jawab yang tampil di halaman /faq
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const cats = [...(data.categories || [])];
              cats.push({
                category: 'Kategori FAQ Baru',
                questions: [
                  { q: 'Pertanyaan pertama...', a: 'Jawaban penjelasan...' },
                ],
              });
              onChange({ categories: cats });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Kategori FAQ
          </button>
        </div>

        {(data.categories || []).map((cat, cIdx) => (
          <div key={cIdx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex-1 mr-4">
                <label className="block text-[11px] font-bold text-teal-700 uppercase mb-1">
                  Nama Kategori FAQ #{cIdx + 1}
                </label>
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => {
                    const cats = [...data.categories];
                    cats[cIdx] = { ...cats[cIdx], category: e.target.value };
                    onChange({ categories: cats });
                  }}
                  className="w-full text-base font-bold px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const cats = [...data.categories];
                    const questions = [...(cats[cIdx].questions || [])];
                    questions.push({ q: 'Pertanyaan baru...', a: 'Jawaban baru...' });
                    cats[cIdx] = { ...cats[cIdx], questions };
                    onChange({ categories: cats });
                  }}
                  className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 px-3 py-1.5 bg-teal-50 rounded-lg border border-teal-200"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Tanya-Jawab
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cats = data.categories.filter((_, i) => i !== cIdx);
                    onChange({ categories: cats });
                  }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {(cat.questions || []).map((item, qIdx) => (
                <div key={qIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      Q#{qIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const cats = [...data.categories];
                        const questions = cats[cIdx].questions.filter((_, i) => i !== qIdx);
                        cats[cIdx] = { ...cats[cIdx], questions };
                        onChange({ categories: cats });
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Pertanyaan (Tanya)..."
                      value={item.q}
                      onChange={(e) => {
                        const cats = [...data.categories];
                        const questions = [...cats[cIdx].questions];
                        questions[qIdx] = { ...questions[qIdx], q: e.target.value };
                        cats[cIdx] = { ...cats[cIdx], questions };
                        onChange({ categories: cats });
                      }}
                      className="w-full text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Jawaban penjelasan..."
                      value={item.a}
                      onChange={(e) => {
                        const cats = [...data.categories];
                        const questions = [...cats[cIdx].questions];
                        questions[qIdx] = { ...questions[qIdx], a: e.target.value };
                        cats[cIdx] = { ...cats[cIdx], questions };
                        onChange({ categories: cats });
                      }}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. SUPPORT EDITOR
function SupportEditor({
  data,
  onChange,
}: {
  data: SupportPageContent;
  onChange: (updated: Partial<SupportPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Header Pusat Bantuan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Surel Dukungan Resmi
            </label>
            <input
              type="text"
              value={data.supportEmail || ''}
              onChange={(e) => onChange({ supportEmail: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-teal-800"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Teks Waktu Respons
            </label>
            <input
              type="text"
              value={data.responseTimeText || ''}
              onChange={(e) => onChange({ responseTimeText: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Support Topics */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Kartu Kategori Bantuan (Support Topics)
            </h3>
            <p className="text-xs text-slate-500">
              Kelola kartu bantuan navigasi, bug, dan koreksi naskah
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const topics = [...(data.topics || [])];
              topics.push({
                title: 'Topik Bantuan Baru',
                desc: 'Deskripsi bantuan...',
                linkText: 'Pelajari Selengkapnya',
                linkHref: '/faq',
              });
              onChange({ topics });
            }}
            className="text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Topik
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data.topics || []).map((topic, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                  Topik #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const topics = data.topics.filter((_, i) => i !== idx);
                    onChange({ topics });
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Judul Topik
                </label>
                <input
                  type="text"
                  value={topic.title}
                  onChange={(e) => {
                    const topics = [...data.topics];
                    topics[idx] = { ...topics[idx], title: e.target.value };
                    onChange({ topics });
                  }}
                  className="w-full text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                  Penjelasan Singkat
                </label>
                <textarea
                  rows={2}
                  value={topic.desc}
                  onChange={(e) => {
                    const topics = [...data.topics];
                    topics[idx] = { ...topics[idx], desc: e.target.value };
                    onChange({ topics });
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Teks Tautan
                  </label>
                  <input
                    type="text"
                    value={topic.linkText}
                    onChange={(e) => {
                      const topics = [...data.topics];
                      topics[idx] = { ...topics[idx], linkText: e.target.value };
                      onChange({ topics });
                    }}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Tujuan URL
                  </label>
                  <input
                    type="text"
                    value={topic.linkHref}
                    onChange={(e) => {
                      const topics = [...data.topics];
                      topics[idx] = { ...topics[idx], linkHref: e.target.value };
                      onChange({ topics });
                    }}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. CONTACT EDITOR
function ContactEditor({
  data,
  onChange,
}: {
  data: ContactPageContent;
  onChange: (updated: Partial<ContactPageContent>) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Informasi Kontak Resmi & Redaksi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Badge Label
            </label>
            <input
              type="text"
              value={data.heroBadge || ''}
              onChange={(e) => onChange({ heroBadge: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Judul Halaman
            </label>
            <input
              type="text"
              value={data.heroTitle || ''}
              onChange={(e) => onChange({ heroTitle: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={2}
              value={data.heroDescription || ''}
              onChange={(e) => onChange({ heroDescription: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Pertanyaan Umum
            </label>
            <input
              type="text"
              value={data.publicEmail || ''}
              onChange={(e) => onChange({ publicEmail: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Redaksi & Naskah
            </label>
            <input
              type="text"
              value={data.editorialEmail || ''}
              onChange={(e) => onChange({ editorialEmail: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Email Bantuan & Support
            </label>
            <input
              type="text"
              value={data.supportEmail || ''}
              onChange={(e) => onChange({ supportEmail: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Basis Lokasi Inisiatif
            </label>
            <input
              type="text"
              value={data.officeLocation || ''}
              onChange={(e) => onChange({ officeLocation: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Waktu Pelayanan Redaksi
            </label>
            <input
              type="text"
              value={data.operatingHours || ''}
              onChange={(e) => onChange({ operatingHours: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Teks Kotak Etika Pengiriman Pesan
            </label>
            <textarea
              rows={2}
              value={data.guidelinesText || ''}
              onChange={(e) => onChange({ guidelinesText: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
