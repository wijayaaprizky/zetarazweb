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

## 3. Arsitektur Controlled Publishing (Sinkronisasi Google Docs)

Platform ZETARAZ mengadopsi prinsip **Controlled Publishing**:

> **"Automatic synchronization must NEVER mean automatic publication."**  
> *Google Docs adalah content source of truth. ZETARAZ CMS adalah publication authority.*

Setiap perubahan pada dokumen Google Docs secara otomatis disinkronkan dan disimpan sebagai draf baru (`draft_content`). Konten publik yang sudah terbit (`published_content`) **tidak pernah** ditimpa secara otomatis sampai administrator memberikan persetujuan publikasi secara eksplisit.

### A. State Versioning Konten:
- `published_content`: Versi naskah yang sedang aktif dan tampil di website publik.
- `draft_content`: Versi naskah terbaru hasil sinkronisasi Google Docs / draf editorial.
- `published_version`: Nomor versi publik saat ini (integer, 0 untuk draf baru, 1..N).
- `draft_version`: Nomor versi draf tersinkronisasi terbaru (integer, 1..N).
- `sync_status`: Status sinkronisasi (`IDLE`, `SYNCING`, `SYNCED`, `SYNC_ERROR`).
- `publication_status`: Status publikasi (`DRAFT`, `PUBLISHED`, `UPDATE_AVAILABLE`, `ARCHIVED`).

### B. Aturan Alur Kerja (Workflow):
1. **Artikel Baru:**
   - Sinkronisasi Google Docs menghasilkan draf (`publication_status = 'DRAFT'`).
   - Halaman publik mengembalikan 404.
   - Administrator meninjau melalui **Pratinjau Draf**.
   - Administrator menekan tombol **Publikasikan**.
   - Baru setelah itu artikel berstatus `PUBLISHED` (v1) dan dapat diakses publik.
2. **Artikel yang Sudah Terbit:**
   - Perubahan di Google Docs disinkronkan otomatis sebagai draf baru (`draft_version = published_version + 1`).
   - `published_content` (v1) tetap live dan aman diakses publik.
   - Status artikel bertransisi menjadi `UPDATE_AVAILABLE`.
   - Administrator dapat menggunakan fitur **Bandingkan Versi (Visual Diff Viewer)** untuk membandingkan baris yang ditambah/dihapus secara visual (*Side-by-Side* atau *Unified Diff*).
   - Administrator menekan **Publikasikan Pembaruan**:
     - Sistem secara transaksional dan atomik menggantikan versi publik dengan draf yang disetujui (`published_content = draft_content`, `published_version = draft_version`).
     - Riwayat dicatat pada `PublicationHistory` dan snapshot `ArticleVersion`.
   - Administrator dapat menekan **Batalkan Draf**:
     - Draf pembaruan dibuang dan dikembalikan ke versi publik aktif tanpa merusak konten publik.
3. **Idempotensi & Penanganan Galat:**
   - Notifikasi duplikat / webhook berulang tidak menciptakan versi draf duplikat.
   - Jika Google Docs diperbarui lagi sebelum persetujuan, draf yang tertunda diperbarui di tempat (*in-place*), tanpa menyentuh konten publik.
   - Galat sinkronisasi (`SYNC_ERROR`) mencatat log audit dan **sama sekali tidak merusak** konten publik.

---

## 4. Tumpukan Teknologi (Tech Stack)

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

## 5. Pengelolaan Konten Privat (Private CMS / KMS)

Seluruh fungsionalitas manajemen konten bersifat privat dan terlindungi, hanya dapat diakses oleh administrator terautentikasi melalui `/admin/login`:

* **URL Login:** `http://localhost:3000/admin/login`
* **Email:** `admin@zetaraz.com`
* **Password:** *(Terkonfigurasi privat via environment)*
* **Profil Pengelola:** **Rizky Aditya Pratama Wijaya** (Penulis & Administrator)

### Fitur Dasbor Admin:
1. **Ringkasan Metrik:** Jumlah artikel terbit, pembaruan draf yang menunggu persetujuan (*Update Available*), draf, total pembaca (*views*), kategori, dan pelanggan buletin.
2. **Editor Artikel & Google Docs Card:** Input URL/ID Google Docs dengan tombol *Sinkronkan Sekarang*, status sinkronisasi, dan tanggal sinkronisasi terakhir.
3. **Pratinjau Draf Khusus:** Halaman `/admin/articles/[id]/preview` yang menampilkan draf dalam layout website sebenarnya sebelum dirilis.
4. **Visual Diff Viewer:** Pembanding visual naskah publik vs draf dengan hitungan baris ditambah/dihapus (*Side-by-Side* dan *Unified Diff*).
5. **Riwayat Audit:** Tab audit log untuk *Sync History*, *Publication History*, dan *Article Versions*.
6. **Dialog Konfirmasi Modal:** Proteksi persetujuan sebelum publikasi atau pembatalan draf.

---

## 6. Konfigurasi Lingkungan (`.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="zetaraz-production-secure-jwt-key-2026-kms-platform"
ADMIN_EMAIL="admin@zetaraz.com"
ADMIN_PASSWORD="<rahasia-kata-sandi-admin>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 7. Panduan Menjalankan Aplikasi

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

## 8. Laporan Uji Kualitas (QA Verification Suite)

### A. Controlled Publishing Acceptance Suite:
Dijalankan melalui:
```bash
node scripts/test-controlled-publishing.js
```

Hasil Pengujian 7 Kriteria Penerimaan:
- [x] **1. Edit Google Doc:** Mengedit dokumen Google Docs hanya memperbarui draf CMS (`draft_content`), menaikkan `draft_version`, dan menandai status `UPDATE_AVAILABLE`.
- [x] **2. Konten Publik Tidak Berubah:** Artikel publik tetap menampilkan versi yang sudah disetujui sebelumnya dan tidak membocorkan draf yang belum disetujui.
- [x] **3. Publish Update:** Mengklik *Publish Update* secara atomik memperbarui versi publik ke versi draf terbaru dan mencatat log audit publikasi.
- [x] **4. Edit Ulang Dokumen:** Mengedit dokumen kembali menghasilkan draf tertunda berikutnya (`draft_version = 3`) sementara versi publik tetap versi 2.
- [x] **5. Discard Draft Update:** Membatalkan pembaruan mengembalikan draf ke versi publik saat ini tanpa mengganggu atau merusak konten publik.
- [x] **6. Publikasi Naskah Baru:** Naskah baru wajib mendapatkan persetujuan eksplisit administrator sebelum dapat diakses publik (mengembalikan 404 sebelum disetujui).
- [x] **7. Penanganan Galat:** Kegagalan sinkronisasi (misal link rusak / koneksi terputus) mencatat `SYNC_ERROR` dan sama sekali tidak merusak konten publik yang sedang aktif.

### B. End-to-End Regression Suite:
Dijalankan melalui:
```bash
node scripts/test-all-journeys.js
```
Total 19 Rangkaian Uji Lulus 100%.

### C. Firebase Deployment & Domain Strategy Suite:
Dijalankan melalui:
```bash
node scripts/test-domain-strategy.js
```
Total 7 Rangkaian Uji Domain & Konfigurasi Lulus 100%.

---

## 9. Strategi Deployment Firebase App Hosting & Migrasi Custom Domain

Arsitektur aplikasi ZETARAZ Knowledge dirancang secara terisolasi dari domain fisik (*domain-agnostic*), sehingga peluncuran awal dan migrasi domain di masa depan berjalan tanpa hambatan:

### A. Tahap 1: Peluncuran Awal (Default Firebase Domain)
- **Platform:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) (Cloud Run Serverless Compute untuk Next.js 14 SSR/ISR).
- **Domain Awal:** `<firebase-site-id>.web.app` (dan `<firebase-site-id>.firebaseapp.com`).
- **Tanpa Biaya Domain di Awal:** Deployment dan pengujian fungsi penuh dapat langsung dilakukan tanpa membeli domain kustom terlebih dahulu.
- **Konfigurasi Berkas:**
  - `firebase.json`: Konfigurasi backend App Hosting.
  - `apphosting.yaml`: Konfigurasi resource CPU, memori, dan environment variable `NEXT_PUBLIC_SITE_URL="https://<firebase-site-id>.web.app"`.

### B. Tahap 2: Migrasi Custom Domain Masa Depan (misal `zetaraz.com`)
Ketika siap beralih ke domain kustom, transisi dilakukan **hanya melalui konfigurasi DNS dan Firebase Console**, tanpa perlu kompilasi ulang kode atau migrasi basis data:

1. **Konfigurasi Domain di Firebase:**
   - Buka Firebase Console > Hosting / App Hosting > Tambahkan Custom Domain (`zetaraz.com`).
   - Tambahkan entri DNS (A Record / CNAME) pada registrar domain sesuai petunjuk Firebase.
   - Sertifikat SSL/TLS HTTPS diterbitkan secara otomatis dan gratis oleh Google Cloud/Firebase.

2. **Perbarui Variabel Lingkungan di App Hosting:**
   - Ubah `NEXT_PUBLIC_SITE_URL` menjadi `https://zetaraz.com`.
   - Aktifkan pengalihan permanen dengan mengisi `CUSTOM_DOMAIN_REDIRECT_TARGET="zetaraz.com"`.

3. **Pengalihan Otomatis 301 (Permanent Redirect):**
   - File [`middleware.ts`](file:///d:/zetarazweb/middleware.ts) mendeteksi jika ada trafik yang masih mengakses URL lama `*.web.app` atau `*.firebaseapp.com`, dan secara otomatis mengarahkannya (HTTP 301) ke `https://zetaraz.com` dengan tetap mempertahankan path dan query parameter asli. Hal ini menjaga seluruh ekuitas SEO dan tautan yang sudah tersebar.

4. **Pembaruan Google OAuth Authorized Domains:**
   - Buka Firebase Console > Authentication > Settings > Authorized domains.
   - Tambahkan `zetaraz.com` ke dalam daftar domain yang diizinkan agar autentikasi Google Sign-In tetap berfungsi lancar.

5. **Independensi Basis Data & Slug:**
   - Seluruh slug artikel di database disimpan sebagai string murni (misal `membangun-kebiasaan-berbagi-pengetahuan`).
   - Tidak ada satu pun baris database yang perlu diubah saat berganti domain.
   - Metadata kanonikal, Open Graph, Sitemap XML (`/sitemap.xml`), dan `robots.txt` secara otomatis menyesuaikan diri dengan domain aktif melalui modul [`lib/siteConfig.ts`](file:///d:/zetarazweb/lib/siteConfig.ts).
