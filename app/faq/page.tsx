import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalUrl } from '@/lib/siteConfig';
import {
  HelpCircle,
  BookOpen,
  Send,
  ShieldCheck,
  FileText,
  Mail,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — ZETARAZ Knowledge',
  description:
    'Pertanyaan yang sering diajukan mengenai ZETARAZ Knowledge, tujuan platform, kurasi naskah, panduan kontribusi, dan lisensi konten.',
  alternates: {
    canonical: getCanonicalUrl('/faq'),
  },
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: 'Tentang ZETARAZ Knowledge',
      icon: BookOpen,
      questions: [
        {
          q: 'Apa itu ZETARAZ Knowledge?',
          a: 'ZETARAZ Knowledge adalah platform berbagi pengetahuan dan pengalaman mandiri yang menyajikan telaah konseptual, panduan praktis, dan catatan pengalaman lapangan lintas disiplin ilmu—mulai dari dasar sains, analitika data, keamanan teknologi, hingga manajemen proses kerja.',
        },
        {
          q: 'Apakah semua konten di ZETARAZ Knowledge dapat diakses secara gratis?',
          a: 'Ya, seluruh artikel, kajian, dan panduan belajar di ZETARAZ Knowledge dapat dibaca dan dipelajari secara 100% gratis oleh siapa saja tanpa biaya langganan berbayar (paywall).',
        },
        {
          q: 'Siapa yang mengelola platform ini?',
          a: 'ZETARAZ Knowledge diinisiasi dan dikuratori oleh tim redaksi mandiri yang dipimpin oleh Rizky Aditya Pratama Wijaya bersama para kontributor independen yang memiliki kepedulian terhadap literasi digital dan keterbukaan akses wawasan.',
        },
      ],
    },
    {
      category: 'Kredibilitas & Kurasi Editorial',
      icon: ShieldCheck,
      questions: [
        {
          q: 'Bagaimana ZETARAZ memastikan akurasi isi tulisan?',
          a: 'Setiap naskah melalui proses kurasi editorial: pengecekan rujukan literatur primer untuk topik saintifik, validasi alur logika, serta kejujuran dalam membedakan antara data empiris dan opini atau refleksi subjektif penulis.',
        },
        {
          q: 'Bagaimana jika saya menemukan kesalahan ketik atau data yang kurang tepat?',
          a: 'Kami sangat menghargai masukan pembaca. Anda dapat mengirimkan laporan perbaikan melalui halaman Kontak atau email ke kontak@zetaraz.org. Tim redaksi akan menelaah dan mencantumkan riwayat revisi naskah secara transparan.',
        },
      ],
    },
    {
      category: 'Kontribusi & Pengiriman Naskah',
      icon: Send,
      questions: [
        {
          q: 'Apakah masyarakat umum dapat mengirimkan naskah atau catatan pengalaman?',
          a: 'Tentu. ZETARAZ Knowledge mengusung semangat "Berbagi Pengetahuan, Berbagi Pengalaman". Siapa pun yang memiliki wawasan berharga, studi kasus nyata, atau tutorial mendalam dipersilakan mengajukan draf untuk dikurasi oleh tim redaksi.',
        },
        {
          q: 'Format apa yang digunakan untuk mengirimkan draf?',
          a: 'Kami memanfaatkan alur kerja kolaboratif melalui Google Docs. Penulis dapat menyusun naskah di Google Docs dan membagikan tautannya kepada redaksi untuk disinkronkan langsung ke platform CMS ZETARAZ.',
        },
      ],
    },
    {
      category: 'Hak Cipta, Sitasi & Pengutipan',
      icon: FileText,
      questions: [
        {
          q: 'Apakah saya boleh mengutip artikel ZETARAZ untuk tugas akhir atau makalah riset?',
          a: 'Boleh. Anda bebas mengutip isi tulisan untuk keperluan akademis, pendidikan, dan pengembangan diri, dengan kewajiban mencantumkan nama penulis dan tautan sumber artikel ZETARAZ Knowledge secara wajar.',
        },
        {
          q: 'Bolehkah materi ZETARAZ dipublikasikan ulang secara komersial?',
          a: 'Publikasi ulang seluruh naskah secara komersial tanpa izin tertulis dari redaksi dan penulis dilarang. Pengutipan sebagian naskah (fair use) untuk ulasan atau referensi diperbolehkan dengan atribusi penuh.',
        },
      ],
    },
    {
      category: 'Buletin & Privasi Pembaca',
      icon: Mail,
      questions: [
        {
          q: 'Apa keuntungan berlangganan buletin email ZETARAZ?',
          a: 'Anda akan menerima kurasi ringkasan wawasan terpilih, panduan baru, dan rilisan artikel terpenting langsung ke kotak masuk surel Anda tanpa spam iklan yang mengganggu.',
        },
        {
          q: 'Bagaimana ZETARAZ menjaga privasi data alamat email saya?',
          a: 'Kami mematuhi Kebijakan Privasi yang ketat. Alamat email Anda disimpan dengan aman hanya untuk pengiriman buletin dan tidak pernah diperjualbelikan kepada pihak ketiga mana pun.',
        },
      ],
    },
  ];

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
            <span className="font-semibold text-slate-800">FAQ</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark to-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-950 text-teal-400 border border-teal-800 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FAQ</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            Jawaban lengkap atas pertanyaan yang paling sering diajukan seputar inisiatif ZETARAZ Knowledge, cara berkontribusi, etika pengutipan, dan kebijakan editorial.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {faqCategories.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-brand-teal flex items-center justify-center border border-teal-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="font-heading font-bold text-xl text-brand-navy">
                  {group.category}
                </h2>
              </div>

              <div className="space-y-6">
                {group.questions.map((item, qIdx) => (
                  <div key={qIdx} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-2 flex items-start gap-2">
                      <span className="text-brand-teal font-black text-sm mt-0.5">Q:</span>
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-br from-teal-50 to-slate-100 rounded-2xl p-8 border border-teal-200 text-center">
          <div className="inline-flex items-center gap-2 text-brand-teal text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Belum Menemukan Jawaban Anda?</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-brand-navy mb-2">
            Punya Pertanyaan Khusus atau Ingin Berdiskusi?
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            Tim redaksi kami siap membantu menjawab pertanyaan Anda terkait naskah, kemitraan, atau kendala akses situs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-brand-blue text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <span>Hubungi Redaksi ZETARAZ</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
