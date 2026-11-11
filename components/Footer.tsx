import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Globe, ArrowUpRight, Shield, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-400 text-sm border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-teal-500 flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md">
                Z
              </div>
              <div>
                <span className="font-heading font-black text-2xl tracking-tight text-white">
                  ZETARAZ
                </span>
                <span className="block text-[10px] text-teal-400 font-bold uppercase tracking-widest">
                  An Independent Knowledge Company
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              ZETARAZ merepresentasikan konvergensi pengetahuan, inteligensi, logika, dan penemuan. Kami membangun ekosistem manajemen pengetahuan terpadu untuk memandu transformasi institusi dan kemajuan intelektual masyarakat.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs text-slate-300">
              <span className="italic font-serif text-teal-400 font-medium">
                "Knowledge. Intelligence. Discovery."
              </span>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>contact@zetaraz.com</span>
              </div>
            </div>
          </div>

          {/* Pillars / Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Pilar Pengetahuan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/knowledge" className="hover:text-white transition-colors">
                  Knowledge Systems
                </Link>
              </li>
              <li>
                <Link href="/category/research" className="hover:text-white transition-colors">
                  Scientific Research & Labs
                </Link>
              </li>
              <li>
                <Link href="/category/technology" className="hover:text-white transition-colors">
                  Technology & AI
                </Link>
              </li>
              <li>
                <Link href="/category/business-management" className="hover:text-white transition-colors">
                  Business & Management (BPM)
                </Link>
              </li>
              <li>
                <Link href="/category/learning" className="hover:text-white transition-colors">
                  Continuous Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Resources */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Navigasi Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang ZETARAZ
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Pencarian Pengetahuan
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Sitemap XML
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-semibold">
                  <Shield className="w-3 h-3" /> KMS Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Legal */}
          <div>
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Prinsip & Legalitas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about#editorial-standards" className="hover:text-white transition-colors">
                  Standar Integritas Ilmiah
                </Link>
              </li>
              <li>
                <Link href="/about#peer-review" className="hover:text-white transition-colors">
                  Protokol Peninjauan Sejawat
                </Link>
              </li>
              <li>
                <Link href="/about#privacy-policy" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/about#terms-of-use" className="hover:text-white transition-colors">
                  Ketentuan Layanan
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
            © {new Date().getFullYear()} ZETARAZ. Hak Cipta Dilindungi Undang-Undang. Dibangun untuk ekosistem pengetahuan jangka panjang.
          </p>
          <div className="flex items-center space-x-6 text-slate-500 text-xs">
            <Link href="/about#privacy-policy" className="hover:text-slate-400 transition-colors">
              Privasi
            </Link>
            <Link href="/about#terms-of-use" className="hover:text-slate-400 transition-colors">
              Ketentuan
            </Link>
            <span className="text-slate-700">|</span>
            <span className="text-teal-500 font-mono text-[11px]">v1.0.0-production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
