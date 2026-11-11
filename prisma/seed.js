const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Cleaning previous data ---');
  await prisma.articleTag.deleteMany();
  await prisma.article.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();

  console.log('--- Creating Users ---');
  const passwordHash = await bcrypt.hash('ZetarazAdmin2026!', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@zetaraz.com',
      passwordHash,
      name: 'Dr. Aris Sudarsono',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Principal Knowledge Architect di ZETARAZ. Berfokus pada sistem manajemen pengetahuan enterprise, arsitektur informasi, dan rekayasa ontologi.',
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'farah.zulaikha@zetaraz.com',
      passwordHash,
      name: 'Farah Zulaikha, M.Sc.',
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Senior Technology & Data Analyst. Peneliti transformasi kecerdasan buatan, sains data, dan tata kelola digital.',
    },
  });

  console.log('--- Creating Categories ---');
  // 5 Main Navigation Categories
  const catKnowledge = await prisma.category.create({
    data: {
      name: 'Knowledge',
      slug: 'knowledge',
      description: 'Eksplorasi manajemen pengetahuan terstruktur, sains informasi, dan arsitektur kognitif organisasi modern.',
      icon: 'BookOpen',
      order: 1,
    },
  });

  const catResearch = await prisma.category.create({
    data: {
      name: 'Research',
      slug: 'research',
      description: 'Metodologi penelitian saintifik, analisis laboratorium, publikasi ilmiah, dan tinjauan bukti empiris.',
      icon: 'FlaskConical',
      order: 2,
    },
  });

  const catTechnology = await prisma.category.create({
    data: {
      name: 'Technology',
      slug: 'technology',
      description: 'Kecerdasan buatan, sains data, keamanan siber, dan infrastruktur komputasi masa depan.',
      icon: 'Cpu',
      order: 3,
    },
  });

  const catBusiness = await prisma.category.create({
    data: {
      name: 'Business & Management',
      slug: 'business-management',
      description: 'Manajemen proses bisnis (BPM), arsitektur enterprise, strategi korporasi, dan kepemimpinan adaptif.',
      icon: 'Briefcase',
      order: 4,
    },
  });

  const catLearning = await prisma.category.create({
    data: {
      name: 'Learning',
      slug: 'learning',
      description: 'Panduan praktis, studi kasus, kurikulum mandiri, dan kerangka kerja pembelajaran berkelanjutan.',
      icon: 'GraduationCap',
      order: 5,
    },
  });

  console.log('--- Creating Tags ---');
  const tagList = [
    { name: 'KMS', slug: 'kms' },
    { name: 'Enterprise Architecture', slug: 'enterprise-architecture' },
    { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    { name: 'BPM', slug: 'bpm' },
    { name: 'Data Analytics', slug: 'data-analytics' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Metodologi Riset', slug: 'metodologi-riset' },
    { name: 'Transformasi Digital', slug: 'transformasi-digital' },
    { name: 'Continuous Learning', slug: 'continuous-learning' },
    { name: 'Sains & Bukti', slug: 'sains-bukti' },
  ];

  const createdTags = {};
  for (const t of tagList) {
    createdTags[t.slug] = await prisma.tag.create({ data: t });
  }

  console.log('--- Creating 10+ Detailed Articles ---');

  const articles = [
    {
      title: 'Pengantar Sistem Manajemen Pengetahuan (KMS): Fondasi Aset Intelektual Abad 21',
      slug: 'pengantar-sistem-manajemen-pengetahuan-kms',
      subtitle: 'Bagaimana organisasi modern mengonversi tacit knowledge menjadi kekuatan kompetitif yang terukur dan abadi.',
      excerpt: 'Sistem Manajemen Pengetahuan (KMS) bukan sekadar repositori berkas digital, melainkan ekosistem terpadu yang memetakan, mengalirkan, dan melipatgandakan inteligensi kolektif organisasi.',
      contentType: 'EDITORIAL',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 1420,
      readTimeMinutes: 7,
      categoryId: catKnowledge.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Arsitektur jaringan kognitif: Menghubungkan data mentah menuju kearifan institusional.',
      seoTitle: 'Pengantar Sistem Manajemen Pengetahuan (KMS) | ZETARAZ',
      seoDescription: 'Panduan komprehensif konsep Sistem Manajemen Pengetahuan (KMS), model Nonaka-Takeuchi SECI, dan implementasi arsitektur KMS enterprise.',
      tags: ['kms', 'enterprise-architecture', 'transformasi-digital'],
      publishedAt: new Date('2026-10-15T09:00:00Z'),
      content: `## Mengapa Pengetahuan Adalah Aset Paling Kritis

Dalam lanskap ekonomi berbasis pengetahuan (*knowledge economy*), keunggulan kompetitif suatu organisasi tidak lagi semata-mata bertumpu pada modal finansial atau aset fisik. Aset paling berharga namun paling rentan mengalami erosi adalah **pengetahuan institusional** (*organizational knowledge*).

Ketika seorang tenaga ahli mengundurkan diri atau pensiun tanpa transfer pengetahuan yang sistematis, organisasi kehilangan puluhan tahun wawasan terakumulasi (*brain drain*). Di sinilah **Knowledge Management System (KMS)** bertindak sebagai infrastruktur kognitif yang menjaga keberlanjutan inteligensi bersama.

> **Definisi Kunci:** Knowledge Management System (KMS) adalah sistem sosio-teknis yang mengintegrasikan metodologi, proses, dan teknologi informasi untuk memfasilitasi penciptaan, identifikasi, kodifikasi, retensi, dan diseminasi pengetahuan di seluruh spektrum organisasi.

---

## Piramida DIKW: Dari Data Menuju Wisdom

Untuk memahami KMS secara presisi, kita harus membedakan hierarki epistemologis melalui kerangka **DIKW (Data, Information, Knowledge, Wisdom)**:

| Tingkatan | Karakteristik | Pertanyaan Inti | Contoh Praktis |
| :--- | :--- | :--- | :--- |
| **Data** | Fakta mentah, belum terstruktur | *Apa angkanya?* | 38.5, 120, "Jakarta" |
| **Information** | Data berkonteks dan berkorelasi | *Siapa, Kapan, Di mana?* | "Suhu server di data center Jakarta mencapai 38.5°C pada pukul 14:00" |
| **Knowledge** | Informasi yang dipadukan pengalaman & kaidah | *Bagaimana dan Mengapa?* | "Jika suhu melampaui 35°C disertai kelembaban 80%, sistem pendingin mengalami throttling" |
| **Wisdom** | Pertimbangan etis, nilai jangka panjang, keputusan visioner | *Apa tindakan terbaik ke depan?* | "Mendesain ulang arsitektur pendinginan berbasis geotermal untuk efisiensi energi 10 tahun ke depan" |

KMS yang matang tidak berhenti pada tingkat informasi (seperti pencarian dokumen biasa), melainkan mengkatalisis sintesis pada tingkat *Knowledge* dan *Wisdom*.

---

## Model Spiral SECI: Konversi Tacit ke Explicit

Salah satu landasan teoretis paling diakui dalam ilmu manajemen pengetahuan adalah model **SECI** yang dirumuskan oleh Ikujiro Nonaka dan Hirotaka Takeuchi (1995):

\`\`\`
                     KNOWLEDGE DIMENSIONS
                   Tacit                 Explicit
             +--------------------+--------------------+
      Tacit  |   SOSIALISASI      |   EKSTERNALISASI   |
             | (Berbagi praktek,  | (Dokumentasi,      |
             |  mentoring, obrolan|  pemodelan sistem) |
             +--------------------+--------------------+
   Explicit  |   INTERNALISASI    |    KOMBINASI       |
             | (Learning by doing,| (Integrasi repositori|
             |  adopsi kebiasaan) |  sintesis laporan) |
             +--------------------+--------------------+
\`\`\`

1. **Sosialisasi (Tacit ke Tacit):** Pertukaran intuisi dan ketrampilan mental secara langsung lewat kolaborasi, observasi, dan magang.
2. **Eksternalisasi (Tacit ke Explicit):** Merumuskan intuisi tak tertulis ke dalam diagram, SOP, model arsitektur, dan studi kasus terdokumentasi.
3. **Kombinasi (Explicit ke Explicit):** Menggabungkan modul-modul pengetahuan eksplisit yang tersebar menjadi kurikulum, repositori ontologi, atau portal intelijen terpadu.
4. **Internalisasi (Explicit ke Tacit):** Anggota organisasi membaca, mempraktikkan, dan menyerap pengetahuan baru hingga menjadi refleks operasional sehari-hari.

---

## Komponen Esensial dalam Arsitektur KMS Modern

Implementasi KMS modern yang berdaya tahan tinggi membutuhkan perpaduan empat pilar fondasi:

* **People & Culture:** Budaya psikologis yang aman (*psychological safety*) di mana berbagi ilmu dihargai, bukan disembunyikan sebagai bentuk monopoli kekuasaan individu.
* **Process & Governance:** Tata kelola kurasi, tinjauan sejawat (*peer review*), siklus pembaruan konten kedaluwarsa, dan taksonomi yang terstandarisasi.
* **Technology & Platform:** Antarmuka penemuan konten yang intuitif, pencarian semantik berkecepatan tinggi, integrasi API, dan mesin rekomendasi berbasis konteks.
* **Measurement & Impact:** Metrik keberhasilan yang tidak sekadar mengukur jumlah halaman diunggah, melainkan reduksi waktu onboarding karyawan baru dan kecepatan resolusi insiden.

---

## Kesimpulan dan Arah Masa Depan

Bagi ZETARAZ, Knowledge Management System bukan sekadar aplikasi pendukung, melainkan denyut nadi institusi. Melalui struktur taksonomi yang kokoh dan komitmen pada kualitas editorial, KMS menjembatani kesenjangan antara ide mentah para peneliti dengan aplikasi praktis di industri.

### Referensi & Bacaan Lanjutan:
- Nonaka, I., & Takeuchi, H. (1995). *The Knowledge-Creating Company: How Japanese Companies Create the Dynamics of Innovation*. Oxford University Press.
- Davenport, T. H., & Prusak, L. (1998). *Working Knowledge: How Organizations Manage What They Know*. Harvard Business School Press.
- Alavi, M., & Leidner, D. E. (2001). *Knowledge Management and Knowledge Management Systems: Conceptual Foundations and Research Issues*. MIS Quarterly, 25(1), 107-136.`
    },
    {
      title: 'Memahami Business Process Management (BPM): Dari Pemodelan Menuju Otomasi Terpadu',
      slug: 'memahami-business-process-management-bpm',
      subtitle: 'Kerangka kerja strategis untuk memetakan, menganalisis, mengukur, dan mengoptimalkan siklus hidup proses bisnis enterprise.',
      excerpt: 'Business Process Management (BPM) menyediakan lensa disiplin untuk melihat bagaimana nilai sebenarnya diciptakan di sepanjang rantai nilai perusahaan, melampaui batas silo departemen.',
      contentType: 'EDITORIAL',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 1180,
      readTimeMinutes: 6,
      categoryId: catBusiness.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Pemodelan alur kerja: Visualisasi terukur untuk efisiensi operasional tanpa henti.',
      seoTitle: 'Memahami Business Process Management (BPM) | ZETARAZ',
      seoDescription: 'Kupas tuntas siklus hidup Business Process Management (BPM), standar notasi BPMN 2.0, dan integrasi dengan otomasi cerdas modern.',
      tags: ['bpm', 'enterprise-architecture', 'transformasi-digital'],
      publishedAt: new Date('2026-10-18T10:30:00Z'),
      content: `## Paradigma Proses Melawan Silo Fungsional

Organisasi tradisional sering kali terjebak dalam perangkap hierarki fungsional: departemen keuangan, pemasaran, operasi, dan TI bekerja secara terisolasi. Pelanggan, sebaliknya, tidak peduli dengan struktur bagan organisasi; mereka hanya peduli pada ketepatan dan kualitas layanan yang mereka terima dari hulu ke hilir (*end-to-end*).

**Business Process Management (BPM)** menggeser fokus dari *siapa yang melapor kepada siapa* menuju *bagaimana pekerjaan mengalir dan menghasilkan nilai nyata*.

> **Prinsip Utama:** Setiap proses bisnis adalah urutan aktivitas yang terkoordinasi dan berulang, digerakkan oleh pemicu (*trigger*), memanfaatkan sumber daya dan informasi, guna mencapai tujuan bisnis yang terukur.

---

## Siklus Hidup BPM (BPM Life Cycle)

Penerapan BPM bukanlah proyek sekali selesai (*one-off project*), melainkan siklus perbaikan terus-menerus (*continuous improvement loop*):

\`\`\`
        [ 1. Desain & Pemodelan ]
                   |
                   v
         [ 2. Analisis & Simulasi ]
                   |
                   v
          [ 3. Implementasi & Eksekusi ]
                   |
                   v
           [ 4. Pemantauan & Kontrol ]
                   |
                   v
            [ 5. Optimasi & Refinemen ]
                   |
                   +----> (Kembali ke Tahap 1)
\`\`\`

1. **Desain & Pemodelan (*Process Design & Modeling*):** Memetakan proses yang sedang berjalan (*As-Is*) dan merancang proses target masa depan (*To-Be*) menggunakan standar visual internasional seperti **BPMN 2.0** (Business Process Model and Notation).
2. **Analisis (*Process Analysis*):** Mengidentifikasi hambatan (*bottlenecks*), redundansi aktivitas, pemborosan waktu tunggu, dan biaya overhead yang tidak menambah nilai.
3. **Eksekusi (*Process Execution*):** Menerapkan proses baru ke dalam lingkungan kerja, baik melalui panduan operasional baru maupun menggunakan mesin alur kerja otomatis (*Workflow Management Engine*).
4. **Pemantauan (*Process Monitoring*):** Menilai performa real-time proses menggunakan indikator kinerja utama (KPI) seperti *Cycle Time*, *Error Rate*, dan *Cost per Transaction*.
5. **Optimasi (*Process Optimization*):** Menggunakan temuan data lapangan untuk menyempurnakan kembali alur proses secara iteratif.

---

## Standar Notasi BPMN 2.0 yang Perlu Dipahami

Untuk menjembatani komunikasi antara analis bisnis dan perekayasa perangkat lunak, Object Management Group (OMG) meratifikasi standar **BPMN 2.0**. Elemen dasarnya terdiri dari:

* **Flow Objects:** 
  - *Events* (Lingkaran: Start, Intermediate, End)
  - *Activities/Tasks* (Persegi panjang dengan sudut membulat)
  - *Gateways* (Belah ketupat: XOR, Parallel AND, Inclusive OR)
* **Connecting Objects:** *Sequence Flow* (panah padat) dan *Message Flow* (panah putus-putus).
* **Swimlanes:** *Pools* (merepresentasikan organisasi) dan *Lanes* (merepresentasikan peran/divisi internal).

---

## Dari BPM Konvensional ke Hyperautomation

Perkembangan teknologi modern memadukan BPM tradisional dengan kecerdasan buatan, melahirkan konsep **Hyperautomation**:
- **Process Mining:** Algoritma yang mengekstrak rekaman log kejadian (*event logs*) dari sistem ERP/CRM untuk merekonstruksi peta proses aktual tanpa bias wawancara.
- **Robotic Process Automation (RPA):** Bot perangkat lunak yang mengeksekusi tugas repetitif berbasis aturan (*rules-based*) dengan akurasi tinggi.
- **Decision Intelligence:** Pemanfaatan model prediktif machine learning untuk mengambil keputusan alur proses secara adaptif.

BPM yang efektif memastikan organisasi tetap gesit menghadapi disrupsi pasar tanpa mengorbankan kepatuhan tata kelola (*governance*).`
    },
    {
      title: 'Pengantar Arsitektur Enterprise: Mengharmonisasikan Strategi Bisnis dan Lanskap Teknologi',
      slug: 'pengantar-arsitektur-enterprise',
      subtitle: 'Memahami kerangka kerja TOGAF, empat domain arsitektur, dan cetak biru transformasi digital skala besar.',
      excerpt: 'Arsitektur Enterprise (EA) adalah cetak biru konseptual yang mendefinisikan struktur dan operasi organisasi untuk memastikan keselarasan penuh antara visi bisnis dan eksekusi TI.',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 950,
      readTimeMinutes: 8,
      categoryId: catBusiness.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Cetak biru arsitektur: Struktur menyeluruh yang menopang stabilitas dan kelincahan enterprise.',
      seoTitle: 'Pengantar Arsitektur Enterprise (EA) & TOGAF | ZETARAZ',
      seoDescription: 'Ulasan mendalam Arsitektur Enterprise (Enterprise Architecture), kerangka kerja TOGAF ADM, dan empat domain inti arsitektur modern.',
      tags: ['enterprise-architecture', 'bpm', 'transformasi-digital'],
      publishedAt: new Date('2026-10-22T08:15:00Z'),
      content: `## Mengapa Organisasi Butuh Cetak Biru Enterprise?

Bayangkan sebuah kota metropolitan yang berkembang pesat selama 20 tahun tanpa rencana tata kota (*master plan*). Rumah sakit didirikan di lokasi tanpa akses air bersih, jalur rel kereta tidak tersambung dengan terminal bus, dan sistem kelistrikan overload akibat penambahan gedung pencakar langit secara acak.

Inilah metafora tepat bagi perusahaan yang bertumbuh tanpa **Enterprise Architecture (EA)**. Aplikasi dibeli secara sporadis oleh tiap unit bisnis, data pelanggan terduplikasi di tujuh database yang saling bertentangan, dan infrastruktur cloud membengkak tanpa kendali biaya.

> **Definisi:** Enterprise Architecture (EA) adalah disiplin strategis yang memetakan kapabilitas organisasi, proses bisnis, informasi, dan aset teknologi guna memandu perubahan struktural menuju visi masa depan yang diinginkan.

---

## Empat Domain Fondasional Arsitektur Enterprise

Sebagian besar kerangka kerja EA global—termasuk TOGAF (The Open Group Architecture Framework)—membagi arsitektur enterprise ke dalam empat pilar terintegrasi:

\`\`\`
+--------------------------------------------------------------+
| 1. BUSINESS ARCHITECTURE                                      |
|    Strategi, Sasaran Bisnis, Kapabilitas, Model Nilai, Organisasi|
+--------------------------------------------------------------+
                               |
                               v
+------------------------------+-------------------------------+
| 2. DATA ARCHITECTURE         | 3. APPLICATION ARCHITECTURE   |
|    Model Data Konseptual,    |    Portofolio Sistem,         |
|    Kamus Data, Aliran Data   |    Layanan API, Integrasi     |
+------------------------------+-------------------------------+
                               |
                               v
+--------------------------------------------------------------+
| 4. TECHNOLOGY ARCHITECTURE                                   |
|    Infrastruktur Cloud/On-Premise, Jaringan, Keamanan, OS    |
+--------------------------------------------------------------+
\`\`\`

1. **Business Architecture:** Mendefinisikan strategi bisnis, tata kelola, struktur organisasi, dan kapabilitas utama yang dibutuhkan untuk melayani pasar.
2. **Data / Information Architecture:** Mengatur struktur aset data logis dan fisik organisasi beserta manajemen data terpadu (*master data management*).
3. **Application Architecture:** Merinci cetak biru setiap sistem aplikasi yang akan diterapkan, interaksinya, dan hubungannya dengan proses bisnis inti.
4. **Technology Architecture:** Menyediakan spesifikasi perangkat keras, sistem operasi, jaringan, dan layanan komputasi awan yang diperlukan untuk menjalankan aplikasi dan data.

---

## TOGAF ADM: Siklus Pengembangan Arsitektur

TOGAF memperkenalkan **Architecture Development Method (ADM)**, pendekatan siklis berfase 8 yang mengarahkan arsitek enterprise dari visi awal hingga pemeliharaan tata kelola:

* **Fase A - Architecture Vision:** Menetapkan lingkup dan persetujuan eksekutif.
* **Fase B, C, D:** Membangun arsitektur Bisnis, Sistem Informasi (Data & Aplikasi), serta Teknologi.
* **Fase E - Opportunities & Solutions:** Mengidentifikasi celah (*gap analysis*) dan opsi pengadaan.
* **Fase F - Migration Planning:** Menyusun rencana transisi bertahap (*roadmap*).
* **Fase G - Implementation Governance:** Mengawasi implementasi proyek agar patuh arsitektur.
* **Fase H - Architecture Change Management:** Mengelola adaptasi arsitektur terhadap perubahan regulasi dan teknologi baru.

Melalui EA, organisasi tidak lagi sekadar bereaksi terhadap krisis teknologi harian, melainkan membangun keunggulan struktural yang berkelanjutan.`
    },
    {
      title: 'Bagaimana Kecerdasan Buatan Mentransformasi Kerja Pengetahuan (Knowledge Work)',
      slug: 'bagaimana-kecerdasan-buatan-mentransformasi-kerja-pengetahuan',
      subtitle: 'Analisis dampak model fondasi generatif terhadap riset saintifik, sintesis informasi, dan batas kognitif manusia.',
      excerpt: 'Kecerdasan Buatan (AI) tidak lagi hanya mengotomatisasi pekerjaan fisik repetitif, melainkan memasuki ranah penalaran simbolik, analisis literatur, dan rekayasa ide.',
      contentType: 'ANALYSIS',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1670,
      readTimeMinutes: 9,
      categoryId: catTechnology.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Sinergi manusia dan mesin: AI sebagai eksoskeleton kognitif bagi peneliti modern.',
      seoTitle: 'Kecerdasan Buatan dan Transformasi Knowledge Work | ZETARAZ',
      seoDescription: 'Eksplorasi mendalam pergeseran peran pekerja pengetahuan di era LLM, augmentasi kognitif, dan etika riset berbasis AI.',
      tags: ['artificial-intelligence', 'kms', 'sains-bukti'],
      publishedAt: new Date('2026-10-25T11:00:00Z'),
      content: `## Pergeseran Tektonik di Ranah Kognitif

Selama dua abad revolusi industri, mekanisasi berfokus menggantikan otot manusia dengan mesin uap, listrik, dan robotika pabrik. Pekerjaan pengetahuan—seperti analisis hukum, riset ilmiah, diagnosis medis, dan pemrograman komputer—dianggap sebagai benteng pertahanan terakhir yang eksklusif bagi akal budi manusia.

Namun kemunculan Large Language Models (LLM) dan arsitektur transformator telah mengubah peta tersebut secara mendasar. AI generatif kini mampu membaca ribuan makalah saintifik dalam hitungan detik, mengekstraksi hipotesis, dan mensintesis keterkaitan antardisiplin ilmu dengan kecepatan eksponensial.

---

## AI Sebagai 'Cognitive Exoskeleton'

Alih-alih melihat AI sebagai pengganti peneliti (*replacement*), kerangka kerja yang lebih konstruktif adalah memandangnya sebagai **eksoskeleton kognitif** (*cognitive exoskeleton*):

\`\`\`
   Tugas Manusia Tradisional              Paradigma Kolaborasi AI
+-----------------------------+       +-------------------------------+
| Pencarian Literatur Manual  | ----> | Agen AI mensurvei 10.000 paper|
| Transkripsi & Redaksi Data  |       | Ekstraksi entitas otomatis    |
+-----------------------------+       +-------------------------------+
                                                      |
                                                      v
                                      +-------------------------------+
                                      | Peneliti Manusia:             |
                                      | - Validasi kritis metodologis |
                                      | - Pertimbangan etis & moral   |
                                      | - Intuisi orisinal & sintesis |
                                      +-------------------------------+
\`\`\`

1. **Survei Literatur Cepat:** Algoritma semantik dapat mengidentifikasi pola tersembunyi di antara jutaan publikasi PubMed atau arXiv yang mustahil dibaca oleh satu tim manusia dalam seumur hidup.
2. **Eksplorasi Hipotesis Berlawanan:** Model AI dapat ditugaskan untuk bertindak sebagai *Devil's Advocate*, menantang asumsi dasar peneliti dan mendeteksi bias konfirmasi (*confirmation bias*).
3. **Penerjemahan Bahasa Formal:** Menerjemahkan deskripsi abstrak matematika ke dalam kode komputasi yang siap diuji di lingkungan simulasi.

---

## Tantangan Epistemologis: Halusinasi dan Integritas Ilmiah

Meskipun memiliki potensi revolusioner, pemanfaatan AI dalam ekosistem pengetahuan menghadirkan bahaya epistemologis yang nyata:

* **Stochastic Parrots & Hallucination:** Model bahasa menghasilkan teks berdasarkan probabilitas statistik kemunculan kata berikutnya, bukan pemahaman konseptual yang sejati. Tanpa verifikasi berbasis sumber primer, model dapat mengarang kutipan fiktif yang terdengar sangat meyakinkan.
* **Erosi Kemampuan Berpikir Kritis:** Ketergantungan berlebih pada ringkasan instan berisiko melemahkan kemampuan intelektual peneliti dalam menelaah argumen nuansial yang panjang.
* **Masalah Hak Cipta dan Kebocoran Data:** Memasukkan draf riset yang belum dipublikasikan ke model komersial berpotensi melanggar kerahasiaan kekayaan intelektual.

---

## Rekomendasi untuk Organisasi Pengetahuan

ZETARAZ menganut prinsip **Augmented Intelligence with Strict Epistemic Rigor**:
- Setiap sintesis berbasis AI wajib diverifikasi silang dengan dokumen rujukan primer yang terverifikasi.
- Transparansi metodologis: Peneliti wajib menyatakan secara jujur bagian mana dari penelitian yang memanfaatkan bantuan komputasi generatif.
- Manusia memegang tanggung jawab etis dan ilmiah mutlak atas setiap simpulan yang dipublikasikan.`
    },
    {
      title: 'Memahami Sains Data & Analisis Data: Mengubah Jejak Digital Menjadi Keputusan Presisi',
      slug: 'memahami-sains-data-dan-analisis-data',
      subtitle: 'Spektrum analitika dari deskriptif hingga preskriptif, tata kelola data, dan budaya berbasis bukti.',
      excerpt: 'Data adalah bahan bakar baru, tetapi tanpa metodologi analitik yang disiplin, kumpulan data besar hanyalah tumpukan angka yang membingungkan dan menyesatkan.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 890,
      readTimeMinutes: 7,
      categoryId: catTechnology.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Visualisasi analitika: Membaca dinamika sistem melalui grafik dan regresi statistik.',
      seoTitle: 'Panduan Sains Data & Analisis Data | ZETARAZ',
      seoDescription: 'Pelajari empat spektrum analitika data: deskriptif, diagnostik, prediktif, dan preskriptif beserta metodologi CRISP-DM.',
      tags: ['data-analytics', 'artificial-intelligence', 'sains-bukti'],
      publishedAt: new Date('2026-10-28T14:00:00Z'),
      content: `## Spektrum Tingkat Kematangan Analisis Data

Dalam dunia analitika modern, Gartner mendefinisikan empat tingkatan kematangan analitik yang menggambarkan peningkatan nilai bisnis seiring dengan meningkatnya kompleksitas metode:

\`\`\`
NILAI
  ^                                                     [ PRESKRIPTIF ]
  |                                                (Bagaimana mewujudkannya?)
  |                                         [ PREDIKTIF ]
  |                                   (Apa yang akan terjadi?)
  |                           [ DIAGNOSTIK ]
  |                      (Mengapa itu terjadi?)
  |              [ DESKRIPTIF ]
  |          (Apa yang telah terjadi?)
  +-------------------------------------------------------------> KESULITAN
\`\`\`

1. **Analisis Deskriptif (*Descriptive Analytics*):** Merangkum data historis untuk memahami peristiwa masa lalu melalui laporan ringkasan, metrik agregasi, dan dasbor visual.
2. **Analisis Diagnostik (*Diagnostic Analytics*):** Menyelidiki akar masalah (*root cause analysis*) melalui *drill-down*, korelasi antarvariabel, dan analisis anomali.
3. **Analisis Prediktif (*Predictive Analytics*):** Menggunakan model statistik dan machine learning untuk memproyeksikan probabilitas peristiwa masa depan berdasarkan pola historis.
4. **Analisis Preskriptif (*Prescriptive Analytics*):** Tingkat tertinggi yang merekomendasikan tindakan spesifik teroptimal menggunakan algoritma optimasi dan simulasi skenario.

---

## Metodologi Standar: Siklus CRISP-DM

Analisis data yang kredibel tidak dilakukan secara serampangan. Standar industri **CRISP-DM** (Cross-Industry Standard Process for Data Mining) menetapkan enam tahap sistematis:

1. **Business Understanding:** Menentukan tujuan proyek dan menerjemahkannya ke dalam formulasi pertanyaan saintifik.
2. **Data Understanding:** Pengumpulan data awal, eksplorasi karakteristik, dan pengecekan kualitas integritas.
3. **Data Preparation:** Pembersihan *missing values*, normalisasi, rekayasa fitur (*feature engineering*), dan transformasi skema.
4. **Modeling:** Pemilihan teknik algoritma statistik atau machine learning yang relevan.
5. **Evaluation:** Mengukur performa model dengan metrik saintifik (seperti RMSE, ROC-AUC, Precision/Recall) serta menguji keterterapannya terhadap masalah bisnis.
6. **Deployment:** Mengintegrasikan model ke dalam aplikasi produksi atau sistem pendukung keputusan organisasi.

Data tanpa konteks adalah kebisingan (*noise*). Melalui sains data yang berintegritas, ZETARAZ mengedepankan analitika yang bebas dari manipulasi bias konfirmasi.`
    },
    {
      title: 'Prinsip Dasar Keamanan Siber: Membangun Ketahanan Informasi di Era Hyperconnected',
      slug: 'prinsip-dasar-keamanan-siber',
      subtitle: 'Triad CIA, pertahanan berlapis (Defense-in-Depth), dan paradigma modern Zero Trust Architecture.',
      excerpt: 'Keamanan siber bukan sekadar masalah perangkat lunak antivirus, melainkan arsitektur ketahanan yang mencakup rekayasa sosial, enkripsi, dan kesiapan respons insiden.',
      contentType: 'EDITORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1040,
      readTimeMinutes: 6,
      categoryId: catTechnology.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Keamanan siber: Mengamankan batas digital melalui enkripsi dan verifikasi identitas berlapis.',
      seoTitle: 'Prinsip Dasar Keamanan Siber & Zero Trust | ZETARAZ',
      seoDescription: 'Panduan prinsip keamanan siber: CIA Triad, Defense in Depth, manajemen kerentanan, dan filosofi Zero Trust.',
      tags: ['cybersecurity', 'enterprise-architecture', 'transformasi-digital'],
      publishedAt: new Date('2026-11-01T08:00:00Z'),
      content: `## Fondasi Epik: Triad CIA

Keamanan informasi berakar pada tiga pilar yang dikenal sebagai **CIA Triad**:

* **Kerahasiaan (*Confidentiality*):** Memastikan informasi sensitif hanya dapat diakses oleh pihak yang memiliki hak otorisasi yang sah. Mekanisme utama: Enkripsi simetris/asimetris (AES-256, RSA), kontrol akses berbasis peran (RBAC), dan klasifikasi data.
* **Integritas (*Integrity*):** Menjamin bahwa data tidak dimodifikasi, dirusak, atau dihapus oleh pihak yang tidak berwenang selama transit maupun saat disimpan (*at rest*). Mekanisme: Hashing kriptografis (SHA-256), *digital signatures*, dan audit trail yang tidak dapat diubah (*immutable logs*).
* **Ketersediaan (*Availability*):** Memastikan sistem, jaringan, dan data dapat diakses oleh pengguna yang berwenang kapan pun dibutuhkan. Mekanisme: Redundansi server, penyeimbang beban (*load balancer*), mitigasi DDoS, dan rencana pemulihan bencana (*Disaster Recovery Plan*).

---

## Pergeseran Paradigma: Filosofi Zero Trust

Pendekatan keamanan lama mengandalkan model "Kastil dan Parit" (*Castle-and-Moat*): siapa pun yang berada di luar perimeter diblokir firewall, tetapi siapa pun yang berhasil masuk ke dalam jaringan internal dipercaya sepenuhnya.

Model ini telah usang karena kerja jarak jauh (*remote work*), cloud publik, dan perangkat seluler telah menghapus batas fisik perimeter kantor. Penggantinya adalah **Zero Trust Architecture (ZTA)** dengan semboyan:

> *"Never Trust, Always Verify"* (Jangan pernah percaya, selalu verifikasi).

### Tiga Rukun Zero Trust:
1. **Verifikasi Eksplisit:** Selalu mengotentikasi dan mengotorisasi setiap akses berdasarkan seluruh titik data yang tersedia (identitas pengguna, lokasi geospasial, kepatuhan perangkat, anomali perilaku).
2. **Hak Istimewa Minimal (*Least Privilege*):** Batasi akses pengguna hanya pada data dan durasi yang mutlak dibutuhkan untuk tugas spesifik (*Just-In-Time* dan *Just-Enough-Access*).
3. **Asumsikan Kebocoran (*Assume Breach*):** Bertindak seolah-olah penyerang sudah berada di dalam jaringan. Segmentasikan jaringan secara mikro, enkripsi seluruh komunikasi internal, dan aktifkan pemantauan telemetri waktu nyata.

Keamanan siber adalah perlombaan tanpa garis akhir. Organisasi yang unggul adalah yang membangun budaya kesadaran keamanan di seluruh jajaran anggotanya.`
    },
    {
      title: 'Metodologi Riset Ilmiah untuk Pemula: Dari Pertanyaan Menuju Publikasi Berbobot',
      slug: 'metodologi-riset-ilmiah-untuk-pemula',
      subtitle: 'Langkah terstruktur merumuskan masalah penelitian, tinjauan literatur kritis, hingga pengujian hipotesis empiris.',
      excerpt: 'Riset ilmiah bukanlah spekulasi intuitif tanpa arah, melainkan proses penyelidikan yang terstruktur, dapat direplikasi (replicable), dan dapat diuji kebenarannya (falsifiable).',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1310,
      readTimeMinutes: 8,
      categoryId: catResearch.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Laboratorium riset: Menegakkan ketelitian metode demi menghasilkan pengetahuan yang sahih.',
      seoTitle: 'Metodologi Riset Ilmiah untuk Pemula | ZETARAZ',
      seoDescription: 'Pelajari tahapan metodologi penelitian ilmiah: perumusan masalah, tinjauan pustaka, desain penelitian, etika, dan validitas data.',
      tags: ['metodologi-riset', 'sains-bukti', 'continuous-learning'],
      publishedAt: new Date('2026-11-03T10:00:00Z'),
      content: `## Hakikat Penyelidikan Saintifik

Metode ilmiah adalah pencapaian intelektual terbesar peradaban manusia dalam memisahkan kebenaran empiris dari mitos, prasangka, dan dogma. Karl Popper menekankan bahwa sebuah klaim hanya bernilai ilmiah jika memiliki sifat **falsifiability**—yakni terdapat skenario observasi yang secara logis dapat membuktikan klaim tersebut keliru jika hipotesisnya memang salah.

---

## Tahapan Terstruktur dalam Proses Penelitian

\`\`\`
1. Identifikasi Kesenjangan Riset (Research Gap)
                      |
                      v
2. Perumusan Pertanyaan Penelitian & Hipotesis
                      |
                      v
3. Tinjauan Pustaka Sistematis (Systematic Literature Review)
                      |
                      v
4. Desain Metodologi & Instrumen Pengumpulan Data
                      |
                      v
5. Pengujian Empiris & Analisis Statistik
                      |
                      v
6. Interpretasi Temuan & Batasan Penelitian
                      |
                      v
7. Peer Review & Diseminasi Terbuka
\`\`\`

### 1. Merumuskan Pertanyaan Riset yang Tajam
Pertanyaan penelitian yang baik harus memenuhi kriteria **FINER**:
- **Feasible:** Dapat dilaksanakan dengan sumber daya, waktu, dan akses data yang tersedia.
- **Interesting:** Menarik bagi peneliti dan komunitas akademik.
- **Novel:** Memberikan wawasan baru, mengonfirmasi temuan yang belum pasti, atau mengisi celah pengetahuan.
- **Ethical:** Mematuhi protokol etik perlindungan subjek manusia/hewan dan kejujuran ilmiah.
- **Relevant:** Berdampak bagi perkembangan ilmu pengetahuan maupun kebijakan praktis.

### 2. Kuantitatif vs Kualitatif vs Mixed Methods
- **Pendekatan Kuantitatif:** Menguji teori secara deduktif, mengukur variabel numerik, menggunakan sampling terwakili, dan analisis inferensial statistik.
- **Pendekatan Kualitatif:** Menjelajahi fenomena secara induktif dan mendalam melalui wawancara mendalam, studi etnografi, dan analisis tematik.
- **Metode Campuran (*Mixed Methods*):** Memadukan kekuatan triangulasi data kuantitatif dan kedalaman narasi kualitatif untuk pemahaman komprehensif.

Integritas riset menuntut transparansi total terhadap data mentah, metode analisis, dan pengakuan jujur atas keterbatasan penelitian.`
    },
    {
      title: 'Memahami Data Saintifik dan Bukti Empiris: Menilai Kredibilitas di Tengah Lautan Informasi',
      slug: 'memahami-data-saintifik-dan-bukti-empiris',
      subtitle: 'Hierarki bukti ilmiah, bahaya korelasi semu (spurious correlation), dan pentingnya replikasi independen.',
      excerpt: 'Tidak semua klaim yang mencantumkan kata "menurut penelitian" memiliki bobot yang sama. Pahami cara membaca hierarki bukti dan mengidentifikasi p-hacking.',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 780,
      readTimeMinutes: 7,
      categoryId: catResearch.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Instrumen pengukuran presisi: Mengumpulkan bukti empiris yang bebas dari distorsi subjektif.',
      seoTitle: 'Memahami Data Saintifik dan Bukti Empiris | ZETARAZ',
      seoDescription: 'Pelajari hierarki piramida bukti ilmiah, bias publikasi, spurious correlation, dan krisis replikasi sains modern.',
      tags: ['sains-bukti', 'metodologi-riset', 'continuous-learning'],
      publishedAt: new Date('2026-11-05T09:30:00Z'),
      content: `## Piramida Hierarki Bukti Ilmiah

Dalam sains modern—terutama kedokteran berbasis bukti (*evidence-based medicine*) dan ilmu sosial kuantitatif—terdapat konsensus mengenai tingkatan kekuatan bukti:

\`\`\`
                     [ SISTEMATIS REVIEW & META-ANALISIS ]
                                      ^
                                     / \\
                                    /   \\
                       [ UJI KLINIS ACAK TERKONTROL (RCT) ]
                                  /       \\
                                 /         \\
                      [ STUDI KOHORT & KASUS-KONTROL ]
                               /             \\
                              /               \\
                   [ LAPORAN KASUS & STUDI KERAT LINTANG ]
                            /                     \\
                           /                       \\
               [ PENDAPAT PAKAR & KONSENSUS NARATIF ]
\`\`\`

1. **Meta-Analisis & Systematic Review:** Puncak tertinggi bukti. Menggabungkan puluhan studi independen berkualitas tinggi menggunakan teknik statistik terstandardisasi untuk menghilangkan variasi acak.
2. **Randomized Controlled Trials (RCT):** Standar emas untuk menentukan hubungan sebab-akibat (*causality*) karena meminimalkan faktor perancu (*confounding factors*) melalui pengacakan.
3. **Studi Observasional:** Mengamati populasi alami tanpa intervensi. Efektif mendeteksi korelasi jangka panjang, tetapi rentan terhadap bias seleksi.
4. **Opini Pakar:** Tingkat terendah dalam hierarki bukti karena rentan terhadap bias kognitif dan otoritas personal tanpa dukungan data kuantitatif.

---

## Jebakan Klasik: Korelasi Bukan Kausalitas

Salah satu kesalahan paling umum dalam penafsiran data adalah menyamakan korelasi (*correlation*) dengan sebab-akibat (*causation*). Dua variabel dapat bergerak bersamaan karena kebetulan acak (*spurious correlation*) atau karena keduanya dipengaruhi oleh faktor ketiga (*lurking variable*).

> **Peringatan Ilmiah:** P-hacking (memanipulasi analisis data hingga memperoleh p-value < 0.05 secara artifisial) dan bias publikasi (jurnal cenderung hanya mempublikasikan temuan positif) adalah musuh utama integritas sains saat ini.

ZETARAZ berkomitmen untuk mempromosikan literasi data saintifik yang kritis agar masyarakat mampu menyaring informasi yang berlandaskan metodologi sahih.`
    },
    {
      title: 'Transformasi Digital dan Perubahan Organisasi: Menaklukkan Hambatan Budaya dan Struktur',
      slug: 'transformasi-digital-dan-perubahan-organisasi',
      subtitle: 'Mengapa 70% inisiatif transformasi digital gagal bukan karena masalah teknologi, melainkan kegagalan manajemen perubahan.',
      excerpt: 'Transformasi digital pada hakikatnya adalah transformasi organisasi yang dimampukan oleh teknologi, menuntut perombakan pola pikir kepemimpinan dan keselarasan insentif.',
      contentType: 'EDITORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1220,
      readTimeMinutes: 7,
      categoryId: catBusiness.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Kolaborasi tim lintas disiplin: Kunci keberhasilan adaptasi digital dalam institusi.',
      seoTitle: 'Transformasi Digital dan Perubahan Organisasi | ZETARAZ',
      seoDescription: 'Strategi mengatasi kegagalan transformasi digital melalui manajemen perubahan Kotter, kepemimpinan transformasional, dan adopsi agile.',
      tags: ['transformasi-digital', 'bpm', 'enterprise-architecture'],
      publishedAt: new Date('2026-11-07T11:15:00Z'),
      content: `## Mitos Teknologi Sebagai Obat Ajaib (*Silver Bullet*)

Banyak dewan direksi berasumsi bahwa dengan membeli lisensi perangkat lunak cloud termahal atau merekrut puluhan konsultan data, organisasi mereka secara otomatis telah bertransformasi secara digital. Ini adalah ilusi berbahaya.

Sebagaimana dicatat oleh studi McKinsey dan Harvard Business Review, mayoritas kegagalan inisiatif digital bermuara pada resistensi manusia: ketakutan kehilangan status quo, ketidakjelasan komunikasi visi dari pimpinan, dan struktur insentif yang bertentangan dengan inovasi.

---

## Kerangka 8 Langkah Kotter untuk Perubahan yang Berdaya Tahan

John Kotter merumuskan tahapan krusial dalam menakhodai transformasi berskala besar:

1. **Menciptakan Urgensi Nyata (*Create Urgency*):** Membuka data fakta mengenai pergeseran perilaku pelanggan dan disrupsi kompetitor untuk mengikis rasa puas diri (*complacency*).
2. **Membentuk Koalisi Pemandu (*Form a Guiding Coalition*):** Mengumpulkan agen perubahan lintas departemen yang memiliki pengaruh moral dan keahlian teknis.
3. **Mengembangkan Visi Strategis (*Create a Vision for Change*):** Menjelaskan gambaran masa depan secara konkret dan sederhana yang dapat dipahami dalam waktu lima menit oleh staf lini depan.
4. **Mengomunikasikan Visi Secara Masif (*Enlist a Volunteer Army*):** Menghubungkan setiap keputusan operasional dengan visi baru tersebut.
5. **Menyingkirkan Hambatan Struktural (*Remove Obstacles*):** Meninjau ulang KPI yang kaku dan menghambat eksperimentasi.
6. **Menciptakan Kemenangan Jangka Pendek (*Generate Short-Term Wins*):** Merayakan keberhasilan proyek percontohan awal untuk membangun momentum positif.
7. **Mempertahankan Akselerasi (*Sustain Acceleration*):** Tidak lekas puas dengan hasil awal; terus memperdalam perubahan ke sistem yang lebih kompleks.
8. **Menanamkan Budaya Baru (*Anchor Change in Culture*):** Memastikan bahwa cara kerja baru telah menjadi identitas permanen organisasi.

Transformasi digital yang sukses mengintegrasikan arsitektur enterprise dengan kepemimpinan yang berempati.`
    },
    {
      title: 'Membangun Budaya Pembelajaran Berkelanjutan (Continuous Learning) di Organisasi Pengetahuan',
      slug: 'membangun-budaya-pembelajaran-berkelanjutan',
      subtitle: 'Strategi praktis menciptakan learning organization yang lincah, inovatif, dan adaptif terhadap percepatan zaman.',
      excerpt: 'Dalam dunia yang berubah secara eksponensial, kemampuan organisasi untuk belajar, melupakan kebiasaan lama (unlearn), dan mempelajari hal baru (relearn) adalah satu-satunya keunggulan abadi.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1510,
      readTimeMinutes: 6,
      categoryId: catLearning.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Ruang pembelajaran kolaboratif: Memupuk rasa ingin tahu dan keberanian bereksperimen.',
      seoTitle: 'Membangun Budaya Continuous Learning di Organisasi | ZETARAZ',
      seoDescription: 'Pelajari konsep The Fifth Discipline Peter Senge, psychological safety Amy Edmondson, dan siklus Learn-Unlearn-Relearn.',
      tags: ['continuous-learning', 'kms', 'metodologi-riset'],
      publishedAt: new Date('2026-11-09T08:45:00Z'),
      content: `## Lima Disiplin Organisasi Pembelajar (Peter Senge)

Dalam mahakaryanya *The Fifth Discipline*, Peter Senge mengidentifikasi lima kapabilitas inti yang wajib dimiliki institusi pembelajar (*learning organization*):

* **Keahlian Pribadi (*Personal Mastery*):** Komitmen individu anggota untuk terus memperdalam visi pribadi dan ketrampilan profesionalnya.
* **Model Mental (*Mental Models*):** Kemampuan untuk secara kritis merefleksikan asumsi implisit yang mempengaruhi cara kita memandang dunia dan mengambil keputusan.
* **Visi Bersama (*Shared Vision*):** Membangun gambaran masa depan yang disepakati bersama secara sukarela, bukan paksaan mandat pimpinan.
* **Pembelajaran Tim (*Team Learning*):** Praktik dialog terbuka di mana tim berpikir bersama dan melahirkan wawasan yang melebihi kapasitas individu masing-masing.
* **Berpikir Sistem (*Systems Thinking*):** Disiplin fondasi kelima yang mengikat keempat disiplin lainnya; memandang organisasi sebagai keseluruhan yang saling berhubungan, bukan bagian-bagian terpisah.

---

## Fondasi Krusial: Psychological Safety

Studi komprehensif Project Aristotle oleh Google menemukan bahwa faktor penentu utama efektivitas tim berkinerja tinggi bukanlah latar belakang gelar akademik anggotanya, melainkan **Psychological Safety** (keamanan psikologis).

Sebagaimana dirumuskan oleh Prof. Amy Edmondson dari Harvard Business School, *psychological safety* adalah keyakinan bersama bahwa tim tidak akan mempermalukan, menolak, atau menghukum seseorang hanya karena ia mengajukan pertanyaan bodoh, mengakui kesalahan eksperimen, atau mengusulkan gagasan radikal baru.

Tanpa keamanan psikologis:
- Anggota tim menyembunyikan kesalahan agar tidak ditegur.
- Tidak ada inovasi nyata karena semua orang takut mengambil risiko terukur.
- Pengetahuan tacit tidak pernah dibagikan karena rasa curiga antarrekan.

Di ZETARAZ, setiap tulisan, riset, dan interaksi dirancang untuk menyuburkan rasa ingin tahu intelektual yang tulus dan semangat belajar tanpa henti.`
    },
    {
      title: 'Manajemen Pengetahuan Berbasis AI: Mengintegrasikan Ontologi dan Graf Pengetahuan Enterprise',
      slug: 'manajemen-pengetahuan-berbasis-ai-ontologi-graf',
      subtitle: 'Menghubungkan entitas konsep, taksonomi formal, dan Large Language Models menggunakan Knowledge Graph.',
      excerpt: 'Gabungan antara graf pengetahuan (Knowledge Graph) dan penalaran LLM menghasilkan sistem KMS generasi baru yang tahan halusinasi dan dapat ditelusuri kebenarannya.',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 620,
      readTimeMinutes: 7,
      categoryId: catKnowledge.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Grafik jaringan pengetahuan: Merepresentasikan keterhubungan fakta secara semantik.',
      seoTitle: 'Manajemen Pengetahuan Berbasis AI & Knowledge Graph | ZETARAZ',
      seoDescription: 'Bagaimana arsitektur Graph RAG menggabungkan Knowledge Graph terstruktur dengan model fondasi LLM untuk KMS enterprise.',
      tags: ['kms', 'artificial-intelligence', 'data-analytics'],
      publishedAt: new Date('2026-11-10T13:20:00Z'),
      content: `## Menjembatani Simbolik dan Probabilistik

Dunia kecerdasan buatan memiliki dua mazhab utama:
1. **AI Simbolik (Knowledge Graphs, Ontologi, Logika Formal):** Sangat presisi, 100% dapat ditelusuri (*explainable*), patuh pada kaidah logika bisnis, tetapi kaku dan sulit memproses bahasa alami yang bebas.
2. **AI Koneksionis / Probabilistik (Deep Learning, LLM):** Sangat fleksibel memahami konteks manusia dan menghasilkan bahasa alami yang luwes, tetapi rentan halusinasi dan bertindak sebagai *black box*.

**Graph RAG (Retrieval-Augmented Generation berbasis Graf)** adalah konvergensi terbaik dari kedua dunia ini:

\`\`\`
   Kueri Pengguna ---> [ Agen Pengurai Kueri ]
                               |
                               +---> [ Navigasi Graf Pengetahuan (Fakta Terverifikasi) ]
                               |           |
                               |           v
                               +---> [ Konteks Graf Terstruktur ]
                               |           |
                               v           v
                     [ Sintesis LLM Terarah ] ---> Jawaban Akurat & Rujukan Sahih
\`\`\`

Dengan memetakan aset informasi enterprise ke dalam graf pengetahuan, setiap jawaban yang dihasilkan oleh KMS dapat dibuktikan dengan rujukan eksplisit ke node entitas terverifikasi.`
    }
  ];

  for (const art of articles) {
    const { tags, ...artData } = art;
    const createdArticle = await prisma.article.create({
      data: artData,
    });

    if (tags && tags.length > 0) {
      for (const tSlug of tags) {
        if (createdTags[tSlug]) {
          await prisma.articleTag.create({
            data: {
              articleId: createdArticle.id,
              tagId: createdTags[tSlug].id,
            },
          });
        }
      }
    }
  }

  console.log('--- Creating Sample Newsletter Subscribers ---');
  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: 'rector.office@university.ac.id' },
      { email: 'director.strategy@enterprise.co.id' },
      { email: 'research.fellow@thinktank.org' },
    ],
  });

  console.log('--- Database Seeding Complete! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
