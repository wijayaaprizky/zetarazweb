import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Sparkles, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-400 text-sm border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-teal-500 flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md">
                Z
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-black text-2xl tracking-tight text-white">
                    ZETARAZ
                  </span>
                  <span className="font-heading font-bold text-base tracking-tight text-teal-400">
                    Knowledge
                  </span>
                </div>
                <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                  Berbagi Pengetahuan, Berbagi Pengalaman
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              ZETARAZ Knowledge adalah wadah independen untuk membaca, memahami, dan berbagi wawasan bermakna. Kami menghadirkan telaah terstruktur, catatan pengalaman lapangan, serta panduan praktis lintas disiplin ilmu yang mudah dipelajari oleh siapa saja.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-300">
              <span className="italic font-serif text-teal-300 font-medium">
                "Temukan Pengetahuan. Perluas Wawasan."
              </span>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:kontak@zetaraz.org" className="hover:text-white transition-colors">
                  kontak@zetaraz.org
                </a>
              </div>
            </div>
          </div>

          {/* Pillars / Categories (Col 3) */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Klasifikasi Artikel
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/pengetahuan" className="hover:text-white transition-colors">
                  Pengetahuan
                </Link>
              </li>
              <li>
                <Link href="/category/pengalaman" className="hover:text-white transition-colors">
                  Pengalaman
                </Link>
              </li>
              <li>
                <Link href="/category/opini" className="hover:text-white transition-colors">
                  Opini
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <Link href="/articles" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                  Semua Artikel →
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Directory (Col 4) */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Jelajahi & Direktori
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Layanan & Program
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  Semua Artikel
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Pencarian Topik
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal (Col 5) */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Bantuan & Regulasi Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Ketentuan Pengguna (Terms)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Kebijakan Privasi (Privacy)
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer (Penafian)
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  Pusat Bantuan (Support)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} ZETARAZ Knowledge. Berbagi Pengetahuan, Berbagi Pengalaman. Terbuka untuk semua pembelajar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-slate-400 text-xs">
            <Link href="/about" className="hover:text-white transition-colors">
              Tentang Kami
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Ketentuan
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
