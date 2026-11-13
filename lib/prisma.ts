import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// On Vercel Serverless, copy SQLite database to writable /tmp directory
if (process.env.VERCEL) {
  try {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(tmpDbPath)) {
      const searchPaths = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.join(__dirname, 'prisma', 'dev.db'),
        path.join(__dirname, '..', 'prisma', 'dev.db'),
      ];
      for (const p of searchPaths) {
        if (fs.existsSync(p)) {
          fs.copyFileSync(p, tmpDbPath);
          console.log(`[PRISMA] Successfully initialized SQLite at ${tmpDbPath} from ${p}`);
          break;
        }
      }
    }
    if (fs.existsSync(tmpDbPath)) {
      process.env.DATABASE_URL = 'file:/tmp/dev.db';
    }
  } catch (err) {
    console.error('[PRISMA] Error setting up /tmp SQLite on Vercel:', err);
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
