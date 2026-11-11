# ZETARAZ — Independent Knowledge Management Platform (KMS)
> *"Knowledge. Intelligence. Discovery."*

Platform repositori manajemen pengetahuan (*Knowledge Management System* / KMS) dan portal wawasan intelektual modern yang dirancang untuk skala jangka panjang institusi riset, edukasi, dan konsultasi independen.

---

## 1. Arsitektur & Filosofi Sistem

ZETARAZ menggabungkan pengalaman penemuan konten editorial terkemuka (*editorial news portal discovery*) dengan kapabilitas pengorganisasian taksonomi dari platform pembelajaran modern.

### Pilar Domain Pengetahuan Utama:
1. **Knowledge:** Manajemen pengetahuan terstruktur, SECI model, arsitektur kognitif, sains informasi.
2. **Research:** Metodologi penelitian ilmiah empiris, laboratorium, analisis literatur sistematis, falsifiability.
3. **Technology:** Kecerdasan buatan, model bahasa besar (LLM), sains data, keamanan siber (Zero Trust).
4. **Business & Management:** Business Process Management (BPMN 2.0), Arsitektur Enterprise (TOGAF ADM), tata kelola adaptif.
5. **Learning:** Panduan praktis, studi kasus terapan, kurikulum mandiri, budaya *continuous learning*.

---

## 2. Tumpukan Teknologi (Tech Stack)

* **Kerangka Kerja (Framework):** [Next.js 14 (App Router)](https://nextjs.org/) dengan Server-Side Rendering (SSR) & Static Site Generation (SSG).
* **Bahasa:** [TypeScript 5](https://www.typescriptlang.org/) dengan *strict type safety*.
* **Sistem Desain (UI/UX):** [Tailwind CSS](https://tailwindcss.com/) dengan skema warna kurasi editorial:
  - **Midnight Navy:** `#14243A`
  - **Deep Blue:** `#1D4ED8`
  - **Fresh Teal:** `#0F9D8A`
  - **Light Surface:** `#F5F8FC`
  - **Dark Charcoal:** `#202938`
* **Basis Data & ORM:** [Prisma ORM 5](https://www.prisma.io/) dengan SQLite untuk *zero-dependency* lokal, 100% siap ditransisikan ke PostgreSQL.
* **Autentikasi & Keamanan:** JWT HttpOnly Cookies, enkripsi sandi dengan `bcryptjs`.
* **Ikonografi:** [Lucide React](https://lucide.dev/).

---

## 3. Fitur Utama Platform

### A. Pengalaman Publik (Public Experience)
* **Editorial Hero Section:** Menyorot satu artikel telaah utama secara dominan dengan gambar resolusi tinggi dan 2–3 artikel pendukung.
* **Latest Knowledge Grid:** Umpan publikasi bergaya majalah berita modern dengan label domain, ringkasan, penulis, estimasi waktu baca, dan tanggal publikasi.
* **Explore Categories:** Kartu visual interaktif untuk 5 pilar disiplin ilmu dengan ikon tematik.
* **Research & Insights:** Bagian khusus berlatar gelap elegan untuk kajian saintifik dan bukti empiris.
* **Popular / Most Read:** Diurutkan secara otentik berdasarkan metrik hitungan pembaca aktual (`viewCount`), bukan data acak palsu.
* **Interactive Reading Experience:**
  - *Reading Progress Bar* waktu nyata di bagian atas layar.
  - *Table of Contents (Daftar Isi)* dinamis yang di-generate otomatis dari heading Markdown dengan *active scroll highlighting*.
  - Pemformatan Markdown lengkap: tabel perbandingan, diagram ASCII, blok kode, kutipan (*blockquote*), dan rujukan literatur.
  - Tombol berbagi (*Share to X, LinkedIn, WhatsApp, Salin Tautan*).
  - Penambahan otomatis jumlah pembaca (`POST /api/articles/[id]/view`).
* **Sistem Pencarian Cerdas:**
  - Pencarian lintas judul, cuplikan, isi konten, kategori, dan tag.
  - *Keyword highlighting* pada kata kunci yang cocok.
  - Filter kategori, tipe konten (Editorial, Riset, Tutorial, Analisis), dan pengurutan relevansi.
  - Saran topik penelusuran jika tidak ada hasil.
  - *Shortcut keyboard* `Ctrl+K` / `Cmd+K`.
* **Buletin Intelijen ZETARAZ:** Form pendaftaran email dengan validasi regex, deteksi duplikasi, dan penyimpanan ke tabel `NewsletterSubscriber`.

### B. Konsol Manajemen Pengetahuan (KMS Admin Dashboard)
* **Akses Terproteksi:** Autentikasi administrator melalui `/admin/login` dengan sesi JWT terenkripsi.
* **Ringkasan Analisis:** Dasbor metrik total artikel, pembaca, domain kategori, dan draf.
* **Manajemen Artikel:**
  - Tabel filter status (*Published* vs *Draft*) dan kategori.
  - Alur Simpan Draf dan Publikasikan (konten draf **tidak pernah** terekspos ke publik).
  - Penghapusan aman dengan dialog modal konfirmasi.
  - Pemilihan status *Featured* untuk tampil di Hero utama.
* **Editor Markdown Visual:**
  - Bilah alat pemformatan cepat (H2, H3, Blockquote, Code Block, Table, List).
  - Tab *Pratinjau Langsung (Live Preview)* berdampingan sebelum publikasi.
  - Preset gambar editorial berkualitas tinggi.
  - Konfigurasi SEO mandiri (SEO Title, Meta Description, Canonical URL).
* **Manajemen Kategori:** Tambah kategori baru dengan slug otomatis dan deskripsi.
* **Manajemen Pelanggan Buletin:** Pantau daftar pelanggan terdaftar.

---

## 4. Kredensial Administrator Default

Untuk masuk ke konsol KMS di `http://localhost:3000/admin`:

* **URL Login:** `http://localhost:3000/admin/login`
* **Email:** `admin@zetaraz.com`
* **Password:** `ZetarazAdmin2026!`
* **Peran:** `ADMIN` (Dr. Aris Sudarsono - Principal Knowledge Architect)

---

## 5. Konfigurasi Lingkungan (`.env`)

File `.env.example` telah disediakan:

```env
# Koneksi Basis Data (SQLite untuk lokal, atau postgresql://user:pass@host:5432/zetaraz)
DATABASE_URL="file:./dev.db"

# Kunci Rahasia JWT & Sesi Administrator (Minimal 32 karakter unik untuk produksi)
JWT_SECRET="zetaraz-production-secure-jwt-key-2026-kms-platform"
ADMIN_EMAIL="admin@zetaraz.com"
ADMIN_PASSWORD="ZetarazAdmin2026!"

# URL Situs Publik (untuk metadata SEO dan sitemap)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 6. Panduan Menjalankan Aplikasi

### Persyaratan:
- Node.js versi 18+ atau 20+ (Telah terpasang versi v20.18.0 LTS).
- npm atau pnpm.

### Menjalankan Mode Development:
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

### Menjalankan Mode Produksi (Telah Dikompilasi):
```bash
npm run build
npm run start
```

### Melakukan Migrasi dan Seeding Basis Data Ulang:
```bash
npm run db:push
npm run db:seed
```

---

## 7. Implementasi SEO Teknis & Metadata

1. **Meta Tag Komprehensif:** Setiap artikel menghasilkan judul dan deskripsi unik, kanonikal URL, OpenGraph (*og:title*, *og:description*, *og:image*, *og:type="article"*), dan Twitter Cards.
2. **Data Terstruktur JSON-LD:**
   - Skema `Organization` dan `WebSite` pada layout global.
   - Skema `Article` dan `BreadcrumbList` pada setiap halaman artikel.
3. **Sitemap XML Dinamis:** Tersedia di `/sitemap.xml` yang mengindeks otomatis seluruh halaman statis, kategori, dan artikel berstatus `PUBLISHED`.
4. **Robots.txt:** Tersedia di `/robots.txt` dengan instruksi `Allow: /` dan `Disallow: /admin/` serta `Disallow: /api/`.
5. **Performa & Aksesibilitas:**
   - HTML semantik (`<header>`, `<main>`, `<article>`, `<nav>`, `<footer>`).
   - Rasio kontras warna standar WCAG AA.
   - Atribut gambar alt deskriptif.

---

## 8. Laporan Uji Kualitas (QA Suite)

Pengujian otomatis E2E telah dijalankan melalui skrip pengujian `node scripts/test-all-journeys.js`:

```
=== HASIL PENGUJIAN END-TO-END ZETARAZ ===
[PASS] 1. Homepage loads (Status 200 & Title present)
[PASS] 2. About page loads (Status 200 & Editorial standards)
[PASS] 3. Category page loads (Knowledge category)
[PASS] 4. Article detail page loads & metadata present
[PASS] 5. Search API functional (/api/search?q=KMS)
[PASS] 6. Real View Counter API increments view count
[PASS] 7. Newsletter subscription endpoint stores subscriber
[PASS] 8. Admin login authentication issues secure token cookie
[PASS] 9. Admin article creation (Save draft)
[PASS] 10. Admin article update (Transition from DRAFT to PUBLISHED)
[PASS] 11. Admin article deletion with authorization check
[PASS] 12. Technical SEO: sitemap.xml renders valid XML
[PASS] 13. Technical SEO: robots.txt disallows admin & allows sitemap

Total Pengujian: 13 | Lulus: 13 | Gagal: 0
Hasil: 100% LULUS
```

---

## 9. Rencana Pengembangan Masa Depan (Roadmap)

1. **Dukungan Multi-bahasa (i18n):** Arsitektur skema telah dipersiapkan untuk penambahan kolom `locale` ('id' / 'en') dan integrasi `next-intl`.
2. **Integrasi Provider Email Marketing:** Mengarahkan `app/api/newsletter/route.ts` ke penyedia seperti Resend, Mailchimp, atau Sendgrid jika kunci API telah ditambahkan.
3. **Penyimpanan Berkas Media Cloud:** Mendukung S3 / Google Cloud Storage untuk pengunggahan gambar lokal di samping URL presisi saat ini.
