import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Briefcase,
  Palette,
  Users,
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface ExploreCategoriesProps {
  categories: any[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  const getCategoryDetails = (slug: string) => {
    switch (slug) {
      case 'teknologi':
        return {
          icon: <Cpu className="w-6 h-6 text-blue-600" />,
          style: 'bg-blue-50/60 border-blue-100 hover:border-blue-300 hover:bg-blue-50/90',
          badgeStyle: 'bg-blue-100/80 text-blue-800',
          focus: 'Kecerdasan Buatan • Rekayasa Perangkat Lunak • Keamanan Siber',
        };
      case 'tata-kelola':
        return {
          icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
          style: 'bg-indigo-50/60 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/90',
          badgeStyle: 'bg-indigo-100/80 text-indigo-800',
          focus: 'Manajemen Proses (BPM) • Arsitektur Enterprise • Efisiensi Alur Kerja',
        };
      case 'hobby':
        return {
          icon: <Palette className="w-6 h-6 text-amber-600" />,
          style: 'bg-amber-50/60 border-amber-100 hover:border-amber-300 hover:bg-amber-50/90',
          badgeStyle: 'bg-amber-100/80 text-amber-800',
          focus: 'Fotografi Cerita • Jurnal Mandiri • Eksplorasi Minat Kreatif',
        };
      case 'sosial':
        return {
          icon: <Users className="w-6 h-6 text-teal-600" />,
          style: 'bg-teal-50/60 border-teal-100 hover:border-teal-300 hover:bg-teal-50/90',
          badgeStyle: 'bg-teal-100/80 text-teal-800',
          focus: 'Dinamika Komunitas • Literasi Informasi Publik • Dialog Terbuka',
        };
      default:
        return {
          icon: <BookOpen className="w-6 h-6 text-slate-600" />,
          style: 'bg-slate-50 border-slate-200 hover:border-slate-300',
          badgeStyle: 'bg-slate-100 text-slate-700',
          focus: 'Wawasan dan telaah multidisiplin',
        };
    }
  };

  return (
    <section id="kategori" className="py-16 bg-slate-50/80 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Klasifikasi Artikel</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-navy mt-1">
            4 Pilar Klasifikasi Pengetahuan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
            Setiap tulisan di ZETARAZ dikurasi secara terarah ke dalam 4 domain utama: dari inovasi teknologi dan efisiensi tata kelola sistem, hingga ruang relaksasi hobi dan dinamika sosial masyarakat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const details = getCategoryDetails(cat.slug);
            const articleCount = cat._count?.articles ?? 0;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${details.style}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                      {details.icon}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${details.badgeStyle}`}>
                      {articleCount} Artikel
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium mb-3 pt-3 border-t border-slate-200/60 leading-tight">
                    {details.focus}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-navy transition-colors">
                    <span>Jelajahi Kategori</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
