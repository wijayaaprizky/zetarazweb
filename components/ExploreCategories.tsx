import React from 'react';
import Link from 'next/link';
import { BookOpen, FlaskConical, Cpu, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

interface ExploreCategoriesProps {
  categories: any[];
}

export default function ExploreCategories({ categories }: ExploreCategoriesProps) {
  // Mapping icons
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'knowledge':
        return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'research':
        return <FlaskConical className="w-6 h-6 text-teal-600" />;
      case 'technology':
        return <Cpu className="w-6 h-6 text-blue-600" />;
      case 'business-management':
        return <Briefcase className="w-6 h-6 text-indigo-600" />;
      case 'learning':
        return <GraduationCap className="w-6 h-6 text-cyan-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-teal-600" />;
    }
  };

  const getBgColor = (slug: string) => {
    switch (slug) {
      case 'knowledge':
        return 'bg-emerald-50 border-emerald-100 group-hover:border-emerald-300';
      case 'research':
        return 'bg-teal-50 border-teal-100 group-hover:border-teal-300';
      case 'technology':
        return 'bg-blue-50 border-blue-100 group-hover:border-blue-300';
      case 'business-management':
        return 'bg-indigo-50 border-indigo-100 group-hover:border-indigo-300';
      case 'learning':
        return 'bg-cyan-50 border-cyan-100 group-hover:border-cyan-300';
      default:
        return 'bg-slate-50 border-slate-100 group-hover:border-slate-300';
    }
  };

  return (
    <section className="py-12 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-brand-teal">
            Taksonomi Pengetahuan
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-navy mt-1">
            Eksplorasi Domain & Pilar Keilmuan
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Struktur pengetahuan ZETARAZ diorganisasi ke dalam 5 pilar disiplin untuk memfasilitasi penemuan dan pembelajaran mendalam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${getBgColor(
                cat.slug
              )}`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(cat.slug)}
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {cat.description || 'Eksplorasi artikel dan panduan terkait.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/50">
                <span className="text-slate-400 font-medium">
                  {cat._count?.articles || 0} Artikel
                </span>
                <span className="inline-flex items-center gap-1 group-hover:text-brand-blue group-hover:translate-x-1 transition-all">
                  Jelajahi <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
