# ZETARAZ Knowledge
> *"Berbagi Pengetahuan, Berbagi Pengalaman."*  
> *"Temukan Pengetahuan. Perluas Wawasan."*

**ZETARAZ Knowledge** adalah platform independen berbagi pengetahuan yang menyajikan informasi, wawasan, pengalaman praktis, panduan langkah-demi-langkah (tutorial), dan konten edukatif lintas disiplin ilmu.

---

## 1. Posisi & Identitas Platform

ZETARAZ Knowledge dirancang dengan positioning yang tegas:
- **BUKAN Blog Pribadi / Jurnal Harian:** Tidak berisi catatan kegiatan personal atau opini tanpa konteks.
- **BUKAN Situs Korporat / Konsultan Komersial:** Tidak memasarkan jasa komersial atau ambisi korporasi pada antarmuka publik.
- **BUKAN Produk KMS Publik yang Dijual:** Seluruh kapabilitas manajemen konten dan administrasi disimpan rapat dan privat khusus administrator pengelola.
- **ADALAH Wadah Berbagi Pengetahuan Terbuka:** Portal informasi dan pengetahuan digital independen dengan kurasi editorial bermutu tinggi, memprioritaskan kemudahan menemukan informasi (*content discovery*), kenyamanan membaca (*reading experience*), dan pembelajaran praktis.

### Atribut Brand:
- **Knowledge-driven:** Berbasis pengetahuan mendalam dan rujukan kredibel.
- **Inclusive & Accessible:** Disajikan tanpa jargon elitis agar nyaman dipelajari siapa saja.
- **Credible & Informative:** Menjunjung kejujuran intelektual, pemisahan fakta dan opini.
- **Modern & Practical:** Menghubungkan telaah konseptual dengan studi kasus nyata dan panduan terapan.
- **Independent:** Mandiri dan objektif.

---

## 2. Navigasi Publik (Public Navigation)

Struktur navigasi utama dirancang jernih dan intuitif untuk eksplorasi pengetahuan:

1. **Home (`/`):** Portal editorial beranda yang memuat *Featured Stories*, *Latest Knowledge Feed*, *Popular Articles* (berdasarkan metrik pembaca riil), *Explore Categories*, *Research & Insights*, dan *Recommended Learning*.
2. **Knowledge (`/category/knowledge`):** Fondasi manajemen pengetahuan, organisasi informasi, dan literasi kognitif.
3. **Technology (`/category/technology`):** Kecerdasan buatan, arsitektur perangkat lunak, dan keamanan digital.
4. **Science & Research (`/category/science-research`):** Metodologi riset empiris, telaah ilmiah, dan pembuktian berbasis data.
5. **Data & Analytics (`/category/data-analytics`):** *Modern data stack*, analitika prediktif, pemodelan data, dan *business intelligence*.
6. **Business & Management (`/category/business-management`):** Arsitektur enterprise, tata kelola proses bisnis, dan strategi operasional.
7. **Learning (`/category/learning`):** Tutorial praktis, studi kasus lapangan, panduan teknis, dan sumber belajar mandiri.
8. **About (`/about`):** Pengenalan nilai, etika keterbukaan, kredibilitas editorial, dan komitmen privasi.

Disertai fitur **Pencarian Cerdas (`/search` & modal `Ctrl+K`)** untuk penelusuran kata kunci instan dengan *query highlighting*.

---

## 3. Tumpukan Teknologi (Tech Stack)

* **Framework:** [Next.js 14 (App Router)](https://nextjs.org/) dengan SSR, SSG, dan Metadata API.
* **Bahasa:** [TypeScript 5](https://www.typescriptlang.org/) dengan *strict type safety*.
* **Styling & Desain UI:** [Tailwind CSS](https://tailwindcss.com/) dengan palet editorial modern:
  - **Midnight Navy:** `#14243A`
  - **Deep Blue:** `#1D4ED8`
  - **Fresh Teal:** `#0F9D8A`
  - **Light Background:** `#F5F8FC`
  - **Charcoal Text:** `#202938`
* **Basis Data & ORM:** [Prisma ORM 5](https://www.prisma.io/) dengan SQLite (`prisma/dev.db`), mudah dimigrasikan ke PostgreSQL/MySQL.
* **Autentikasi & Keamanan:** JSON Web Tokens (JWT) dalam HttpOnly Cookie, hashing sandi `bcryptjs`.
* **Ikonografi:** [Lucide React](https://lucide.dev/).

---

## 4. Pengelolaan Konten Privat (Private CMS / KMS)

Seluruh fungsionalitas manajemen konten bersifat privat dan terlindungi, hanya dapat diakses oleh administrator terautentikasi melalui `/admin/login`:

* **URL Login:** `http://localhost:3000/admin/login`
* **Email:** `admin@zetaraz.com`
* **Password:** `ZetarazAdmin2026!`
* **Profil Pengelola:** **Rizky Aditya Pratama Wijaya** (Penulis & Administrator)

### Fitur Dasbor Admin:
1. **Ringkasan Metrik:** Jumlah artikel terbit, draf, akumulasi pembaca (*views*), kategori, dan pelanggan buletin.
2. **Editor Artikel:** Editor Markdown interaktif dengan *Live Preview* berdampingan, format heading, tabel, kutipan, blok kode, preset gambar, serta konfigurasi SEO (Title, Description, Canonical).
3. **Alur Status:** Pengaturan status DRAFT vs PUBLISHED (artikel draf terisolasi total dari publik).
4. **Manajemen Kategori:** Penambahan dan pengelolaan kategori pengetahuan.
5. **Daftar Pembaca Buletin:** Pengelolaan data email pembaca terdaftar.

---

## 5. Konfigurasi Lingkungan (`.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="zetaraz-production-secure-jwt-key-2026-kms-platform"
ADMIN_EMAIL="admin@zetaraz.com"
ADMIN_PASSWORD="ZetarazAdmin2026!"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 6. Panduan Menjalankan Aplikasi

### Persyaratan:
- Node.js versi 18+ atau 20+ (Tersedia Node.js v20.18.0 LTS).
- npm atau pnpm.

### Menjalankan Mode Development:
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

### Menjalankan Mode Produksi:
```bash
npm run build
npm run start
```

### Reset & Seeding Basis Data:
```bash
npm run db:push
npm run db:seed
```

---

## 7. Optimasi Mesin Pencari (SEO) & Aksesibilitas

1. **Metadata Dinamis:** Menghasilkan title, meta description, canonical URL, Open Graph, dan Twitter Cards spesifik per artikel.
2. **Data Terstruktur (JSON-LD):**
   - Skema `WebSite` pada layout global.
   - Skema `Article` dan `BreadcrumbList` pada setiap detail artikel.
3. **Sitemap XML Otomatis:** Tersedia di `/sitemap.xml` memetakan seluruh halaman statis, kategori, dan artikel `PUBLISHED`.
4. **Robots.txt:** Tersedia di `/robots.txt` dengan izin akses mesin pencari untuk rute publik dan isolasi ketat rute `/admin/` dan `/api/`.
5. **Kinerja & Responsivitas:** Tata letak *mobile-first*, navigasi *drawer slide-over*, dan rasio kontras teks standar WCAG AA.

---

## 8. Laporan Uji Kualitas (QA Verification Suite)

Pengujian otomatis E2E dijalankan melalui skrip pengujian:
```bash
node scripts/test-all-journeys.js
```

### Hasil Verifikasi 14 Rangkaian Uji:
- [x] **1. Homepage:** Status 200, Brand ZETARAZ, Tagline *"Berbagi Pengetahuan, Berbagi Pengalaman"*, Pesan *"Temukan Pengetahuan. Perluas Wawasan."*
- [x] **2. Halaman About:** Status 200, Posisi ZETARAZ Knowledge, Standar Kredibilitas & Etika Privasi.
- [x] **3. 6 Kategori Utama:**
  - `/category/knowledge`
  - `/category/technology`
  - `/category/science-research`
  - `/category/data-analytics`
  - `/category/business-management`
  - `/category/learning`
- [x] **4. Detail Artikel:** Konten Markdown, nama penulis (Rizky Aditya Pratama Wijaya), dan JSON-LD terverifikasi.
- [x] **5. Halaman Pencarian:** UI `/search` memuat header dan filter topik.
- [x] **6. API Pencarian:** `/api/search?q=KMS` mengembalikan hasil relevan.
- [x] **7. Counter Pembaca Riil:** `/api/articles/[id]/view` meningkatkan viewCount secara atomik.
- [x] **8. Buletin:** Registrasi email dengan validasi input.
- [x] **9. Autentikasi Admin:** Validasi kredensial dan penerbitan token JWT HttpOnly.
- [x] **10. Pembuatan Draf Artikel:** Simpan draf via API terotentikasi.
- [x] **11. Publikasi Artikel:** Transisi status DRAFT ke PUBLISHED.
- [x] **12. Penghapusan Artikel:** Proteksi hak akses penghapusan artikel.
- [x] **13. Sitemap XML:** File `/sitemap.xml` valid.
- [x] **14. Robots.txt:** File `/robots.txt` memblokir rute admin dan mereferensikan sitemap.
