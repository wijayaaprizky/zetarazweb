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

  console.log('--- Database Seeding Complete for ZETARAZ Knowledge (0 Articles - Fresh Slate)! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
