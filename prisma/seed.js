const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Cleaning previous data ---');
  await prisma.syncHistory.deleteMany();
  await prisma.publicationHistory.deleteMany();
  await prisma.articleVersion.deleteMany();
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
      bio: 'Penulis dan kurator di ZETARAZ Knowledge. Berbagi pengetahuan dan pengalaman seputar manajemen informasi, teknologi, tata kelola, dan minat kreatif.',
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'farah.zulaikha@zetaraz.com',
      passwordHash,
      name: 'Farah Zulaikha, M.Sc.',
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      bio: 'Peminat sains data, teknologi, dan literasi sosial. Berfokus pada penulisan edukatif dan panduan praktis analitika.',
    },
  });

  console.log('--- Creating 3 Core Categories (Pengetahuan, Pengalaman, Opini) ---');
  const catPengetahuan = await prisma.category.create({
    data: {
      name: 'Pengetahuan',
      slug: 'pengetahuan',
      description: 'Panduan konsep, teori terstruktur, tutorial teknis, dan wawasan edukatif lintas disiplin ilmu.',
      icon: 'BookOpen',
      order: 1,
    },
  });

  const catPengalaman = await prisma.category.create({
    data: {
      name: 'Pengalaman',
      slug: 'pengalaman',
      description: 'Catatan lapangan nyata, studi kasus empiris, perjalanan implementasi, dan pembelajaran praktis.',
      icon: 'Compass',
      order: 2,
    },
  });

  const catOpini = await prisma.category.create({
    data: {
      name: 'Opini',
      slug: 'opini',
      description: 'Sudut pandang pemikiran, esai kritis, refleksi pribadi, dan analisis perspektif masa depan.',
      icon: 'PenTool',
      order: 3,
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
    { name: 'BPM', slug: 'bpm' },
    { name: 'Enterprise Architecture', slug: 'enterprise-architecture' },
    { name: 'Continuous Learning', slug: 'continuous-learning' },
    { name: 'Kreativitas & Hobi', slug: 'kreativitas-hobi' },
    { name: 'Literasi Digital', slug: 'literasi-digital' },
    { name: 'Komunitas & Sosial', slug: 'komunitas-sosial' },
  ];

  const createdTags = {};
  for (const t of tagList) {
    createdTags[t.slug] = await prisma.tag.create({ data: t });
  }

  console.log('--- Creating 13 Curated Articles across the 4 Categories ---');

  const articles = [
    // ==================== 1. SOSIAL ====================
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
      categoryId: catOpini.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Jaringan pemikiran: Setiap pengalaman yang dibagikan membuka perspektif baru bagi orang lain.',
      seoTitle: 'Membangun Kebiasaan Berbagi Pengetahuan | ZETARAZ Knowledge',
      seoDescription: 'Ulasan pentingnya berbagi pengetahuan dan pengalaman secara inklusif untuk merawat wawasan dan pemahaman bersama.',
      tags: ['knowledge-sharing', 'continuous-learning', 'komunitas-sosial'],
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

    // ==================== 2. PENGALAMAN ====================
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
      categoryId: catPengalaman.id,
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

1. **Amati & Petakan (*Mapping*):** Tuliskan apa yang sebenarnya terjadi di lapangan, bukan apa yang idealnya tertulis di aturan lama.
2. **Identifikasi Hambatan (*Bottlenecks*):** Cari di mana berkas menumpuk paling lama atau bagian mana yang paling sering memicu pertanyaan berulang.
3. **Sederhanakan (*Simplify*):** Hilangkan persetujuan ganda yang tidak memberikan nilai tambah nyata.
4. **Dokumentasikan & Diskusikan:** Buat diagram alur ringkas menggunakan simbol standar yang mudah dimengerti bersama.

Dengan melihat alur secara visual, tim dapat berkolaborasi mencari solusi tanpa saling menyalahkan.`
    },

    // ==================== 3. PENGETAHUAN ====================
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
      categoryId: catPengetahuan.id,
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

Secara umum, EA membagi sistem ke dalam empat lapisan mendasar:

1. **Arsitektur Bisnis:** Proses kerja utama, struktur tim, dan tujuan yang ingin dicapai.
2. **Arsitektur Data:** Di mana informasi penting disimpan dan bagaimana data dialirkan secara aman.
3. **Arsitektur Aplikasi:** Aplikasi apa saja yang digunakan dan bagaimana mereka berinteraksi lewat API.
4. **Arsitektur Teknologi / Infrastruktur:** Server, jaringan, komputasi awan (*cloud*), dan perangkat pendukung.

Kunci keberhasilan EA bukan pada tebalnya dokumen dokumentasi, melainkan pada kejelasan komunikasi antar pengambil keputusan dan tim pengembang.`
    },

    // ==================== 4. PENGETAHUAN ====================
    {
      title: 'Bagaimana Kecerdasan Buatan Membantu Pengolahan Pengetahuan: Dari Data Menjadi Pemahaman',
      slug: 'bagaimana-kecerdasan-buatan-membantu-pengolahan-pengetahuan',
      subtitle: 'Menelaah peran model bahasa besar (LLM) dan otomasi cerdas sebagai asisten berpikir, bukan pengganti nalar kritis.',
      excerpt: 'Kecerdasan buatan membuka babak baru dalam cara kita mengorganisasi wawasan. Namun kunci utamanya tetap berada pada kemampuan manusia memvalidasi konteks dan menguji kebenaran.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1480,
      readTimeMinutes: 7,
      categoryId: catPengetahuan.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Sinergi kognitif: Menjadikan teknologi sebagai mitra untuk mengeksplorasi wawasan lebih mendalam.',
      seoTitle: 'Kecerdasan Buatan & Pengolahan Pengetahuan | ZETARAZ Knowledge',
      seoDescription: 'Ulasan praktis penerapan AI dan LLM dalam manajemen pengetahuan pribadi serta organisasi.',
      tags: ['artificial-intelligence', 'knowledge-sharing', 'pengalaman-praktis'],
      publishedAt: new Date('2026-10-25T14:00:00Z'),
      content: `## Melampaui Euforia Teknologi

Kehadiran model bahasa besar (*Large Language Models / LLM*) telah mengubah lanskap pencarian dan pengolahan teks secara dramatis. Jika sebelumnya kita membutuhkan waktu berjam-jam untuk merangkum dokumen panjang atau menyusun draf awal, kini kita dapat memperoleh bantuan dalam hitungan detik.

Namun, pertanyaan pentingnya adalah: **Apakah informasi yang lebih cepat secara otomatis membuat kita lebih berpengetahuan?**

---

## AI sebagai Mitra Berpikir (*Thinking Partner*)

Cara terbaik memanfaatkan AI dalam manajemen pengetahuan adalah menjadikannya sebagai *sparring partner* intelektual:

* **Meringkas dan Menemukan Pola:** Mengidentifikasi tema utama dari kumpulan catatan lapangan atau transkrip wawancara.
* **Menantang Asumsi (*Devil's Advocate*):** Meminta model untuk memberikan kritik terhadap argumen yang sedang kita bangun.
* **Memformat Struktur Tulisan:** Membantu menata outline atau merapikan bahasa agar lebih mudah dibaca oleh pemula.

Tetap ingat: **Kebenaran fakta dan kedalaman empati tetap menjadi domain mutlak manusia.** Selalu lakukan verifikasi mandiri atas setiap rujukan yang dihasilkan oleh mesin.`
    },

    // ==================== 5. PENGETAHUAN ====================
    {
      title: 'Dasar Sains Data: Mengubah Catatan Menjadi Wawasan Terukur yang Bermakna',
      slug: 'dasar-sains-data-mengubah-catatan-menjadi-wawasan',
      subtitle: 'Langkah demi langkah memahami data numerik dan kategori untuk menarik kesimpulan yang bertanggung jawab.',
      excerpt: 'Data tanpa narasi hanyalah deretan angka dingin. Sains data membantu kita mendengarkan cerita yang tersimpan di balik angka tersebut.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 990,
      readTimeMinutes: 9,
      categoryId: catPengetahuan.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Eksplorasi analitika: Membaca pola tersembunyi lewat representasi visual yang jernih.',
      seoTitle: 'Dasar Sains Data untuk Pemula | ZETARAZ Knowledge',
      seoDescription: 'Panduan ramah pemula tentang siklus analitika data, pembersihan data, dan penyajian grafik informatif.',
      tags: ['data-science', 'tutorial', 'knowledge-sharing'],
      publishedAt: new Date('2026-10-28T11:20:00Z'),
      content: `## Mengapa Kita Perlu Memahami Data?

Dalam dunia yang dipenuhi klaim dan opini, data kuantitatif memberikan jangkar objektivitas. Ketika kita mampu mengumpulkan data dengan jujur dan menganalisisnya secara cermat, kita dapat mengambil keputusan yang didasari bukti riil, bukan sekadar firasat semata.

---

## Siklus Sederhana Analitika Data

Untuk memulai proyek analisis sederhana, ada lima tahapan pokok yang biasa dilalui:

1. **Definisikan Pertanyaan:** Pertanyaan yang tepat jauh lebih penting daripada rumus yang rumit.
2. **Kumpulkan & Bersihkan Data (*Data Cleaning*):** 70% waktu biasanya dihabiskan untuk merapikan ejaan, menangani data hilang (*missing values*), dan menyeragamkan satuan.
3. **Analisis Deskriptif:** Hitung rata-rata, median, dan sebaran nilai untuk memahami karakter data secara menyeluruh.
4. **Visualisasikan:** Gunakan diagram batang atau garis yang sederhana. Hindari grafik 3D yang membingungkan mata.
5. **Tafsirkan & Ceritakan:** Jelaskan apa arti temuan tersebut bagi pembaca awam dengan bahasa yang jelas.`
    },

    // ==================== 6. PENGETAHUAN ====================
    {
      title: 'Prinsip Dasar Keamanan Siber untuk Pengguna Sehari-hari: Melindungi Aset Digital Pribadi',
      slug: 'prinsip-dasar-keamanan-siber',
      subtitle: 'Panduan praktis menjaga privasi, mengelola kata sandi, dan mewaspadai manipulasi sosial (phishing) di internet.',
      excerpt: 'Keamanan digital bukan hanya urusan pakar IT. Setiap orang yang berselancar di internet berhak dan mampu melindungi data pribadinya dengan langkah sederhana.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1210,
      readTimeMinutes: 6,
      categoryId: catPengetahuan.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Keamanan digital: Membangun pertahanan berlapis untuk melindungi data berharga.',
      seoTitle: 'Dasar Keamanan Siber Pribadi | ZETARAZ Knowledge',
      seoDescription: 'Tips praktis menjaga akun digital, mengenali tautan mencurigakan, dan mengaktifkan autentikasi dua faktor.',
      tags: ['cybersecurity', 'tutorial', 'pengalaman-praktis'],
      publishedAt: new Date('2026-11-01T09:10:00Z'),
      content: `## Mengapa Keamanan Digital Begitu Krusial?

Hampir seluruh aspek hidup kita kini memiliki jejak digital: rekening bank, komunikasi keluarga, riwayat kesehatan, hingga dokumen pekerjaan. Ancaman terbesar sering kali bukan datang dari peretasan canggih perangkat keras, melainkan dari kelalaian kecil dalam mengenali manipulasi sosial (*social engineering*).

---

## 4 Kebiasaan Utama Penjaga Akun

* **Aktifkan Verifikasi Dua Langkah (2FA / MFA):** Selalu gunakan aplikasi authenticator daripada SMS jika memungkinkan.
* **Gunakan Pengelola Kata Sandi (*Password Manager*):** Jangan pernah menggunakan satu kata sandi yang sama untuk beberapa layanan berbeda.
* **Periksa Alamat Pengirim Sebelum Mengeklik:** Pesan yang mendesak atau menawarkan hadiah tak masuk akal hampir selalu merupakan upaya penipuan (*phishing*).
* **Perbarui Perangkat Secara Berkala:** Pembaruan sistem operasi biasanya berisi tambalan keamanan penting untuk menutup celah yang baru ditemukan.`
    },

    // ==================== 7. PENGALAMAN ====================
    {
      title: 'Pengalaman Mengelola Perubahan: Merawat Adopsi Cara Kerja Baru di Tengah Tim',
      slug: 'pengalaman-mengelola-perubahan-cara-kerja-baru',
      subtitle: 'Pelajaran nyata tentang mengapa resistensi sering kali bukan soal penolakan, melainkan soal rasa takut akan ketidakpastian.',
      excerpt: 'Mengenalkan sistem atau perkakas baru selalu diiringi tantangan manusiawi. Kuncinya terletak pada empati, komunikasi transparan, dan pendampingan bertahap.',
      contentType: 'EXPERIENCE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 870,
      readTimeMinutes: 7,
      categoryId: catPengalaman.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Kolaborasi tim: Mendengarkan kekhawatiran sebelum menerapkan prosedur kerja baru.',
      seoTitle: 'Catatan Manajemen Perubahan Tim | ZETARAZ Knowledge',
      seoDescription: 'Refleksi praktis implementasi sistem baru dan strategi merawat adaptasi tim secara manusiawi.',
      tags: ['bpm', 'pengalaman-praktis', 'knowledge-sharing'],
      publishedAt: new Date('2026-11-03T13:45:00Z'),
      content: `## Di Balik Penolakan Sistem Baru

Sering kali para perancang sistem merasa heran: "Mengapa aplikasi yang sudah kita buat sebagus ini tidak mau digunakan oleh tim lapangan?"

Setelah duduk bersama dan mendengarkan, jawabannya jarang berhubungan dengan fitur teknologi. Penyebab utamanya adalah **beban kognitif**: orang merasa pekerjaan lamanya yang sudah terbiasa kini terasa lambat karena harus mempelajari tombol baru, format baru, dan alur pelaporan baru.

---

## Strategi Pendampingan Empatik

1. **Libatkan Sejak Perancangan Awal:** Jangan menunggu sistem selesai 100% sebelum meminta pendapat pengguna akhir.
2. **Uji Coba pada Kelompok Kecil (*Pilot Project*):** Temukan perbaikan cepat (*quick wins*) yang langsung meringankan beban harian mereka.
3. **Dokumentasikan Panduan Sederhana:** Buat lembar contekan (*cheat sheet*) 1 halaman daripada buku manual tebal 100 halaman.`
    },

    // ==================== 8. OPINI ====================
    {
      title: 'Menemukan Keseimbangan Hidup Melalui Hobi Kreatif: Eksplorasi Minat di Luar Rutinitas',
      slug: 'menemukan-keseimbangan-hidup-melalui-hobi-kreatif',
      subtitle: 'Bagaimana meluangkan waktu untuk hobi non-pekerjaan mampu menyegarkan kembali pikiran dan menjaga kesehatan mental.',
      excerpt: 'Di tengah tuntutan produktivitas yang tiada henti, memiliki hobi yang ditekuni tanpa beban target komersial adalah bentuk kepedulian terbaik pada diri sendiri.',
      contentType: 'EXPERIENCE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1120,
      readTimeMinutes: 5,
      categoryId: catOpini.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Ruang kreasi: Menemukan kedamaian dan ketenangan lewat kegiatan yang disukai sepenuh hati.',
      seoTitle: 'Menemukan Keseimbangan Hidup Melalui Hobi Kreatif | ZETARAZ Knowledge',
      seoDescription: 'Catatan reflektif tentang pentingnya merawat hobi dan minat kreatif untuk menjaga kejernihan berpikir dan keseimbangan batin.',
      tags: ['kreativitas-hobi', 'pengalaman-praktis', 'continuous-learning'],
      publishedAt: new Date('2026-11-05T08:00:00Z'),
      content: `## Hobi Bukan Sekadar Pengisi Waktu Luang

Dalam budaya yang mengagungkan kesibukan, kita sering merasa bersalah jika melakukan sesuatu yang "tidak menghasilkan uang". Padahal, psikologi kognitif menunjukkan bahwa otak manusia membutuhkan ruang eksplorasi bebas tanpa tekanan evaluasi.

Hobi kreatif—mulai dari fotografi jalanan, melukis, berkebun di teras rumah, hingga merakit peranti audio—berperan sebagai katup pelepas stres (*stress release*) yang luar biasa ampuh.

---

## Tiga Manfaat Nyata Merawat Minat Pribadi

* **Memasuki Kondisi *Flow*:** Saat tenggelam dalam sebuah aktivitas kreatif, rasa cemas terhadap hari esok dan penyesalan masa lalu sejenak mereda. Kita hadir seutuhnya di momen sekarang.
* **Mengasah Ketajaman Mengamati:** Seseorang yang gemar fotografi akan belajar melihat sudut pandang cahaya yang luput dari pandangan orang biasa. Keterampilan mengamati ini secara tidak sadar memperkaya analisis kita saat kembali ke meja kerja.
* **Bebas dari Tuntutan Kesempurnaan:** Dalam hobi, kegagalan bukan bencana melainkan bagian dari kesenangan mencoba. Anda tidak perlu menjadi maestro untuk menikmati proses melukis cat air atau menyeduh kopi manual.

Luangkan setidaknya 30 menit setiap pekan untuk melakukan apa yang benar-benar Anda sukai, demi merawat kebahagiaan batin.`
    },

    // ==================== 9. PENGALAMAN ====================
    {
      title: 'Seni Merawat Fokus dengan Membaca dan Menulis Jurnal Mandiri',
      slug: 'seni-merawat-fokus-dengan-membaca-dan-menulis-jurnal',
      subtitle: 'Mengurai benang kusut pemikiran harian lewat goresan pena dan lembaran buku di era banjir notifikasi.',
      excerpt: 'Menulis jurnal bukan soal menyusun karya sastra indah, melainkan tentang memberi tempat bagi isi kepala kita untuk bernapas dengan jujur.',
      contentType: 'TUTORIAL',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 940,
      readTimeMinutes: 6,
      categoryId: catPengalaman.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Goresan reflektif: Menata kembali benang kusut pikiran melalui kebiasaan menulis jurnal.',
      seoTitle: 'Seni Menulis Jurnal & Membaca Fokus | ZETARAZ Knowledge',
      seoDescription: 'Panduan praktis memulai jurnal harian dan teknik membaca mendalam untuk menajamkan fokus.',
      tags: ['kreativitas-hobi', 'tutorial', 'knowledge-sharing'],
      publishedAt: new Date('2026-11-07T10:00:00Z'),
      content: `## Menemukan Hening di Tengah Hiruk Pikuk

Setiap hari kita dibombardir oleh ribuan pesan instan, notifikasi media sosial, dan berita terkini. Dampaknya, rentang perhatian kita memendek dan pikiran terasa senantiasa lelah meski tubuh tidak banyak bergerak.

Salah satu hobi tertua yang paling terapeutik adalah **menulis jurnal secara manual (*journaling*) dan membaca buku cetak**.

---

## Cara Sederhana Memulai Jurnal 5 Menit

Anda tidak memerlukan buku catatan mewah atau pulpen berharga jutaan. Mulailah dengan metode sederhana:

1. **Jurnal Pagi (Brain Dump):** Tuliskan 3 hal yang sedang membuat Anda khawatir atau 3 hal yang ingin Anda selesaikan hari ini. Mengeluarkannya ke atas kertas akan meringankan beban kerja memori otak (*working memory*).
2. **Catatan Bacaan Reflektif:** Ketika membaca buku, catat satu kalimat yang paling berkesan dan tuliskan mengapa kalimat tersebut menyentuh Anda.
3. **Refleksi Syukur Malam Hari:** Tuliskan hal kecil yang menyenangkan hari ini: secangkir teh hangat, sapaan ramah teman, atau tugas yang berhasil rampung.

Jurnal adalah teman bicara yang paling setia: ia tidak menghakimi, tidak menginterupsi, dan selalu siap mendengarkan.`
    },

    // ==================== 10. PENGALAMAN ====================
    {
      title: 'Eksplorasi Audio dan Musik: Menemukan Ruang Tenang di Tengah Kesibukan',
      slug: 'kreativitas-audio-dan-musik-dalam-menemani-keseharian',
      subtitle: 'Memahami bagaimana gelombang suara, ketukan ritmis, dan kebiasaan mendengar terencana mempengaruhi produktivitas serta ketenangan batin.',
      excerpt: 'Mendengarkan musik secara sadar adalah salah satu hobi yang paling mudah diakses namun memberikan dampak restoratif yang sangat mendalam.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 780,
      readTimeMinutes: 5,
      categoryId: catPengalaman.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Harmoni suara: Musik dan audio sebagai medium pemulihan konsentrasi dan inspirasi.',
      seoTitle: 'Eksplorasi Audio dan Musik Sehari-hari | ZETARAZ Knowledge',
      seoDescription: 'Ulasan menarik seputar hobi kurasi musik, lanskap audio ambien, dan pengaruhnya pada fokus kerja.',
      tags: ['kreativitas-hobi', 'pengalaman-praktis'],
      publishedAt: new Date('2026-11-08T15:30:00Z'),
      content: `## Menyimak Lebih dari Sekadar Mendengar

Sebagian besar dari kita menjadikan musik sekadar latar belakang saat bekerja atau menyetir. Namun ketika kita meluangkan waktu untuk benar-benar menyimak (*active listening*)—memperhatikan lapisan bass, dinamika drum, atau tekstur vokal—kita sedang melatih kepekaan auditori otak kita.

---

## Kurasi Audio untuk Berbagai Suasana Hati

* **Lanskap Suara Alam (*Binaural & Ambient*):** Suara rintik hujan atau gemersik dedaunan sangat efektif menutupi kebisingan kantor dan membantu konsentrasi mendalam (*deep work*).
* **Musik Instrumental Tanpa Lirik:** Musik klasik era Barok atau lo-fi hip-hop membantu menjaga denyut jantung tetap stabil tanpa mengalihkan fokus verbal saat membaca atau menulis.
* **Ritual Melepas Penat di Akhir Pekan:** Dengarkan satu album penuh dari awal hingga akhir tanpa menekan tombol acak (*shuffle*). Rasakan perjalanan emosional yang dirancang oleh sang musisi.`
    },

    // ==================== 11. PENGETAHUAN ====================
    {
      title: 'Membaca Informasi dengan Kritis: Menangkal Misinformasi di Ruang Sosial Digital',
      slug: 'membaca-bukti-ilmiah-dan-menilai-kredibilitas-informasi',
      subtitle: 'Panduan warga digital untuk mengenali bias konfirmasi, memeriksa sumber primer, dan menjaga kejujuran intelektual bersama.',
      excerpt: 'Di era derasnya arus media sosial, kemampuan menahan diri sejenak sebelum membagikan ulang sebuah tautan adalah kontribusi sosial yang sangat mulia.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1410,
      readTimeMinutes: 7,
      categoryId: catPengetahuan.id,
      authorId: editor.id,
      featuredImage: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Uji kebenaran: Meneliti rujukan dan menjaga kehati-hatian sebelum menyebarkan kabar.',
      seoTitle: 'Membaca Kritis & Menangkal Misinformasi | ZETARAZ Knowledge',
      seoDescription: 'Langkah praktis membaca berita dengan kritis, memeriksa fakta, dan menolak polarisasi informasi palsu.',
      tags: ['literasi-digital', 'komunitas-sosial', 'knowledge-sharing'],
      publishedAt: new Date('2026-11-09T09:00:00Z'),
      content: `## Tantangan Epistemik di Zaman Algoritma

Algoritma media sosial dirancang untuk memaksimalkan keterlibatan (*engagement*). Sering kali konten yang paling memicu amarah, kecemasan, atau rasa bangga kelompok yang berlebihan adalah konten yang paling cepat viral, terlepas dari apakah kabar tersebut benar atau keliru.

Jika kita tidak berhati-hati, ruang percakapan publik akan tercemar oleh kabar burung yang merusak kohesi sosial masyarakat.

---

## Tiga Pertanyaan Uji Sebelum Membagikan Informasi

1. **Siapa yang Mengatakannya dan Apa Buktinya?** Apakah tautan tersebut menyertakan dokumen asli, kutipan lengkap narasumber, atau hanya mengutip rumor dari grup obrolan lain?
2. **Apakah Judulnya Sengaja Memicu Emosi?** Jika sebuah judul berita membuat Anda langsung merasa marah atau panik, berhentilah sejenak. Itu adalah tanda klasik perangkap klik (*clickbait*).
3. **Apa Kata Sumber Independen Lain?** Luangkan waktu 30 detik untuk mencari topik yang sama di mesin pencari. Jika peristiwa tersebut besar, media massa yang bereputasi pasti sudah memverifikasinya.

Menjadi pembaca yang kritis adalah wujud cinta kita kepada masyarakat dan ruang hidup bersama.`
    },

    // ==================== 12. OPINI ====================
    {
      title: 'Etika Komunikasi dan Dinamika Komunitas: Merawat Ruang Dialog Sehat di Era Digital',
      slug: 'etika-komunikasi-dan-kolaborasi-komunitas-digital',
      subtitle: 'Bagaimana merawat empamti, saling menghargai perbedaan pandangan, dan membangun kolaborasi positif di ranah daring.',
      excerpt: 'Komunitas digital yang kuat tidak lahir dari keseragaman pendapat, melainkan dari kedewasaan para anggotanya dalam berdialog secara santun dan saling membangun.',
      contentType: 'EXPERIENCE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 920,
      readTimeMinutes: 6,
      categoryId: catOpini.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Kerukunan komunitas: Dialog yang hangat dan saling menghargai mempererat jejaring sosial.',
      seoTitle: 'Etika Komunikasi & Komunitas Digital | ZETARAZ Knowledge',
      seoDescription: 'Pelajaran berharga tentang menjaga kesantunan, mediasi konflik di komunitas daring, dan kolaborasi sosial produktif.',
      tags: ['komunitas-sosial', 'pengalaman-praktis', 'knowledge-sharing'],
      publishedAt: new Date('2026-11-10T11:00:00Z'),
      content: `## Membangun Jembatan, Bukan Tembok

Di balik layar kaca ponsel atau laptop, kita sering kali lupa bahwa akun yang sedang kita tanggapi adalah manusia nyata yang memiliki perasaan, keluarga, dan latar belakang kehidupan tersendiri.

Anonimitas dan jarak fisik kerap kali membuat orang lebih mudah melontarkan kata-kata pedas yang tidak akan pernah mereka ucapkan jika bertatap muka langsung.

---

## Pilar Komunikasi Komunitas yang Sehat

* **Asumsikan Niat Baik Terlebih Dahulu (*Assume Good Intentions*):** Sering kali kalimat yang terdengar ketus hanyalah akibat keterbatasan pemilihan kata tertulis, bukan niat untuk menyakiti.
* **Kritisi Idenya, Bukan Orangnya (*Attack the Argument, Not the Person*):** Perdebatan yang produktif selalu berpusat pada logika dan data, bukan serangan pribadi (*ad hominem*).
* **Beri Ruang untuk Berbeda:** Tidak semua diskusi harus berakhir dengan satu kesimpulan seragam. Menghargai sudut pandang orang lain adalah tanda kedewasaan intelektual.

Komunitas yang sehat adalah tempat di mana setiap orang merasa aman untuk bertanya, belajar, dan saling menyemangati.`
    },

    // ==================== 13. OPINI ====================
    {
      title: 'Belajar Sepanjang Hayat: Menumbuhkan Budaya Literasi Terbuka di Tengah Masyarakat',
      slug: 'belajar-sepanjang-hayat-continuous-learning',
      subtitle: 'Mengapa rasa ingin tahu yang tak pernah padam adalah kunci adaptasi paling berharga menghadapi perubahan zaman.',
      excerpt: 'Pendidikan formal mungkin berakhir saat kita menerima ijazah, namun proses belajar yang sesungguhnya baru saja dimulai dan berlangsung seumur hidup.',
      contentType: 'KNOWLEDGE',
      status: 'PUBLISHED',
      isFeatured: false,
      viewCount: 1050,
      readTimeMinutes: 6,
      categoryId: catOpini.id,
      authorId: admin.id,
      featuredImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'Pendidikan berkelanjutan: Merawat rasa ingin tahu sebagai bekal berharga mengarungi zaman.',
      seoTitle: 'Belajar Sepanjang Hayat & Literasi Terbuka | ZETARAZ Knowledge',
      seoDescription: 'Inspirasi continuous learning dan bagaimana membangun kebiasaan membaca dan berbagi wawasan setiap hari.',
      tags: ['continuous-learning', 'knowledge-sharing', 'komunitas-sosial'],
      publishedAt: new Date('2026-11-11T09:00:00Z'),
      content: `## Pendidikan Tidak Berhenti di Gerbang Sekolah

Dunia terus bergerak dengan kecepatan yang belum pernah terjadi sebelumnya. Keterampilan yang kita pelajari lima tahun lalu mungkin sudah mengalami pergeseran fungsi hari ini. Namun ada satu hal yang tidak akan pernah kedaluwarsa: **kemampuan dan kemauan untuk terus belajar**.

---

## Siklus Belajar yang Fleksibel: Learn, Unlearn, Relearn

Alvin Toffler pernah menulis bahwa orang yang buta huruf di masa depan bukanlah mereka yang tidak bisa membaca, melainkan mereka yang tidak bisa belajar (*learn*), melepaskan pemikiran lama (*unlearn*), dan belajar kembali (*relearn*).

* **Learn:** Mengumpulkan wawasan dan ketrampilan baru dari membaca, mengamati, dan mencoba hal baru setiap hari.
* **Unlearn:** Berani mengakui bahwa metode yang dulu sukses mungkin sudah tidak relevan lagi dengan kondisi saat ini.
* **Relearn:** Mempelajari kembali prinsip-prinsip dasar dengan kacamata yang lebih segar dan kontekstual.

Di ZETARAZ Knowledge, kami mengajak Anda untuk terus membuka diri, membaca, dan saling berbagi pengalaman. Karena di setiap wawasan yang kita bagikan, ada inspirasi yang tumbuh mekar bagi orang lain.`
    }
  ];

  for (const art of articles) {
    const { tags, ...artData } = art;
    const createdArticle = await prisma.article.create({
      data: {
        ...artData,
        publishedContent: artData.content,
        draftContent: artData.content,
        publishedVersion: 1,
        draftVersion: 1,
        publicationStatus: 'PUBLISHED',
        status: 'PUBLISHED',
        syncStatus: 'SYNCED',
        googleDocId: `https://docs.google.com/document/d/1${artData.slug.substring(0, 20)}/edit`,
        googleDocRevision: `rev_${artData.slug}_v1`,
        lastSyncedAt: new Date(),
      },
    });

    await prisma.publicationHistory.create({
      data: {
        articleId: createdArticle.id,
        action: 'PUBLISH',
        version: 1,
        publishedBy: 'Rizky Aditya Pratama Wijaya',
        notes: 'Publikasi perdana terverifikasi ZETARAZ Knowledge',
        createdAt: artData.publishedAt || new Date(),
      },
    });

    await prisma.syncHistory.create({
      data: {
        articleId: createdArticle.id,
        googleDocId: `https://docs.google.com/document/d/1${artData.slug.substring(0, 20)}/edit`,
        revisionId: `rev_${artData.slug}_v1`,
        status: 'SUCCESS',
        draftVersion: 1,
        message: 'Sinkronisasi awal dokumen Google Docs berhasil dikonversi ke format draf',
      },
    });

    await prisma.articleVersion.create({
      data: {
        articleId: createdArticle.id,
        version: 1,
        title: artData.title,
        content: artData.content,
        excerpt: artData.excerpt,
        createdAt: artData.publishedAt || new Date(),
      },
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

  console.log('--- Database Seeding Complete for ZETARAZ Knowledge (3 Categories: Pengetahuan, Pengalaman, Opini; 13 Articles)! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
