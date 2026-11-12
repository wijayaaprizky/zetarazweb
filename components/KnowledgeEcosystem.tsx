import React from 'react';
import Link from 'next/link';
import {
  FileEdit,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
} from 'lucide-react';

export default function KnowledgeEcosystem() {
  const steps = [
    {
      num: '01',
      title: 'Pengalaman Nyata ke Gagasan Terstruktur',
      desc: 'Berangkat dari masalah lapangan, kegagalan yang dipelajari, atau konsep rumit yang berhasil disederhanakan oleh para praktisi dan peneliti.',
      icon: FileEdit,
      tag: 'Tacit to Explicit',
    },
    {
      num: '02',
      title: 'Kurasi & Validasi Redaksi Terbuka',
      desc: 'Penyelarasan alur logika, pengujian rujukan primer, serta pemisahan tegas antara fakta empiris dan opini pribadi demi menjaga kejujuran intelektual.',
      icon: ShieldCheck,
      tag: 'Rigorous Verification',
    },
    {
      num: '03',
      title: 'Publikasi di Repositori Terbuka',
      desc: 'Wawasan disimpan ke dalam 6 domain ilmu digital ZETARAZ yang terindeks, mudah dicari, dan bebas dibaca tanpa sekat biaya (*zero paywall*).',
      icon: Globe2,
      tag: 'Open Access for All',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Ekosistem Berbagi Wawasan</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-brand-navy mt-1">
            Bagaimana Kami Merawat Pengetahuan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
            Pengetahuan yang disimpan sendiri akan menguap. Kami membangun alur yang mempermudah pengalaman berharga menjadi aset literasi kolektif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-7 border border-slate-200/80 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-brand-teal group-hover:bg-brand-navy group-hover:text-teal-300 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-2xl text-slate-300 group-hover:text-teal-500 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full inline-block mb-2.5">
                    {step.tag}
                  </span>

                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2.5 group-hover:text-brand-blue transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom invitation card */}
        <div className="mt-12 bg-gradient-to-r from-brand-navy via-slate-900 to-brand-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center shrink-0 border border-teal-800/80">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                Punya Catatan Pengalaman Lapangan atau Hasil Kajian?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Redaksi ZETARAZ menyambut naskah tulisan dari praktisi, peneliti, dan pengajar di seluruh Indonesia.
              </p>
            </div>
          </div>

          <Link
            href="/contact?topic=submission"
            className="shrink-0 px-5 py-2.5 bg-brand-teal hover:bg-teal-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <span>Kirim Naskah Pengalaman</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
