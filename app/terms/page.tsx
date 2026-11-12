import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  FileText,
  ShieldCheck,
  Scale,
  AlertCircle,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ketentuan Pengguna (Terms of Service) — ZETARAZ Knowledge',
  description:
    'Syarat dan ketentuan resmi penggunaan platform ZETARAZ Knowledge, hak cipta konten edukatif, etika pengutipan, dan tanggung jawab pengguna.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
};

export default function TermsPage() {
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
            <span className="font-semibold text-slate-800">Ketentuan Pengguna</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Regulasi & Etika Layanan</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Ketentuan Pengguna (Terms of Service)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Aturan main, etika berbagi pengetahuan terbuka, dan batas tanggung jawab penggunaan seluruh materi di platform ZETARAZ Knowledge.
          </p>
          <div className="text-xs text-slate-400 mt-4">
            Berlaku efektif sejak: 1 November 2026 • Pembaruan Terakhir: November 2026
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
              Penerimaan Ketentuan
            </h2>
            <p>
              Dengan mengakses, menelusuri, membaca, atau memanfaatkan materi yang tersedia di situs web <strong>ZETARAZ Knowledge</strong> (selanjutnya disebut "Platform", "Kami", atau "Situs"), Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan Pengguna ini. Apabila Anda tidak menyetujui salah satu bagian dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan Situs ini.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">2.</span>
              Sifat Konten & Tujuan Edukasi
            </h2>
            <p className="mb-3">
              Seluruh artikel, kajian, ulasan metodologi, panduan langkah-demi-langkah, dan catatan pengalaman lapangan yang dipublikasikan di ZETARAZ Knowledge disajikan semata-mata untuk tujuan <strong>literasi, edukasi, dan pertukaran wawasan publik</strong>.
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Bukan Nasihat Resmi:</strong> Materi di platform ini tidak boleh dianggap sebagai nasihat hukum, keuangan, medis, atau konsultansi arsitektur sistem resmi yang mengikat. Untuk keputusan teknis atau profesional yang berdampak kritis, pengguna wajib berkonsultasi dengan tenaga ahli tersertifikasi terkait.
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">3.</span>
              Hak Kekayaan Intelektual & Atribusi Sitasi
            </h2>
            <p className="mb-3">
              Kami mendukung penyebaran pengetahuan secara sehat dan bermoral:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Hak Cipta Penulis:</strong> Seluruh naskah tulisan orisinal dilindungi oleh undang-undang hak cipta yang berlaku di Republik Indonesia dan konvensi internasional.
              </li>
              <li>
                <strong>Pengutipan Wajar (*Fair Use*):</strong> Anda diperkenankan mengutip sebagian paragraf atau ringkasan gagasan untuk keperluan penulisan skripsi, artikel akademis, ulasan non-komersial, atau bahan ajar, dengan <strong>kewajiban mutlak mencantumkan nama penulis dan tautan langsung ke artikel sumber di ZETARAZ Knowledge</strong>.
              </li>
              <li>
                <strong>Larangan Plagiarisme & Penjiplakan Massal:</strong> Menggandakan secara utuh (*copy-paste full article*), melakukan scraping data otomatis tanpa izin untuk situs agregator konten, atau mengklaim kepemilikan naskah orang lain adalah pelanggaran hukum.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">4.</span>
              Etika Penggunaan & Keamanan Sistem
            </h2>
            <p className="mb-3">Pengguna platform dilarang keras untuk:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Melakukan serangan penolakan layanan (DDoS), injeksi kode berbahaya, eksploitasi celah keamanan API, atau tindakan apa pun yang mengganggu stabilitas infrastruktur server.</li>
              <li>Menyalahgunakan formulir pencarian, pendaftaran newsletter, atau kontak untuk mengirimkan spam, tautan phishing, atau materi bermuatan malware.</li>
              <li>Mencoba mengakses area dashboard administrasi redaksi tanpa otorisasi sah.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">5.</span>
              Tautan ke Pihak Ketiga
            </h2>
            <p>
              Artikel di ZETARAZ Knowledge dapat memuat tautan rujukan ke jurnal ilmiah eksternal, dokumentasi resmi teknologi, atau situs web pihak ketiga. Kami tidak memiliki kendali dan tidak bertanggung jawab atas isi, kebijakan privasi, atau keandalan situs pihak ketiga tersebut.
            </p>
          </div>

          {/* Section 6 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">6.</span>
              Perubahan Ketentuan
            </h2>
            <p>
              ZETARAZ Knowledge berhak memperbarui dan memodifikasi ketentuan ini sewaktu-waktu sesuai perkembangan operasional dan hukum. Setiap perubahan substansial akan dicantumkan tanggal revisinya di bagian atas halaman ini.
            </p>
          </div>

          {/* Section 7 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">7.</span>
              Kontak Pertanyaan Hukum & Editorial
            </h2>
            <p>
              Jika Anda memiliki pertanyaan seputar ketentuan penggunaan ini atau izin penggunaan materi khusus, silakan hubungi tim kami melalui surel di{' '}
              <a href="mailto:kontak@zetaraz.org" className="text-brand-teal font-bold hover:underline">
                kontak@zetaraz.org
              </a>{' '}
              atau melalui formulir di halaman{' '}
              <Link href="/contact" className="text-brand-blue font-bold hover:underline">
                Hubungi Kami
              </Link>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
