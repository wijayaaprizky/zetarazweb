import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  Lock,
  ShieldCheck,
  Eye,
  Database,
  UserCheck,
  Mail,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi (Privacy Policy) — ZETARAZ Knowledge',
  description:
    'Kebijakan perlindungan data pribadi dan privasi pembaca di ZETARAZ Knowledge: pengelolaan surel newsletter, log server, dan hak privasi Anda.',
  alternates: {
    canonical: getCanonicalUrl('/privacy'),
  },
};

export default function PrivacyPage() {
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
            <span className="font-semibold text-slate-800">Kebijakan Privasi</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Keamanan & Privasi Data</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Kebijakan Privasi (Privacy Policy)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Komitmen kami untuk melindungi identitas dan privasi seluruh pembaca, kontributor, dan pelanggan buletin ZETARAZ Knowledge.
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
              Prinsip Dasar Privasi Kami
            </h2>
            <p>
              Di <strong>ZETARAZ Knowledge</strong>, kami percaya bahwa membaca dan menuntut ilmu harus menjadi kegiatan yang aman, tenang, dan bebas dari pelacakan yang agresif. Kami <strong>tidak pernah menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada perusahaan periklanan pihak ketiga</strong>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">2.</span>
              Informasi yang Kami Kumpulkan
            </h2>
            <p className="mb-3">
              Kami membatasi pengumpulan data hanya pada hal-hal yang esensial untuk pengoperasian platform:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5 text-xs uppercase tracking-wider text-brand-teal">
                  <Mail className="w-4 h-4" /> Alamat Email Sukarela
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hanya dikumpulkan apabila Anda secara sukarela mendaftar buletin mingguan atau mengirim pesan melalui formulir kontak.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5 text-xs uppercase tracking-wider text-brand-teal">
                  <Database className="w-4 h-4" /> Log Teknis Anonim
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Informasi teknis standar seperti jenis peramban, resolusi layar, dan waktu akses untuk pemantauan stabilitas server dan pencegahan spam.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">3.</span>
              Tujuan Penggunaan Data
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pengiriman Buletin Berkala:</strong> Mengirimkan ringkasan artikel terbaru, rilis panduan belajar, dan catatan editorial bagi mereka yang telah berlangganan.
              </li>
              <li>
                <strong>Penghitungan Pembaca Anonim (*View Count*):</strong> Menghitung popularitas topik secara agregat guna memahami bidang ilmu apa yang paling diminati pembaca.
              </li>
              <li>
                <strong>Keamanan Platform:</strong> Mendeteksi dan mencegah serangan siber, upaya brute-force pada rute administrasi, dan penyalahgunaan formulir.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">4.</span>
              Penggunaan Cookie & Penyimpanan Lokal
            </h2>
            <p>
              Kami hanya menggunakan *essential cookies* dan token autentikasi aman (*HttpOnly JWT*) untuk keperluan login tim redaksi di panel CMS. Kami tidak menanamkan cookie pelacak lintas situs (*cross-site third-party tracking cookies*) yang memata-matai riwayat penjelajahan Anda di web lain.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">5.</span>
              Hak Pengguna Atas Datanya
            </h2>
            <p className="mb-2">Sebagai pembaca atau pelanggan buletin, Anda memiliki hak penuh untuk:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Berhenti Berlangganan (*Unsubscribe*):</strong> Anda dapat membatalkan langganan buletin kapan saja dengan satu klik tautan di footer email atau menghubungi kami.
              </li>
              <li>
                <strong>Penghapusan Data (*Right to Erasure*):</strong> Anda berhak meminta penghapusan permanen alamat surel Anda dari daftar basis data kami.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className="border-t border-slate-100 pt-6">
            <h2 className="font-heading font-bold text-lg text-brand-navy mb-3 flex items-center gap-2">
              <span className="text-brand-teal font-black text-sm">6.</span>
              Hubungi Tim Privasi
            </h2>
            <p>
              Jika Anda memiliki pertanyaan seputar cara kami mengelola data Anda, silakan hubungi tim kami melalui surel di{' '}
              <a href="mailto:privasi@zetaraz.org" className="text-brand-teal font-bold hover:underline">
                privasi@zetaraz.org
              </a>{' '}
              atau melalui halaman{' '}
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
