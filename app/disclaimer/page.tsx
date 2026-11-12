import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  AlertTriangle,
  FileWarning,
  Info,
  ShieldAlert,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer (Penafian Tanggung Jawab) — ZETARAZ Knowledge',
  description:
    'Penafian hukum dan editorial ZETARAZ Knowledge: batasan tanggung jawab konten, penggunaan materi edukatif, dan tutorial teknologi.',
  alternates: {
    canonical: getCanonicalUrl('/disclaimer'),
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-brand-blue">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Disclaimer</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Penafian Tanggung Jawab</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Disclaimer (Penafian Hukum & Editorial)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Batasan tanggung jawab atas pemanfaatan artikel, panduan teknis, dan catatan pengalaman yang disajikan di platform ZETARAZ Knowledge.
          </p>
          <div className="text-xs text-slate-400 mt-4">
            Terakhir diperbarui: November 2026 • Tim Redaksi ZETARAZ Knowledge
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">1.</span>
              Tujuan Informasi & Edukasi Umum
            </h2>
            <p>
              Semua konten yang disajikan di situs <strong>ZETARAZ Knowledge</strong>—termasuk namun tidak terbatas pada teks artikel, cuplikan kode, bagan diagram, dan opini editorial—diterbitkan semata-mata dengan itikad baik untuk tujuan <strong>informasi umum, pendidikan, dan pertukaran pengalaman</strong>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">2.</span>
              Bukan Nasihat Profesional
            </h2>
            <p className="mb-3">
              Materi yang tercantum di ZETARAZ Knowledge <strong>bukan merupakan dan tidak boleh ditafsirkan sebagai:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Nasihat Hukum atau Kepatuhan Regulasi:</strong> Tulisan seputar privasi atau regulasi siber bersifat pengantar wawasan dan bukan pengganti konsultasi dengan konsultan hukum profesional.
              </li>
              <li>
                <strong>Nasihat Finansial atau Investasi:</strong> Pembahasan seputar ekonomi atau manajemen bisnis tidak dirancang sebagai rekomendasi keuangan langsung.
              </li>
              <li>
                <strong>Garansi Kinerja Arsitektur Sistem:</strong> Panduan teknis seputar pemrograman, arsitektur data, atau keamanan siber harus selalu diuji dan disesuaikan dengan lingkungan infrastruktur spesifik organisasi Anda sebelum diterapkan pada sistem produksi.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">3.</span>
              Dinamika Perkembangan Ilmu Pengetahuan
            </h2>
            <p>
              Dunia teknologi, metodologi penelitian, dan sains bergerak dengan sangat cepat. Meskipun tim redaksi berupaya menjaga kebaruan dan akurasi naskah, ZETARAZ Knowledge tidak memberikan jaminan mutlak bahwa semua informasi yang tercantum selalu lengkap, mutakhir, atau bebas dari kekeliruan ketik. Pembaca disarankan untuk senantiasa membandingkan rujukan dengan dokumentasi resmi terbaru.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">4.</span>
              Penerapan Kode & Tutorial (*Use at Your Own Risk*)
            </h2>
            <p>
              Setiap tindakan atau keputusan yang Anda ambil berdasarkan materi atau tutorial yang ditemukan di ZETARAZ Knowledge sepenuhnya merupakan tanggung jawab dan risiko pribadi Anda (*at your own risk*). ZETARAZ Knowledge, para penulis, dan editor tidak bertanggung jawab atas kerugian langsung maupun tidak langsung, termasuk kehilangan data atau kegagalan sistem yang timbul dari penggunaan platform ini.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">5.</span>
              Opini Penulis & Kontributor Independen
            </h2>
            <p>
              Pandangan dan kesimpulan yang diutarakan dalam artikel reflektif atau esai perspektif merupakan pandangan pribadi masing-masing penulis dan tidak selalu mencerminkan kebijakan resmi institusi tempat penulis bekerja.
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">6.</span>
              Koreksi & Masukan
            </h2>
            <p>
              Jika Anda menemukan ketidakakuratan data dalam artikel kami, silakan ajukan koreksi melalui halaman{' '}
              <Link href="/contact" className="text-brand-teal font-bold hover:underline">
                Kontak Redaksi
              </Link>. Kami berkomitmen untuk meninjau masukan secara transparan.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
