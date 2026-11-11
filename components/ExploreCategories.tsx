import React from 'react';
import Link from 'next/link';
import { BookOpen, Cpu, FlaskConical, BarChart3, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

interface ExploreCategoriesProps {
  categories: any[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'knowledge':
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'technology':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'science-research':
        return <FlaskConical className="w-6 h-6 text-teal-600" />;
      case 'data-analytics':
        return <BarChart3 className="w-6 h-6 text-cyan-600" />;
      case 'business-management':
        return <Briefcase className="w-6 h-6 text-indigo-600" />;
      case 'learning':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-teal-600" />;
    }
  };

  const getCardStyle = (slug: string) => {
    switch (slug) {
      case 'knowledge':
        return 'bg-emerald-50/70 border-emerald-100 hover:border-emerald-300';
      case 'technology':
        return 'bg-blue-50/70 border-blue-100 hover:border-blue-300';
      case 'science-research':
        return 'bg-teal-50/70 border-teal-100 hover:border-teal-300';
      case 'data-analytics':
        return 'bg-cyan-50/70 border-cyan-100 hover:border-cyan-300';
      case 'business-management':
        return 'bg-indigo-50/70 border-indigo-100 hover:border-indigo-300';
      case 'learning':
        return 'bg-amber-50/70 border-amber-100 hover:border-amber-300';
      default:
        return 'bg-slate-50 border-slate-100 hover:border-slate-300';
    }
  };

  return (
    <section className="py-12 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
            Kategori Pengetahuan
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
            Jelajahi Berbagai Bidang & Disiplin
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Temukan topik yang menarik rasa ingin tahu Anda—mulai dari dasar sains, eksplorasi teknologi, analitika data, hingga manajemen dan panduan praktis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${getCardStyle(
                cat.slug
              )}`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {getIcon(cat.slug)}
                </div>
                <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-brand-blue transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {cat.description || 'Eksplorasi wawasan dan artikel terkait.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 pt-2 border-t border-slate-200/50">
                <span className="text-slate-400 font-medium">
                  {cat._count?.articles || 0} Artikel
                </span>
                <span className="inline-flex items-center gap-0.5 text-brand-teal group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all">
                  Buka <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
