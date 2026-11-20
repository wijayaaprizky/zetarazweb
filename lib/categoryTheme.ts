/**
 * Identitas warna per kategori.
 *
 * Warna di sini membawa informasi: pembaca belajar bahwa biru = Pengetahuan,
 * hijau-teal = Pengalaman, koral = Opini. Semua nilai ditulis sebagai string
 * utuh (bukan disusun dengan template) supaya Tailwind bisa mendeteksinya;
 * karena itu folder lib/ ikut dipindai di tailwind.config.ts.
 */
export interface CategoryTheme {
  /** Label kecil berisi nama kategori (latar lembut + teks gelap). */
  chip: string;
  /** Warna teks aksen. */
  text: string;
  /** Titik kecil penanda kategori. */
  dot: string;
  /** Garis/pita gradasi tipis. */
  bar: string;
  /** Warna judul saat disorot (pakai di dalam elemen `group`). */
  hoverTitle: string;
  /** Warna tautan "Baca". */
  link: string;
  /** Angka peringkat. */
  numeral: string;
  /** Tab filter aktif. */
  tabActive: string;
  /** Garis atas kartu. */
  borderTop: string;
  /** Warna cahaya lembut di latar gelap (rgba). */
  glow: string;
}

const THEMES: Record<string, CategoryTheme> = {
  pengetahuan: {
    chip: 'bg-kn-50 text-kn-700 ring-1 ring-inset ring-kn-200',
    text: 'text-kn-700',
    dot: 'bg-kn-500',
    bar: 'bg-gradient-to-r from-kn-600 via-kn-500 to-kn-300',
    hoverTitle: 'group-hover:text-kn-700',
    link: 'text-kn-700 hover:text-kn-900',
    numeral: 'text-kn-300 group-hover:text-kn-600',
    tabActive: 'bg-kn-100 text-kn-800 ring-kn-300',
    borderTop: 'border-t-kn-500',
    glow: 'rgba(75,174,157,0.34)',
  },
  pengalaman: {
    chip: 'bg-ex-50 text-ex-700 ring-1 ring-inset ring-ex-200',
    text: 'text-ex-700',
    dot: 'bg-ex-500',
    bar: 'bg-gradient-to-r from-ex-600 via-ex-500 to-ex-300',
    hoverTitle: 'group-hover:text-ex-700',
    link: 'text-ex-700 hover:text-ex-900',
    numeral: 'text-ex-300 group-hover:text-ex-600',
    tabActive: 'bg-ex-100 text-ex-800 ring-ex-300',
    borderTop: 'border-t-ex-500',
    glow: 'rgba(167,201,181,0.30)',
  },
  opini: {
    chip: 'bg-op-50 text-op-700 ring-1 ring-inset ring-op-200',
    text: 'text-op-700',
    dot: 'bg-op-500',
    bar: 'bg-gradient-to-r from-op-600 via-op-500 to-op-300',
    hoverTitle: 'group-hover:text-op-700',
    link: 'text-op-700 hover:text-op-900',
    numeral: 'text-op-300 group-hover:text-op-600',
    tabActive: 'bg-op-100 text-op-800 ring-op-300',
    borderTop: 'border-t-op-500',
    glow: 'rgba(232,182,108,0.28)',
  },
};

const FALLBACK: CategoryTheme = {
  chip: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200',
  text: 'text-slate-700',
  dot: 'bg-slate-400',
  bar: 'bg-gradient-to-r from-slate-700 to-slate-400',
  hoverTitle: 'group-hover:text-slate-950',
  link: 'text-slate-700 hover:text-slate-950',
  numeral: 'text-slate-300 group-hover:text-slate-600',
  tabActive: 'bg-slate-900 text-white ring-slate-900',
  borderTop: 'border-t-slate-400',
  glow: 'rgba(141,153,150,0.26)',
};

export function getCategoryTheme(slug?: string | null): CategoryTheme {
  return (slug && THEMES[slug]) || FALLBACK;
}
