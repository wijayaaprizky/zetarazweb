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

            <div className="pt-3 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>kontak@zetaraz.org</span>
              </div>
            </div>
          </div>

          {/* Pillars / Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Kategori Pengetahuan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/knowledge" className="hover:text-white transition-colors">
                  Knowledge
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/science-research" className="hover:text-white transition-colors">
                  Science & Research
                </Link>
              </li>
              <li>
                <Link href="/category/data-analytics" className="hover:text-white transition-colors">
                  Data & Analytics
                </Link>
              </li>
              <li>
                <Link href="/category/business-management" className="hover:text-white transition-colors">
                  Business & Management
                </Link>
              </li>
              <li>
                <Link href="/category/learning" className="hover:text-white transition-colors">
                  Learning & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Resources */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Jelajahi Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang ZETARAZ Knowledge
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Pencarian Topik
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Peta Situs (Sitemap)
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Information */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Nilai & Informasi
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about#visi-misi" className="hover:text-white transition-colors">
                  Semangat Berbagi Wawasan
                </Link>
              </li>
              <li>
                <Link href="/about#kredibilitas" className="hover:text-white transition-colors">
                  Kejujuran & Kredibilitas
                </Link>
              </li>
              <li>
                <Link href="/about#kebijakan-privasi" className="hover:text-white transition-colors">
                  Privasi Pembaca
                </Link>
              </li>
              <li>
                <Link href="/about#ketentuan" className="hover:text-white transition-colors">
                  Etika Pengetahuan Terbuka
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 py-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} ZETARAZ Knowledge. Berbagi Pengetahuan, Berbagi Pengalaman. Terbuka untuk semua pembelajar.
          </p>
          <div className="flex items-center space-x-6 text-slate-500 text-xs">
            <Link href="/about#kebijakan-privasi" className="hover:text-slate-400 transition-colors">
              Privasi
            </Link>
            <Link href="/about#ketentuan" className="hover:text-slate-400 transition-colors">
              Ketentuan
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-teal-400 font-medium">Inisiatif Pengetahuan Terbuka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
