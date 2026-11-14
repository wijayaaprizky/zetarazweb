import fs from 'fs';
import path from 'path';

export interface BrandAttribute {
  title: string;
  desc: string;
}

export interface AboutPageContent {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroMotto: string;
  identityBadge: string;
  identityTitle: string;
  identityDescription1: string;
  identityDescription2: string;
  identityPoints: string[];
  identityImageUrl: string;
  valuesBadge: string;
  valuesTitle: string;
  brandAttributes: BrandAttribute[];
  credibilityBadge: string;
  credibilityTitle: string;
  credibilityParagraph1: string;
  credibilityParagraph2: string;
  privacyBadge: string;
  privacyTitle: string;
  privacyParagraph: string;
  termsBadge: string;
  termsTitle: string;
  termsParagraph: string;
  lastUpdated: string;
}

export interface ProgramItem {
  title: string;
  subtitle: string;
  desc: string;
  benefits: string[];
}

export interface ServicesPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  programs: ProgramItem[];
}

export interface LegalSection {
  title: string;
  content: string;
  noteBox?: string;
}

export interface TermsPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export interface PrivacyPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export interface DisclaimerPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export interface FaqQuestion {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  questions: FaqQuestion[];
}

export interface FaqPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  categories: FaqCategory[];
}

export interface SupportTopic {
  title: string;
  desc: string;
  linkText: string;
  linkHref: string;
}

export interface SupportPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  topics: SupportTopic[];
  responseTimeText: string;
  supportEmail: string;
}

export interface ContactPageContent {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  officeLocation: string;
  publicEmail: string;
  editorialEmail: string;
  supportEmail: string;
  operatingHours: string;
  guidelinesText: string;
}

export interface AllPagesContent {
  about: AboutPageContent;
  services: ServicesPageContent;
  terms: TermsPageContent;
  privacy: PrivacyPageContent;
  disclaimer: DisclaimerPageContent;
  faq: FaqPageContent;
  support: SupportPageContent;
  contact: ContactPageContent;
}

export const defaultPagesContent: AllPagesContent = {
  about: {
    heroBadge: 'Mengenal Inisiatif Kami',
    heroTitle: 'ZETARAZ Knowledge',
    heroSubtitle: 'Berbagi Pengetahuan, Berbagi Pengalaman.',
    heroDescription:
      'Platform independen yang hadir untuk memudahkan siapa saja menemukan informasi yang kredibel, memahami konsep baru, dan belajar dari pengalaman nyata lintas disiplin ilmu.',
    heroMotto: '“Temukan Pengetahuan. Perluas Wawasan.”',
    identityBadge: 'Identitas Kami',
    identityTitle: 'Sebuah Ruang Terbuka untuk Terus Belajar',
    identityDescription1:
      'ZETARAZ Knowledge bermula sebagai sebuah inisiatif mandiri dengan satu keyakinan sederhana: pengetahuan dan pengalaman menjadi jauh lebih bermakna ketika dibagikan.',
    identityDescription2:
      'Kami bukan blog pribadi yang mencatat kegiatan harian, bukan situs korporat yang menjual produk jasa, dan bukan firma konsultan komersial. Kami adalah wadah berbagi pengetahuan digital dengan standar editorial profesional yang memprioritaskan kenyamanan membaca dan kedalaman isi.',
    identityPoints: [
      'Menyediakan artikel pengetahuan berkualitas yang mudah dipahami.',
      'Mencatat pengalaman lapangan dan pelajaran berharga dari praktik nyata.',
      'Menghadirkan tutorial praktis dan panduan langkah-demi-langkah.',
      'Menumbuhkan budaya belajar mandiri dan bernalar kritis.',
    ],
    identityImageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
    valuesBadge: 'Prinsip & Karakter',
    valuesTitle: 'Nilai yang Menjiwai Setiap Tulisan Kami',
    brandAttributes: [
      {
        title: 'Knowledge-Driven (Berbasis Pengetahuan)',
        desc: 'Setiap artikel dan ulasan disusun dengan riset teliti, penelaahan cermat, dan fokus pada substansi yang bermanfaat.',
      },
      {
        title: 'Inclusive & Accessible (Inklusif & Mudah Diakses)',
        desc: 'Pengetahuan disajikan tanpa elitisme atau jargon yang menyulitkan, agar siapa pun dapat belajar dengan nyaman.',
      },
      {
        title: 'Credible & Informative (Kredibel & Informatif)',
        desc: 'Menjunjung tinggi kejujuran intelektual, rujukan yang sahih, serta pemisahan tegas antara fakta empiris dan opini.',
      },
      {
        title: 'Modern & Practical (Modern & Praktis)',
        desc: 'Menghubungkan teori konseptual dengan pengalaman nyata di lapangan, tips praktis, dan studi kasus yang relevan.',
      },
      {
        title: 'Independent (Mandiri & Terbuka)',
        desc: 'Inisiatif independen yang bebas dari bias komersial atau kepentingan korporasi tertentu.',
      },
    ],
    credibilityBadge: 'Kredibilitas & Tanggung Jawab Isi',
    credibilityTitle: 'Menjaga Akurasi dan Kejujuran Intelektual',
    credibilityParagraph1:
      'Kami berupaya memastikan setiap naskah yang terbit di ZETARAZ Knowledge berpegang pada fakta yang dapat dipertanggungjawabkan. Kami mencantumkan rujukan apabila menyitir data saintifik dan secara jujur menyatakan konteks ketika membagikan pengalaman terapan di lapangan.',
    credibilityParagraph2:
      'Jika terdapat kekeliruan atau perkembangan ilmu terbaru yang mengoreksi tulisan terdahulu, kami terbuka untuk memperbarui dan mencantumkan riwayat pembaruan artikel demi kebaikan bersama.',
    privacyBadge: 'Privasi Pembaca',
    privacyTitle: 'Komitmen Privasi Pembaca',
    privacyParagraph:
      'ZETARAZ Knowledge menghargai privasi setiap pembaca. Pendaftaran email buletin semata-mata digunakan untuk mengirimkan kurasi artikel baru secara berkala tanpa ada data yang diperjualbelikan kepada pihak ketiga. Seluruh konten orisinal bebas dibaca dan dipelajari untuk kepentingan pendidikan dan pengembangan diri.',
    termsBadge: 'Ketentuan & Etika Pengetahuan Terbuka',
    termsTitle: 'Ketentuan Penggunaan & Hak Cipta Edukatif',
    termsParagraph:
      'Seluruh konten yang disajikan di ZETARAZ Knowledge ditujukan untuk tujuan edukasi, literasi, dan pengembangan pengetahuan umum. Pembaca dipersilakan mengutip naskah dengan tetap mencantumkan atribusi sumber tautan ZETARAZ Knowledge secara wajar. Kami berpegang teguh pada etika berbagi tanpa bias komersial demi ekosistem belajar yang sehat dan terbuka.',
    lastUpdated: 'November 2026 • Tim Redaksi ZETARAZ Knowledge',
  },
  services: {
    heroBadge: 'Inisiatif & Program',
    heroTitle: 'Layanan & Program Inisiatif',
    heroDescription:
      'Eksplorasi layanan kurasi editorial, repositori pengetahuan terbuka, program berbagi pengalaman, dan kemitraan literasi di ZETARAZ Knowledge.',
    programs: [
      {
        title: 'Kurasi & Publikasi Pengetahuan Terbuka',
        subtitle: 'Standar Redaksi Profesional',
        desc: 'Kami membantu mengolah wawasan konseptual dan rujukan teoretis menjadi naskah bacaan yang mudah dipahami, berbobot, dan dapat diakses gratis oleh masyarakat luas tanpa pembatas biaya.',
        benefits: [
          'Penyuntingan bahasa yang lugas dan terstruktur',
          'Validasi rujukan primer dan cek silang fakta',
          'Format tata letak ramah pembaca di berbagai perangkat',
        ],
      },
      {
        title: 'Program Kolaborasi Berbagi Pengalaman',
        subtitle: 'Dari Praktik Lapangan Menuju Wawasan Kolektif',
        desc: 'Wadah bagi praktisi, akademisi, dan pembelajar mandiri untuk mendokumentasikan pelajaran berharga, pemecahan masalah nyata, dan studi kasus dari pengalaman kerja sehari-hari.',
        benefits: [
          'Alur penulisan mudah melalui integrasi Google Docs',
          'Bimbingan editorial dari draf hingga tayang',
          'Profil penulis terverifikasi untuk rekam jejak profesional',
        ],
      },
      {
        title: 'Repositori & Indeks Pengetahuan Lintas Bidang',
        subtitle: 'Koleksi Terstruktur & Terindeks',
        desc: 'Sistem pengindeksan digital yang mengorganisir pengetahuan ke dalam 3 domain inti utama: Pengetahuan, Pengalaman, dan Opini.',
        benefits: [
          'Fitur pencarian instan dan filter tipe konten',
          'Pengelompokan tag tematik yang terhubung',
          'Akses terbuka 24/7 dengan performa cepat',
        ],
      },
      {
        title: 'Panduan Praktis & Sumber Belajar Mandiri',
        subtitle: 'Tutorial Langkah-demi-Langkah',
        desc: 'Penyusunan panduan aplikatif untuk memecahkan masalah nyata—seperti pemodelan alur kerja BPM, analitika data terapan, hingga higienitas keamanan siber.',
        benefits: [
          'Penjelasan berjenjang dari dasar ke mahir',
          'Disertai ilustrasi visual dan diagram alur',
          'Contoh kasus yang relevan dengan konteks Indonesia',
        ],
      },
      {
        title: 'Kemitraan Komunitas & Institusi Pembelajar',
        subtitle: 'Sinergi Literasi & Edukasi',
        desc: 'Kami membuka kerja sama dengan komunitas belajar, lembaga riset, universitas, dan inisiatif nirlaba untuk memperluas akses wawasan dan literasi kritis.',
        benefits: [
          'Kolaborasi penulisan seri wawasan khusus',
          'Penyebaran materi edukatif ke jaringan pembaca yang tepat',
          'Penyelenggaraan diskusi wawasan daring terbuka',
        ],
      },
    ],
  },
  terms: {
    heroBadge: 'Regulasi & Etika Layanan',
    heroTitle: 'Ketentuan Pengguna (Terms of Service)',
    heroDescription:
      'Aturan main, etika berbagi pengetahuan terbuka, dan batas tanggung jawab penggunaan seluruh materi di platform ZETARAZ Knowledge.',
    effectiveDate: 'Berlaku efektif sejak: 1 November 2026 • Pembaruan Terakhir: November 2026',
    sections: [
      {
        title: 'Penerimaan Ketentuan',
        content:
          'Dengan mengakses, menelusuri, membaca, atau memanfaatkan materi yang tersedia di situs web ZETARAZ Knowledge (selanjutnya disebut "Platform", "Kami", atau "Situs"), Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan Pengguna ini. Apabila Anda tidak menyetujui salah satu bagian dari ketentuan ini, mohon untuk tidak melanjutkan penggunaan Situs ini.',
      },
      {
        title: 'Sifat Konten & Tujuan Edukasi',
        content:
          'Seluruh artikel, kajian, ulasan metodologi, panduan langkah-demi-langkah, dan catatan pengalaman lapangan yang dipublikasikan di ZETARAZ Knowledge disajikan semata-mata untuk tujuan literasi, edukasi, dan pertukaran wawasan publik.',
        noteBox:
          'Bukan Nasihat Resmi: Materi di platform ini tidak boleh dianggap sebagai nasihat hukum, keuangan, medis, atau konsultansi arsitektur sistem resmi yang mengikat. Untuk keputusan teknis atau profesional yang berdampak kritis, pengguna wajib berkonsultasi dengan tenaga ahli tersertifikasi terkait.',
      },
      {
        title: 'Hak Kekayaan Intelektual & Atribusi Sitasi',
        content:
          'Kami mendukung penyebaran pengetahuan secara sehat dan bermoral: Seluruh naskah tulisan orisinal dilindungi oleh undang-undang hak cipta. Pengutipan wajar (Fair Use) diperkenankan untuk keperluan akademis atau non-komersial dengan kewajiban mutlak mencantumkan nama penulis dan tautan langsung ke artikel sumber di ZETARAZ Knowledge. Menggandakan secara utuh tanpa izin atau plagiarisme dilarang keras.',
      },
      {
        title: 'Etika Penggunaan & Keamanan Sistem',
        content:
          'Pengguna dilarang keras melakukan serangan penolakan layanan (DDoS), injeksi kode berbahaya, scraping ilegal yang membebani server, menyalahgunakan formulir untuk spam atau phishing, serta mencoba mengakses area administrasi redaksi tanpa otorisasi.',
      },
      {
        title: 'Tautan ke Pihak Ketiga',
        content:
          'Artikel di ZETARAZ Knowledge dapat memuat tautan rujukan ke jurnal ilmiah eksternal atau situs pihak ketiga. Kami tidak memiliki kendali dan tidak bertanggung jawab atas isi atau kebijakan privasi situs pihak ketiga tersebut.',
      },
      {
        title: 'Perubahan Ketentuan',
        content:
          'ZETARAZ Knowledge berhak memperbarui dan memodifikasi ketentuan ini sewaktu-waktu sesuai perkembangan operasional dan regulasi. Setiap perubahan substansial akan dicantumkan tanggal revisinya di bagian atas halaman ini.',
      },
      {
        title: 'Kontak Pertanyaan Hukum & Editorial',
        content:
          'Jika Anda memiliki pertanyaan seputar ketentuan penggunaan ini atau izin penggunaan materi khusus, silakan hubungi tim kami melalui surel di kontak@zetaraz.org atau melalui formulir di halaman Kontak.',
      },
    ],
  },
  privacy: {
    heroBadge: 'Keamanan & Privasi Data',
    heroTitle: 'Kebijakan Privasi (Privacy Policy)',
    heroDescription:
      'Komitmen kami untuk melindungi identitas dan privasi seluruh pembaca, kontributor, dan pelanggan buletin ZETARAZ Knowledge.',
    effectiveDate: 'Berlaku efektif sejak: 1 November 2026 • Pembaruan Terakhir: November 2026',
    sections: [
      {
        title: 'Prinsip Dasar Privasi Kami',
        content:
          'Di ZETARAZ Knowledge, kami percaya bahwa membaca dan menuntut ilmu harus menjadi kegiatan yang aman, tenang, dan bebas dari pelacakan yang agresif. Kami tidak pernah menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada perusahaan periklanan pihak ketiga mana pun.',
      },
      {
        title: 'Informasi yang Kami Kumpulkan',
        content:
          'Kami membatasi pengumpulan data hanya pada hal-hal yang esensial: Alamat email sukarela yang Anda daftarkan untuk buletin mingguan atau pesan formulir kontak, serta log teknis anonim standar (jenis peramban, waktu akses) untuk pemeliharaan performa dan keamanan server.',
      },
      {
        title: 'Tujuan Penggunaan Data',
        content:
          'Data digunakan semata-mata untuk mengirimkan buletin kurasi artikel baru bagi pelanggan, penghitungan jumlah pembaca secara agregat untuk mengetahui topik yang diminati, serta menjaga keamanan platform dari upaya spam atau peretasan.',
      },
      {
        title: 'Penggunaan Cookie & Token Aman',
        content:
          'Kami hanya menggunakan essential cookies dan token autentikasi aman (HttpOnly JWT) untuk keperluan login tim redaksi di panel CMS. Kami tidak menanamkan cookie pelacak lintas situs (third-party tracking cookies) yang memata-matai riwayat Anda.',
      },
      {
        title: 'Hak Pengguna Atas Datanya',
        content:
          'Sebagai pembaca atau pelanggan buletin, Anda memiliki hak penuh untuk berhenti berlangganan (Unsubscribe) kapan saja melalui tautan di footer email, serta meminta penghapusan permanen alamat surel Anda dari database kami.',
      },
      {
        title: 'Hubungi Tim Privasi',
        content:
          'Jika Anda memiliki pertanyaan seputar cara kami mengelola data Anda, silakan hubungi tim kami melalui surel di privasi@zetaraz.org atau kontak@zetaraz.org.',
      },
    ],
  },
  disclaimer: {
    heroBadge: 'Penafian Tanggung Jawab',
    heroTitle: 'Disclaimer (Penafian Hukum & Editorial)',
    heroDescription:
      'Batasan tanggung jawab atas pemanfaatan artikel, panduan teknis, dan catatan pengalaman yang disajikan di platform ZETARAZ Knowledge.',
    effectiveDate: 'Terakhir diperbarui: November 2026 • Tim Redaksi ZETARAZ Knowledge',
    sections: [
      {
        title: 'Tujuan Informasi & Edukasi Umum',
        content:
          'Semua konten yang disajikan di situs ZETARAZ Knowledge—termasuk teks artikel, cuplikan kode, bagan diagram, dan opini editorial—diterbitkan semata-mata dengan itikad baik untuk tujuan informasi umum, pendidikan, dan pertukaran pengalaman.',
      },
      {
        title: 'Bukan Nasihat Profesional',
        content:
          'Materi di platform ini bukan merupakan nasihat hukum, kepatuhan regulasi, nasihat finansial, maupun jaminan mutlak arsitektur sistem. Pengguna wajib melakukan pengujian di lingkungan aman serta berkonsultasi dengan profesional sebelum menerapkan panduan teknis pada sistem produksi.',
      },
      {
        title: 'Dinamika Perkembangan Ilmu Pengetahuan',
        content:
          'Dunia teknologi dan sains bergerak sangat cepat. Tim redaksi berupaya menjaga kebaruan dan akurasi naskah, namun tidak memberikan jaminan bahwa seluruh rujukan bebas dari perubahan mutakhir. Pembaca disarankan membandingkan dengan dokumentasi resmi terkini.',
      },
      {
        title: 'Penerapan Kode & Tutorial (Use at Your Own Risk)',
        content:
          'Setiap tindakan atau keputusan yang Anda ambil berdasarkan materi atau tutorial di ZETARAZ Knowledge sepenuhnya merupakan tanggung jawab pribadi Anda. ZETARAZ Knowledge dan para penulis tidak bertanggung jawab atas kerugian atau kendala sistem yang timbul.',
      },
      {
        title: 'Opini Penulis & Kontributor Independen',
        content:
          'Pandangan dalam esai perspektif atau opini merupakan sudut pandang pribadi masing-masing penulis dan tidak selalu mencerminkan kebijakan institusi tempat penulis bekerja.',
      },
      {
        title: 'Koreksi & Masukan',
        content:
          'Jika Anda menemukan ketidakakuratan data dalam artikel kami, silakan ajukan koreksi melalui halaman Kontak Redaksi. Kami berkomitmen untuk meninjau masukan secara transparan.',
      },
    ],
  },
  faq: {
    heroBadge: 'Pusat Bantuan & FAQ',
    heroTitle: 'Frequently Asked Questions (FAQ)',
    heroDescription:
      'Pertanyaan yang sering diajukan mengenai ZETARAZ Knowledge, tujuan platform, kurasi naskah, panduan kontribusi, dan lisensi konten.',
    categories: [
      {
        category: 'Tentang ZETARAZ Knowledge',
        questions: [
          {
            q: 'Apa itu ZETARAZ Knowledge?',
            a: 'ZETARAZ Knowledge adalah wadah independen untuk membaca, memahami, dan berbagi wawasan bermakna. Kami menghadirkan telaah terstruktur, catatan pengalaman lapangan, serta panduan praktis lintas disiplin ilmu yang mudah dipelajari oleh siapa saja.',
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
        questions: [
          {
            q: 'Bagaimana cara menulis atau mengirimkan naskah ke ZETARAZ Knowledge?',
            a: 'Kami menyambut baik tulisan dari praktisi dan pembelajar mandiri. Anda dapat mengirimkan draf tautan Google Docs Anda melalui halaman Kontak dengan memilih topik "Pengajuan Naskah Tulisan".',
          },
          {
            q: 'Apakah penulis mendapatkan kompensasi atau hak cipta?',
            a: 'Sebagai inisiatif nirlaba mandiri, kepemilikan hak cipta moral tetap melekat penuh pada nama penulis. Setiap artikel mencantumkan profil dan rekam jejak profesional penulis.',
          },
        ],
      },
    ],
  },
  support: {
    heroBadge: 'Help Center & Support',
    heroTitle: 'Pusat Bantuan & Dukungan Pengguna',
    heroDescription:
      'Kami siap membantu Anda mendapatkan pengalaman membaca, belajar, dan berpartisipasi yang terbaik di ZETARAZ Knowledge.',
    topics: [
      {
        title: 'Panduan Membaca & Menemukan Topik',
        desc: 'Pelajari cara menggunakan bilah pencarian, menyaring artikel berdasarkan kategori disiplin ilmu, dan menjelajahi arsip pengetahuan.',
        linkText: 'Lihat Panduan FAQ',
        linkHref: '/faq',
      },
      {
        title: 'Bantuan Buletin & Email',
        desc: 'Mengalami kendala tidak menerima email buletin mingguan atau ingin mengubah alamat email langganan Anda?',
        linkText: 'Kelola Buletin',
        linkHref: '/faq',
      },
      {
        title: 'Laporkan Masalah Teknis / Tautan Rusak',
        desc: 'Menemukan halaman yang lambat, kesalahan tata letak di perangkat tertentu, atau tautan yang tidak berfungsi?',
        linkText: 'Kirim Laporan Bug',
        linkHref: '/contact?topic=bug',
      },
      {
        title: 'Koreksi Naskah & Permohonan Hak Cipta',
        desc: 'Ingin menyampaikan rujukan pembanding untuk artikel tertentu atau klarifikasi hak cipta atribusi materi?',
        linkText: 'Hubungi Redaksi',
        linkHref: '/contact?topic=editorial',
      },
    ],
    responseTimeText: 'Laporan dan pertanyaan umumnya ditanggapi dalam kurun waktu 1 × 24 jam kerja.',
    supportEmail: 'support@zetaraz.org',
  },
  contact: {
    heroBadge: 'Kanal Komunikasi',
    heroTitle: 'Hubungi Redaksi ZETARAZ',
    heroDescription:
      'Kami menyambut setiap pertanyaan, masukan kritis, usulan topik, dan tawaran kolaborasi pengetahuan dari Anda.',
    officeLocation: 'Indonesia (Inisiatif Pengetahuan Digital)',
    publicEmail: 'kontak@zetaraz.org',
    editorialEmail: 'redaksi@zetaraz.org',
    supportEmail: 'support@zetaraz.org',
    operatingHours: 'Senin – Jumat, 09.00 – 17.00 WIB',
    guidelinesText:
      'Kami sangat menghargai pesan yang disampaikan secara santun, menyertakan konteks rujukan yang jelas, dan bebas dari muatan penipuan atau promosi ilegal.',
  },
};

const globalForPages = globalThis as unknown as {
  pagesContent: AllPagesContent | undefined;
};

function getPagesFilePath(): string {
  if (process.env.VERCEL) {
    const tmpPath = '/tmp/pagesContent.json';
    if (!fs.existsSync(tmpPath)) {
      const orig = path.join(process.cwd(), 'data', 'pagesContent.json');
      if (fs.existsSync(orig)) {
        try {
          fs.copyFileSync(orig, tmpPath);
        } catch {}
      }
    }
    return tmpPath;
  }
  return path.join(process.cwd(), 'data', 'pagesContent.json');
}

export function getAllPagesContent(): AllPagesContent {
  try {
    const filePath = getPagesFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      const merged: AllPagesContent = {
        about: { ...defaultPagesContent.about, ...(parsed.about || {}) },
        services: { ...defaultPagesContent.services, ...(parsed.services || {}) },
        terms: { ...defaultPagesContent.terms, ...(parsed.terms || {}) },
        privacy: { ...defaultPagesContent.privacy, ...(parsed.privacy || {}) },
        disclaimer: { ...defaultPagesContent.disclaimer, ...(parsed.disclaimer || {}) },
        faq: { ...defaultPagesContent.faq, ...(parsed.faq || {}) },
        support: { ...defaultPagesContent.support, ...(parsed.support || {}) },
        contact: { ...defaultPagesContent.contact, ...(parsed.contact || {}) },
      };
      globalForPages.pagesContent = merged;
      return merged;
    }
    const orig = path.join(process.cwd(), 'data', 'pagesContent.json');
    if (fs.existsSync(orig)) {
      const raw = fs.readFileSync(orig, 'utf-8');
      const parsed = JSON.parse(raw);
      const merged: AllPagesContent = {
        about: { ...defaultPagesContent.about, ...(parsed.about || {}) },
        services: { ...defaultPagesContent.services, ...(parsed.services || {}) },
        terms: { ...defaultPagesContent.terms, ...(parsed.terms || {}) },
        privacy: { ...defaultPagesContent.privacy, ...(parsed.privacy || {}) },
        disclaimer: { ...defaultPagesContent.disclaimer, ...(parsed.disclaimer || {}) },
        faq: { ...defaultPagesContent.faq, ...(parsed.faq || {}) },
        support: { ...defaultPagesContent.support, ...(parsed.support || {}) },
        contact: { ...defaultPagesContent.contact, ...(parsed.contact || {}) },
      };
      globalForPages.pagesContent = merged;
      return merged;
    }
  } catch (err) {
    console.error('Error reading pages content, using fallback/default:', err);
  }

  if (globalForPages.pagesContent) {
    return globalForPages.pagesContent;
  }

  globalForPages.pagesContent = defaultPagesContent;
  return defaultPagesContent;
}

export function getPageContent<K extends keyof AllPagesContent>(pageKey: K): AllPagesContent[K] {
  const all = getAllPagesContent();
  return all[pageKey] || defaultPagesContent[pageKey];
}

export function savePageContent<K extends keyof AllPagesContent>(
  pageKey: K,
  newContent: Partial<AllPagesContent[K]>
): AllPagesContent[K] {
  const all = getAllPagesContent();
  const updatedPage = {
    ...all[pageKey],
    ...newContent,
  } as AllPagesContent[K];

  all[pageKey] = updatedPage;
  globalForPages.pagesContent = all;

  try {
    const filePath = getPagesFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(all, null, 2), 'utf-8');

    const orig = path.join(process.cwd(), 'data', 'pagesContent.json');
    if (filePath !== orig && fs.existsSync(path.dirname(orig))) {
      try {
        fs.writeFileSync(orig, JSON.stringify(all, null, 2), 'utf-8');
      } catch {}
    }
  } catch (err) {
    console.error('Error saving page content:', err);
  }

  return updatedPage;
}

export function saveAllPagesContent(newAll: Partial<AllPagesContent>): AllPagesContent {
  const current = getAllPagesContent();
  const merged: AllPagesContent = {
    about: { ...current.about, ...(newAll.about || {}) },
    services: { ...current.services, ...(newAll.services || {}) },
    terms: { ...current.terms, ...(newAll.terms || {}) },
    privacy: { ...current.privacy, ...(newAll.privacy || {}) },
    disclaimer: { ...current.disclaimer, ...(newAll.disclaimer || {}) },
    faq: { ...current.faq, ...(newAll.faq || {}) },
    support: { ...current.support, ...(newAll.support || {}) },
    contact: { ...current.contact, ...(newAll.contact || {}) },
  };

  globalForPages.pagesContent = merged;

  try {
    const filePath = getPagesFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');

    const orig = path.join(process.cwd(), 'data', 'pagesContent.json');
    if (filePath !== orig && fs.existsSync(path.dirname(orig))) {
      try {
        fs.writeFileSync(orig, JSON.stringify(merged, null, 2), 'utf-8');
      } catch {}
    }
  } catch (err) {
    console.error('Error saving all pages content:', err);
  }

  return merged;
}
