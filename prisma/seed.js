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
      name: 'Rizky Aditya Pratama Wijaya',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Penulis dan kurator di ZETARAZ Knowledge. Berbagi pengetahuan dan pengalaman seputar manajemen informasi, teknologi, dan arsitektur sistem.',
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'farah.zulaikha@zetaraz.com',
      passwordHash,
      name: 'Farah Zulaikha, M.Sc.',
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Peminat sains data dan kecerdasan buatan. Berfokus pada penulisan edukatif dan panduan praktis analitika.',
    },
  });

  console.log('--- Creating Categories according to Public Navigation ---');
  // 6 Main Categories
  const catKnowledge = await prisma.category.create({
    data: {
      name: 'Knowledge',
      slug: 'knowledge',
      description: 'Prinsip organisasi informasi, metodologi berbagi pengetahuan, literasi kognitif, dan konsep dasar lintas disiplin ilmu.',
      icon: 'BookOpen',
      order: 1,
    },
  });

  const catTechnology = await prisma.category.create({
    data: {
      name: 'Technology',
      slug: 'technology',
      description: 'Kecerdasan buatan, rekayasa perangkat lunak, keamanan siber, dan eksplorasi perkakas digital modern.',
      icon: 'Cpu',
      order: 2,
    },
  });

  const catScienceResearch = await prisma.category.create({
    data: {
      name: 'Science & Research',
      slug: 'science-research',
      description: 'Metodologi penelitian saintifik, ulasan bukti empiris, penalaran logis, dan telaah literatur ilmiah terbuka.',
      icon: 'FlaskConical',
      order: 3,
    },
  });

  const catDataAnalytics = await prisma.category.create({
    data: {
      name: 'Data & Analytics',
      slug: 'data-analytics',
      description: 'Sains data, teknik visualisasi, analitika statistik, dan praktik pengolahan data terstruktur untuk pemecahan masalah.',
      icon: 'BarChart3',
      order: 4,
    },
  });

  const catBusinessManagement = await prisma.category.create({
    data: {
      name: 'Business & Management',
      slug: 'business-management',
      description: 'Manajemen proses bisnis (BPM), arsitektur organisasi, perencanaan strategis, dan praktik operasional efektif.',
      icon: 'Briefcase',
      order: 5,
    },
  });

  const catLearning = await prisma.category.create({
    data: {
      name: 'Learning',
      slug: 'learning',
      description: 'Panduan langkah-demi-langkah, catatan pengalaman praktis, studi kasus nyata, dan bahan belajar mandiri.',
      icon: 'GraduationCap',
      order: 6,
    },
  });

  console.log('--- Creating Tags ---');
  const tagList = [
    { name: 'Knowledge Sharing', slug: 'knowledge-sharing' },
    { name: 'Pengalaman Praktis', slug: 'pengalaman-praktis' },
    { name: 'Tutorial', slug: 'tutorial' },
    { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    { name: 'Data Science', slug: 'data-science' },
    { name: 'Cybersecurity', slug: 'cybersecurity' },
    { name: 'Metodologi Riset', slug: 'metodologi-riset' },
    { name: 'BPM', slug: 'bpm' },
    { name: 'Enterprise Architecture', slug: 'enterprise-architecture' },
    { name: 'Continuous Learning', slug: 'continuous-learning' },
  ];

  const createdTags = {};
  for (const t of tagList) {
    createdTags[t.slug] = await prisma.tag.create({ data: t });
  }

  console.log('--- Creating 10+ Detailed Knowledge & Experience Articles ---');

  const articles = [
    {
      title: 'Membangun Kebiasaan Berbagi Pengetahuan: Menjaga Wawasan Tetap Hidup dan Bermakna',
      slug: 'membangun-kebiasaan-berbagi-pengetahuan',
      subtitle: 'Bagaimana membiasakan dokumentasi dan pertukaran pengalaman sederhana dapat memperkaya pemahaman kolektif kita bersama.',
      excerpt: 'Pengetahuan yang disimpan sendiri sering kali menguap seiring waktu. Berbagi pengetahuan dan pengalaman adalah cara terbaik merawat pemikiran kritis dan memperluas wawasan.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 1650,
      readTimeMinutes: 6,
      categoryId: catKnowledge.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Jaringan pemikiran: Setiap pengalaman yang dibagikan membuka perspektif baru bagi orang lain.',
      seoTitle: 'Membangun Kebiasaan Berbagi Pengetahuan | ZETARAZ Knowledge',
      seoDescription: 'Ulasan pentingnya berbagi pengetahuan dan pengalaman secara inklusif untuk merawat wawasan dan pemahaman bersama.',
      tags: ['knowledge-sharing', 'continuous-learning', 'pengalaman-praktis'],
      publishedAt: new Date('2026-10-15T09:00:00Z'),
      content: `## Pengetahuan Menjadi Bernilai Saat Diteruskan

Sering kali kita menganggap bahwa apa yang kita ketahui hanyalah hal biasa yang sudah dipahami semua orang. Padahal, sebuah cara kerja sederhana, sebuah kegagalan yang pernah kita lewati, atau pemahaman atas konsep rumit yang berhasil kita sederhanakan bisa menjadi jembatan pencerahan yang sangat berharga bagi orang lain.

Inilah filosofi dasar dari **ZETARAZ Knowledge — Berbagi Pengetahuan, Berbagi Pengalaman**.

> **Pesan Utama:** Pengetahuan bukan monopoli segelintir ahli. Pengetahuan tumbuh subur saat dirawat secara terbuka, didiskusikan secara sehat, dan dibagikan dengan bahasa yang mudah dipahami.

---

## Dari Pengalaman Pribadi Menuju Pengetahuan Kolektif

Dalam kehidupan sehari-hari dan profesional, kita senantiasa menghadapi dua bentuk wawasan:

1. **Pengetahuan Teoretis (*Explicit Knowledge*):** Apa yang tertulis dalam buku teks, dokumentasi resmi, atau panduan standar.
2. **Pengalaman Lapangan (*Tacit Knowledge*):** Intuisi, tips kecil di lapangan, pemecahan masalah tak terduga (*workaround*), dan pelajaran dari kesalahan nyata.

Tantangan terbesar adalah banyak pengalaman berharga tidak pernah dituliskan. Saat seseorang berpindah tempat atau berganti fokus, pengalaman tersebut ikut menghilang. Ketika kita mulai menuliskan pengalaman kita—baik dalam bentuk catatan ringkas, studi kasus, atau panduan praktis—kita sedang mengubah pengalaman pribadi menjadi aset pengetahuan yang bisa dipelajari siapa saja.

---

## Tiga Langkah Sederhana Memulai Berbagi

* **Catat Apa yang Baru Saja Anda Pelajari:** Jangan menunggu menjadi seorang pakar terlebih dahulu. Menulis saat baru memahami sesuatu justru menghasilkan penjelasan yang ramah pemula.
* **Fokus pada Kejujuran Konteks:** Jelaskan situasi riil, apa yang berhasil, dan apa yang ternyata gagal. Pelajaran dari kegagalan sering kali jauh lebih bernilai daripada cerita sukses yang disempurnakan.
* **Gunakan Bahasa yang Lugas:** Hindari penggunaan istilah teknis yang berlebihan tanpa penjelasan. Semakin sederhana kita mampu menjelaskan suatu konsep, semakin dalam sebenarnya pemahaman kita.

Berbagi pengetahuan bukan tentang pamer kepandaian, melainkan tentang membuka pintu agar orang lain dapat melangkah lebih jauh.`
    },
    {
      title: 'Catatan Praktis Manajemen Proses Bisnis (BPM): Dari Alur Kerja ke Kolaborasi Sehari-hari',
      slug: 'catatan-praktis-manajemen-proses-bisnis-bpm',
      subtitle: 'Membedah bagaimana alur kerja yang rapi membuat kerja tim menjadi transparan, terukur, dan minim miskomunikasi.',
      excerpt: 'BPM bukan sekadar diagram alir rumit di atas kertas, melainkan pemahaman bersama tentang bagaimana sebuah pekerjaan diselesaikan dari awal hingga akhir.',
      contentType: 'EXPERIENCE',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 1320,
      readTimeMinutes: 7,
      categoryId: catBusinessManagement.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Pemetaan proses: Mengurai kerumitan operasional menjadi alur kerja yang mudah dipahami seluruh tim.',
      seoTitle: 'Catatan Praktis Manajemen Proses Bisnis (BPM) | ZETARAZ Knowledge',
      seoDescription: 'Pelajari konsep dasar Business Process Management (BPM) dan bagaimana memetakan proses kerja nyata dengan standar BPMN 2.0.',
      tags: ['bpm', 'pengalaman-praktis', 'knowledge-sharing'],
      publishedAt: new Date('2026-10-18T10:30:00Z'),
      content: `## Menemukan Alur di Balik Kesibukan Rutin

Banyak tim bekerja keras setiap hari, namun sering kali merasa pekerjaan terasa lambat dan penuh gesekan. Setelah ditelusuri, masalahnya kerap kali bukan pada kemampuan individu, melainkan pada **ketidakjelasan alur proses**: siapa yang memulai, informasi apa yang dibutuhkan, dan ke mana hasil pekerjaan diserahkan.

Di sinilah **Business Process Management (BPM)** hadir sebagai kerangka berpikir praktis.

---

## Siklus Sederhana Perbaikan Proses

Proses kerja yang sehat tidak dirancang sekali lalu dibiarkan selamanya. Ia dirawat melalui siklus perbaikan terus-menerus:

\`\`\`
   [ 1. Amati & Petakan Alur Nyata ]
                 |
                 v
   [ 2. Temukan Titik Hambatan (Bottleneck) ]
                 |
                 v
   [ 3. Sederhanakan & Uji Coba Perubahan ]
                 |
                 v
   [ 4. Bagikan Cara Baru ke Seluruh Tim ]
\`\`\`

1. **Amati & Petakan (*Mapping*):** Tuliskan apa yang sebenarnya terjadi di lapangan, bukan apa yang idealnya tertulis di aturan lama.
2. **Identifikasi Hambatan (*Bottlenecks*):** Cari di mana berkas menumpuk paling lama atau bagian mana yang paling sering memicu pertanyaan berulang.
3. **Sederhanakan (*Simplify*):** Hilangkan persetujuan ganda yang tidak memberikan nilai tambah nyata.
4. **Dokumentasikan & Diskusikan:** Buat diagram alur ringkas menggunakan simbol standar yang mudah dimengerti bersama.

Dengan melihat alur secara visual, tim dapat berkolaborasi mencari solusi tanpa saling menyalahkan.`
    },
    {
      title: 'Mengenal Dasar Arsitektur Enterprise: Menjembatani Kebutuhan Nyata dengan Solusi Teknologi',
      slug: 'mengenal-dasar-arsitektur-enterprise',
      subtitle: 'Memahami bagaimana menyusun cetak biru teknologi yang selaras dengan tujuan organisasi tanpa kerumitan tak perlu.',
      excerpt: 'Arsitektur Enterprise membantu kita melihat gambaran besar: bagaimana data, aplikasi, dan infrastruktur saling terhubung untuk mendukung kegiatan sehari-hari.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: true,
      viewCount: 1140,
      readTimeMinutes: 8,
      categoryId: catBusinessManagement.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Struktur arsitektur: Menjaga keteraturan sistem agar tetap adaptif terhadap kebutuhan masa depan.',
      seoTitle: 'Mengenal Dasar Arsitektur Enterprise | ZETARAZ Knowledge',
      seoDescription: 'Penjelasan mudah dipahami seputar Arsitektur Enterprise, empat domain utama, dan cara merancang arsitektur sistem informasi.',
      tags: ['enterprise-architecture', 'knowledge-sharing', 'bpm'],
      publishedAt: new Date('2026-10-22T08:15:00Z'),
      content: `## Membangun dengan Cetak Biru yang Jelas

Ketika sebuah sistem bertumbuh tanpa rencana matang, kita sering mendapati aplikasi yang saling tumpang tindih, data yang tidak konsisten antar bagian, dan infrastruktur yang sulit dipelihara.

**Arsitektur Enterprise (Enterprise Architecture / EA)** berfungsi seperti rencana tata ruang kota: memastikan jalan tersambung, pasokan air mengalir lancar, dan bangunan baru didirikan pada zonasi yang tepat.

---

## Empat Sudut Pandang Arsitektur

Secara umum, arsitektur sistem ditinjau dari empat lapisan:

* **Lapisan Kebutuhan & Aktivitas (*Business*):** Apa tujuan yang ingin dicapai dan aktivitas apa yang dijalankan.
* **Lapisan Data & Informasi (*Data*):** Informasi apa saja yang mengalir dan bagaimana struktur datanya dijaga agar valid.
* **Lapisan Aplikasi (*Application*):** Aplikasi dan perangkat lunak apa yang digunakan untuk mengolah data tersebut.
* **Lapisan Teknologi & Infrastruktur (*Technology*):** Server, jaringan, sistem operasi, dan perangkat keras yang menopang seluruh aplikasi.

Memahami keterkaitan keempat lapisan ini membantu siapa saja—baik teknisi maupun pegiat manajemen—dalam mengambil keputusan yang rasional dan berkelanjutan.`
    },
    {
      title: 'Bagaimana Kecerdasan Buatan Membantu Pengolahan Pengetahuan Sehari-hari',
      slug: 'bagaimana-kecerdasan-buatan-membantu-pengolahan-pengetahuan',
      subtitle: 'Pemanfaatan model bahasa modern sebagai mitra berpikir untuk membaca literatur, menyusun ringkasan, dan memicu ide baru.',
      excerpt: 'Kecerdasan Buatan (AI) kini dapat diakses siapa saja untuk membantu merangkum informasi panjang, mencari keterkaitan antar konsep, dan mempercepat proses belajar.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1890,
      readTimeMinutes: 7,
      categoryId: catTechnology.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Kolaborasi manusia dan mesin: AI sebagai alat bantu eksplorasi ide dan penajaman wawasan.',
      seoTitle: 'AI untuk Pengolahan Pengetahuan Sehari-hari | ZETARAZ Knowledge',
      seoDescription: 'Panduan praktis memanfaatkan kecerdasan buatan (AI) untuk sintesis informasi, riset literatur, dan pembelajaran mandiri.',
      tags: ['artificial-intelligence', 'knowledge-sharing', 'tutorial'],
      publishedAt: new Date('2026-10-25T11:00:00Z'),
      content: `## Kecerdasan Buatan Sebagai Mitra Belajar

Dahulu, mencari dan menyaring ratusan referensi memerlukan waktu berminggu-minggu di perpustakaan. Kini, kehadiran model bahasa besar (*Large Language Models*) memungkinkan kita berdialog dengan dokumen, mengekstraksi poin-poin utama, dan menguji pemahaman kita terhadap suatu konsep secara interaktif.

Namun, agar AI benar-benar bermanfaat dan tidak justru menyesatkan, kita perlu memahami cara memanfaatkannya secara tepat.

---

## Praktik Baik Menggunakan AI untuk Belajar

1. **Gunakan Sebagai Pemicu Diskusi, Bukan Jawaban Mutlak:** Perlakukan AI seperti rekan diskusi yang pintar namun terkadang bisa keliru (*hallucination*). Selalu lakukan cek silang (*fact checking*) terhadap sumber primer.
2. **Ajukan Perintah (*Prompt*) dengan Konteks yang Jelas:** Jelaskan latar belakang masalah dan format jawaban yang Anda harapkan. Alih-alih bertanya "Jelaskan data analytics", lebih baik tanyakan "Jelaskan perbedaan data analytics deskriptif dan prediktif beserta contoh kasus di perpustakaan".
3. **Minta Penjelasan dari Sudut Pandang Berbeda:** Minta AI untuk menjelaskan sebuah topik dengan analogi sederhana atau dari perspektif yang berlawanan untuk mengasah nalar kritis.

Dengan pendekatan yang bijak, teknologi AI menjadi katalis luar biasa dalam memperluas wawasan dan mempermudah kita memahami ilmu-ilmu baru.`
    },
    {
      title: 'Dasar Sains Data: Mengubah Catatan dan Angka Mentah Menjadi Wawasan Bermanfaat',
      slug: 'dasar-sains-data-mengubah-catatan-menjadi-wawasan',
      subtitle: 'Memahami alur dasar pengolahan data dari pengumpulan, pembersihan, eksplorasi grafik, hingga penarikan kesimpulan jujur.',
      excerpt: 'Data yang melimpah tidak ada artinya jika kita tidak tahu cara mengajukan pertanyaan yang tepat dan membaca pesan di balik angka-angka tersebut.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1420,
      readTimeMinutes: 7,
      categoryId: catDataAnalytics.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Grafik analitika: Membaca cerita dan tren yang tersembunyi di balik baris data.',
      seoTitle: 'Dasar Sains Data & Analitika Praktis | ZETARAZ Knowledge',
      seoDescription: 'Pelajari dasar-dasar analitika data: eksplorasi data, pembersihan data mentah, visualisasi grafik, dan interpretasi statistik.',
      tags: ['data-science', 'tutorial', 'pengalaman-praktis'],
      publishedAt: new Date('2026-10-28T14:00:00Z'),
      content: `## Memulai Perjalanan Sains Data

Sains data kerap digambarkan sebagai bidang yang sangat rumit dan penuh rumus matematika tingkat tinggi. Namun pada intinya, sains data adalah **seni mendengarkan cerita yang ingin disampaikan oleh data**.

Apakah pengunjung perpustakaan meningkat di akhir pekan? Kategori materi apa yang paling banyak dicari? Pertanyaan-pertanyaan praktis seperti inilah yang menjadi titik awal analitika data.

---

## Empat Tahap Inti dalam Eksplorasi Data

* **1. Memahami Masalah (*Define the Question*):** Jangan mulai dengan data, mulailah dengan pertanyaan. Apa keputusan atau wawasan yang ingin kita peroleh?
* **2. Membersihkan Data (*Data Cleansing*):** Tahap yang sering memakan waktu paling banyak. Memperbaiki data yang salah ketik, menghapus baris duplikat, dan merapikan format tanggal.
* **3. Eksplorasi Visual (*Exploratory Data Analysis*):** Menggambar grafik batang, scatter plot, atau distribusi untuk melihat kebiasaan dan anomali (*outliers*).
* **4. Interpretasi yang Beretika:** Menafsirkan temuan apa adanya tanpa memaksakan angka agar sesuai dengan prasangka awal kita.

Data adalah cermin kenyataan; membacanya dengan teliti membantu kita mengambil langkah yang lebih tepat.`
    },
    {
      title: 'Prinsip Dasar Keamanan Siber: Melindungi Identitas dan Data Digital Kita',
      slug: 'prinsip-dasar-keamanan-siber',
      subtitle: 'Langkah-langkah esensial menjaga keamanan akun, mengenali upaya phishing, dan menerapkan verifikasi dua langkah.',
      excerpt: 'Keamanan digital bukan hanya urusan tim IT perusahaan besar. Setiap orang yang berinteraksi di internet perlu memahami kebiasaan higienis keamanan siber.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1210,
      readTimeMinutes: 6,
      categoryId: catTechnology.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Keamanan digital: Melindungi batas privasi dan integritas data dari akses tak sah.',
      seoTitle: 'Prinsip Dasar Keamanan Siber untuk Semua | ZETARAZ Knowledge',
      seoDescription: 'Panduan mudah memahami keamanan siber: kata sandi yang kuat, 2FA, pencegahan rekayasa sosial (phishing), dan enkripsi.',
      tags: ['cybersecurity', 'knowledge-sharing', 'tutorial'],
      publishedAt: new Date('2026-11-01T08:00:00Z'),
      content: `## Menjaga Ruang Digital Kita Tetap Aman

Di zaman serba terhubung, kita menyimpan data perbankan, riwayat komunikasi pribadi, dan dokumen pekerjaan di perangkat digital kita. Sebagian besar insiden kebocoran akun terjadi bukan karena peretasan canggih terhadap enkripsi, melainkan karena kebiasaan keamanan yang lalai—seperti kata sandi yang sama di semua situs atau terkecoh tautan palsu (*phishing*).

---

## Tiga Kebiasaan Higienis yang Wajib Dilakukan

1. **Gunakan Pengelola Kata Sandi (*Password Manager*):** Jangan menghafal kata sandi rumit untuk puluhan akun. Gunakan pengelola kata sandi terpercaya agar tiap akun memiliki sandi unik dan panjang.
2. **Aktifkan Autentikasi Dua Faktor (2FA):** 2FA adalah lapisan pelindung terpenting. Meskipun seseorang mengetahui kata sandi Anda, mereka tetap tidak dapat masuk tanpa kode konfirmasi di perangkat fisik Anda.
3. **Selalu Curiga Terhadap Pesan yang Mendesak:** Penyerang rekayasa sosial sering memanfaatkan kepanikan atau iming-iming hadiah mendesak untuk memancing kita mengklik tautan berbahaya.

Menjaga keamanan diri di ruang maya adalah bentuk tanggung jawab digital yang melindungi diri kita dan orang-orang di sekitar kita.`
    },
    {
      title: 'Pengantar Metodologi Penelitian: Dari Rasa Ingin Tahu Menuju Bukti yang Sahih',
      slug: 'pengantar-metodologi-penelitian',
      subtitle: 'Memahami cara merumuskan pertanyaan yang dapat diuji, mengumpulkan bukti sistematis, dan menguji kebenaran hipotesis.',
      excerpt: 'Metodologi penelitian adalah cara kita melatih akal sehat agar tidak mudah tertipu oleh asumsi pribadi atau informasi yang tidak berdasar.',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1390,
      readTimeMinutes: 8,
      categoryId: catScienceResearch.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Laboratorium penyelidikan: Menguji kebenaran pernyataan melalui observasi dan metode terstruktur.',
      seoTitle: 'Pengantar Metodologi Penelitian | ZETARAZ Knowledge',
      seoDescription: 'Pelajari dasar-dasar metodologi penelitian ilmiah: perumusan masalah, observasi empiris, pengujian hipotesis, dan kejujuran data.',
      tags: ['metodologi-riset', 'knowledge-sharing', 'continuous-learning'],
      publishedAt: new Date('2026-11-03T10:00:00Z'),
      content: `## Semangat Penyelidikan Saintifik

Apa yang membedakan klaim ilmiah dari sekadar kabar angin atau opini pribadi? Jawabannya terletak pada **metodologi**.

Sebuah pengetahuan ilmiah dibangun melalui proses pengamatan yang transparan, dapat diulang oleh peneliti lain (*replicable*), dan terbuka untuk dibuktikan salah jika fakta di lapangan memang tidak mendukung (*falsifiable*).

---

## Langkah-Langkah Pokok Penyelidikan

\`\`\`
1. Observasi Fenomena & Rasa Ingin Tahu
                 |
                 v
2. Perumusan Masalah yang Jelas & Spesifik
                 |
                 v
3. Tinjauan Pustaka & Pengetahuan yang Sudah Ada
                 |
                 v
4. Pengumpulan Bukti & Data Lapangan
                 |
                 v
5. Analisis Kritis & Penarikan Simpulan Terbuka
\`\`\`

Riset yang baik dimulai dengan kerendahan hati intelektual: mengakui apa yang belum kita ketahui dan berani mengoreksi pemikiran lama saat bukti baru ditemukan.`
    },
    {
      title: 'Membaca Bukti Ilmiah dan Menilai Kredibilitas Informasi',
      slug: 'membaca-bukti-ilmiah-dan-menilai-kredibilitas-informasi',
      subtitle: 'Membedakan korelasi dari hubungan sebab-akibat serta mewaspadai klaim sensasional yang mencatut sains.',
      excerpt: 'Di tengah banjir informasi internet, kemampuan menyaring mana bukti kuat dan mana sekadar cocoklogi adalah ketrampilan literasi paling berharga.',
      contentType: 'RESEARCH',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 970,
      readTimeMinutes: 7,
      categoryId: catScienceResearch.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Penelaahan kritis: Menimbang bukti dengan teliti sebelum menarik kesimpulan.',
      seoTitle: 'Membaca Bukti Ilmiah & Kredibilitas Informasi | ZETARAZ Knowledge',
      seoDescription: 'Kiat mengenali kredibilitas informasi: piramida bukti ilmiah, perbedaan korelasi dan kausalitas, serta verifikasi sumber primer.',
      tags: ['metodologi-riset', 'knowledge-sharing', 'continuous-learning'],
      publishedAt: new Date('2026-11-05T09:30:00Z'),
      content: `## Tidak Semua Klaim Memiliki Bobot yang Sama

Sering kita jumpai judul berita dengan awalan "Menurut Penelitian Terbaru...". Namun jika ditelusuri ke naskah aslinya, penelitian tersebut mungkin hanya diuji pada sampel yang sangat kecil atau bahkan sekadar jajak pendapat daring tanpa kontrol metodologis.

Memahami **hierarki bukti ilmiah** membantu kita bersikap adil dan rasional dalam menerima kabar.

---

## Prinsip Penting: Korelasi Bukan Kausalitas

Dua hal yang terjadi bersamaan tidak otomatis memiliki hubungan sebab-akibat (*correlation does not imply causation*). Sebagai contoh, penjualan es krim meningkat bersamaan dengan tingkat orang tenggelam di kolam renang; bukan karena es krim menyebabkan tenggelam, melainkan karena keduanya sama-sama dipengaruhi oleh cuaca panas musim kemarau.

Menyadari hal ini mencegah kita dari mengambil kesimpulan yang salah dalam kehidupan sehari-hari.`
    },
    {
      title: 'Pengalaman Mengelola Perubahan: Belajar Beradaptasi dengan Cara Kerja Baru',
      slug: 'pengalaman-mengelola-perubahan-cara-kerja-baru',
      subtitle: 'Refleksi pengalaman nyata saat mengenalkan sistem baru dan bagaimana komunikasi yang terbuka mempermudah adaptasi tim.',
      excerpt: 'Menerapkan teknologi baru selalu lebih mudah daripada mengubah kebiasaan lama. Kuncinya terletak pada empati, mendengarkan keluhan, dan memberi ruang belajar.',
      contentType: 'EXPERIENCE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1250,
      readTimeMinutes: 7,
      categoryId: catBusinessManagement.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Dialog terbuka: Menjembatani kebiasaan lama menuju cara kerja baru yang lebih efektif.',
      seoTitle: 'Pengalaman Mengelola Perubahan Cara Kerja | ZETARAZ Knowledge',
      seoDescription: 'Catatan pengalaman praktis mengelola perubahan organisasi, mengatasi resistensi, dan membangun komunikasi tim yang saling percaya.',
      tags: ['pengalaman-praktis', 'bpm', 'knowledge-sharing'],
      publishedAt: new Date('2026-11-07T11:15:00Z'),
      content: `## Mengapa Adaptasi Sering Terasa Berat?

Ketika sebuah alat kerja baru diperkenalkan, reaksi pertama yang muncul dari tim sering kali adalah keengganan. Reaksi ini wajar: orang merasa nyaman dengan rutinitas yang sudah mereka kuasai, dan hal baru selalu membawa rasa cemas akan kemungkinan melakukan kesalahan.

Dari berbagai pengalaman mendampingi proses perubahan, faktor teknologi hanya menyumbang 20% keberhasilan; 80% sisanya adalah tentang **bagaimana manusia di dalamnya diajak bicara dan didengarkan**.

---

## Tiga Hal yang Terbukti Membantu

* **Jelaskan 'Mengapa', Bukan Hanya 'Bagaimana':** Orang rela belajar hal rumit jika mereka paham apa manfaatnya bagi kemudahan kerja mereka sendiri di masa depan.
* **Rayakan Keberhasilan Kecil Awal:** Berikan apresiasi kepada anggota tim yang pertama kali mencoba alur baru, agar rasa percaya diri menular ke rekan lainnya.
* **Buka Ruang Kritik yang Aman:** Dengarkan masukan mengenai bagian alur yang terasa kaku dan jangan ragu melakukan penyesuaian lapangan.

Perubahan yang langgeng adalah perubahan yang dirangkul bersama secara sukarela.`
    },
    {
      title: 'Belajar Sepanjang Hayat: Menumbuhkan Rasa Ingin Tahu yang Tak Pernah Padam',
      slug: 'belajar-sepanjang-hayat-continuous-learning',
      subtitle: 'Menjaga kegembiraan belajar, berani melupakan kebiasaan usang (unlearn), dan membuka diri pada wawasan baru setiap hari.',
      excerpt: 'Dalam dunia yang terus bergerak, kemampuan untuk belajar, berhenti mempraktikkan cara usang, dan mempelajari hal baru adalah kekuatan sejati setiap pembelajar mandiri.',
      contentType: 'PERSPECTIVE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1720,
      readTimeMinutes: 6,
      categoryId: catLearning.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Semangat belajar: Menjelajahi cakrawala pengetahuan baru dengan rasa ingin tahu yang tulus.',
      seoTitle: 'Belajar Sepanjang Hayat (Continuous Learning) | ZETARAZ Knowledge',
      seoDescription: 'Esai reflektif mengenai pentingnya continuous learning, unlearning, dan kegembiraan menjelajahi ilmu-ilmu baru sepanjang hayat.',
      tags: ['continuous-learning', 'knowledge-sharing', 'pengalaman-praktis'],
      publishedAt: new Date('2026-11-09T08:45:00Z'),
      content: `## Menjadi Pembelajar yang Merdeka

Pendidikan formal kita mungkin selesai pada jenjang tertentu, namun proses belajar sejati tidak pernah memiliki batas akhir. Dunia di sekitar kita terus bertransformasi—teknologi baru muncul, paradigma ilmiah diperbarui, dan dinamika sosial kian kaya warna.

Menjadi pembelajar sepanjang hayat (*lifelong learner*) bukan berarti harus membebani diri dengan target akademis yang kaku, melainkan **menjaga agar rasa ingin tahu anak-anak di dalam diri kita tetap hidup**.

---

## Siklus Belajar yang Fleksibel: Learn, Unlearn, Relearn

Alvin Toffler pernah menulis bahwa orang yang buta huruf di masa depan bukanlah mereka yang tidak bisa membaca, melainkan mereka yang tidak bisa belajar (*learn*), melepaskan pemikiran lama (*unlearn*), dan belajar kembali (*relearn*).

* **Learn:** Mengumpulkan wawasan dan ketrampilan baru dari membaca, mengamati, dan mencoba.
* **Unlearn:** Berani mengakui bahwa metode yang dulu sukses mungkin sudah tidak relevan lagi dengan kondisi saat ini.
* **Relearn:** Mempelajari kembali prinsip-prinsip dasar dengan kacamata yang lebih segar dan kontekstual.

Di ZETARAZ Knowledge, kami mengajak Anda untuk terus membuka diri, membaca, dan saling berbagi pengalaman. Karena di setiap wawasan yang kita bagikan, ada inspirasi yang tumbuh mekar bagi orang lain.`
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
      { email: 'pembaca.aktif@zetaraz.org' },
      { email: 'komunitas.belajar@indonesia.id' },
    ],
  });

  console.log('--- Database Seeding Complete for ZETARAZ Knowledge! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
