import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Cpu,
  FlaskConical,
  BarChart3,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Layers,
} from 'lucide-react';

interface ExploreCategoriesProps {
  categories: any[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  const getCategoryDetails = (slug: string) => {
    switch (slug) {
      case 'knowledge':
        return {
          icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
          style: 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-300',
          focus: 'Literasi Kognitif • Tacit Knowledge • Organisasi Informasi',
        };
      case 'technology':
        return {
          icon: <Cpu className="w-6 h-6 text-blue-600" />,
          style: 'bg-blue-50/70 border-blue-100 hover:border-blue-300',
          focus: 'Kecerdasan Buatan • Arsitektur Cloud • Keamanan Siber',
        };
      case 'science-research':
        return {
          icon: <FlaskConical className="w-6 h-6 text-teal-600" />,
          style: 'bg-teal-50/70 border-teal-100 hover:border-teal-300',
          focus: 'Metodologi Saintifik • Ulasan Bukti • Penalaran Kritis',
        };
      case 'data-analytics':
        return {
          icon: <BarChart3 className="w-6 h-6 text-cyan-600" />,
          style: 'bg-cyan-50/70 border-cyan-100 hover:border-cyan-300',
          focus: 'Sains Data • Visualisasi Grafik • Statistik Terapan',
        };
      case 'business-management':
        return {
          icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
          style: 'bg-indigo-50/70 border-indigo-100 hover:border-indigo-300',
          focus: 'Manajemen Proses (BPM) • Arsitektur Enterprise • Operasional',
        };
      case 'learning':
        return {
          icon: <GraduationCap className="w-6 h-6 text-amber-600" />,
          style: 'bg-amber-50/70 border-amber-100 hover:border-amber-300',
          focus: 'Tutorial Bertahap • Catatan Pengalaman • Panduan Mandiri',
        };
      default:
        return {
          icon: <BookOpen className="w-6 h-6 text-teal-600" />,
          style: 'bg-slate-50 border-slate-100 hover:border-slate-300',
          focus: 'Wawasan dan telaah multidisiplin',
        };
    }
  };

  return (
    <section id="pilar" className="py-16 bg-slate-50/80 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Pilar Pengetahuan Utama</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-navy mt-1">
            Jelajahi 6 Domain Disiplin Ilmu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
            Struktur kurasi ZETARAZ Knowledge dirancang untuk memadukan penalaran saintifik, pemanfaatan teknologi, analitika data, serta praktik manajemen proses kerja nyata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const details = getCategoryDetails(cat.slug);
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between ${details.style}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {details.icon}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {cat.description || 'Eksplorasi wawasan dan artikel terkait.'}
                  </p>

                  <div className="text-[11px] font-semibold text-slate-500 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200/50 mb-4 leading-tight">
                    <span className="text-brand-teal font-bold mr-1">Fokus:</span>
                    <span>{details.focus}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-3 border-t border-slate-200/60">
                  <span className="text-slate-500 font-medium text-[11px]">
                    {cat._count?.articles || 0} Terbitan Aktif
                  </span>
                  <span className="inline-flex items-center gap-1 text-brand-teal group-hover:text-brand-blue group-hover:translate-x-1 transition-all">
                    Buka Domain <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
