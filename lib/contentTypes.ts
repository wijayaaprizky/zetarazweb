/**
 * Satu sumber kebenaran untuk "tipe konten" (format tulisan).
 *
 * Sebelumnya setiap halaman memakai daftar sendiri-sendiri
 * (EDITORIAL/RESEARCH/ANALYSIS vs KNOWLEDGE/EXPERIENCE/PERSPECTIVE) sehingga
 * filter sering kosong dan label tampil sebagai kode bahasa Inggris mentah.
 *
 * Kode (kunci) disimpan apa adanya di database; hanya label tampilan yang
 * diterjemahkan. Untuk menambah tipe baru cukup tambahkan satu baris di sini.
 */
export const CONTENT_TYPE_LABELS: Record<string, string> = {
  KNOWLEDGE: 'Wawasan',
  EXPERIENCE: 'Kisah Praktik',
  TUTORIAL: 'Panduan',
  EDITORIAL: 'Editorial',
  RESEARCH: 'Riset',
  ANALYSIS: 'Analisis',
  PERSPECTIVE: 'Perspektif',
};

/** Urutan tampil yang diinginkan saat menampilkan filter. */
export const CONTENT_TYPE_ORDER = Object.keys(CONTENT_TYPE_LABELS);

/** Label ramah-pembaca untuk sebuah kode tipe konten. */
export function contentTypeLabel(type: string | null | undefined): string {
  if (!type) return '';
  const key = type.toUpperCase();
  return CONTENT_TYPE_LABELS[key] ?? type.charAt(0) + type.slice(1).toLowerCase();
}

/** Urutkan daftar kode tipe sesuai CONTENT_TYPE_ORDER (yang tak dikenal di akhir). */
export function sortContentTypes(types: string[]): string[] {
  const rank = (t: string) => {
    const i = CONTENT_TYPE_ORDER.indexOf(t.toUpperCase());
    return i === -1 ? CONTENT_TYPE_ORDER.length : i;
  };
  return [...types].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
}
