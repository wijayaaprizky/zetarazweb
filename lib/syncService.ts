import { prisma } from '@/lib/prisma';
import { fetchGoogleDoc, extractDocId } from './googleDocs';
import crypto from 'crypto';

export interface SyncResult {
  success: boolean;
  updated?: boolean;
  articleId?: string;
  draftVersion?: number;
  publishedVersion?: number;
  publicationStatus?: string;
  syncStatus?: string;
  error?: string;
  message?: string;
}

export interface PublishResult {
  success: boolean;
  articleId?: string;
  publishedVersion?: number;
  publicationStatus?: string;
  action?: 'PUBLISH' | 'PUBLISH_UPDATE';
  error?: string;
}

export interface DiscardResult {
  success: boolean;
  articleId?: string;
  publishedVersion?: number;
  publicationStatus?: string;
  error?: string;
}

/**
 * Synchronize an article with its Google Docs source of truth.
 * 
 * CORE PRINCIPLES:
 * 1. Automatic synchronization must NEVER mean automatic publication.
 * 2. Google Docs is the content source of truth; ZETARAZ CMS is the publication authority.
 * 3. NEVER overwrite published content during synchronization.
 * 4. Existing published content remains unchanged until an administrator explicitly approves publication.
 * 5. Idempotent: duplicate notifications do not create duplicate draft versions.
 * 6. Failed synchronization leaves published content completely untouched.
 */
export async function syncArticleFromGoogleDocs(
  articleId: string,
  options?: {
    forceContent?: string;
    forceRevision?: string;
    googleDocId?: string;
    docTitle?: string;
  }
): Promise<SyncResult> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return { success: false, error: `Artikel dengan ID ${articleId} tidak ditemukan.` };
  }

  const docTarget = options?.googleDocId || article.googleDocId;
  if (!docTarget) {
    return {
      success: false,
      error: 'Artikel belum ditautkan ke dokumen Google Docs (ID atau URL kosong).',
    };
  }

  // Set syncStatus to SYNCING
  await prisma.article.update({
    where: { id: articleId },
    data: { syncStatus: 'SYNCING', syncError: null },
  });

  try {
    let content = '';
    let revisionId = '';

    if (options?.forceContent) {
      content = options.forceContent;
      revisionId =
        options.forceRevision ||
        `rev_${crypto.createHash('sha256').update(content).digest('hex').substring(0, 16)}`;
    } else {
      const fetched = await fetchGoogleDoc(docTarget);
      content = fetched.content;
      revisionId = fetched.revisionId;
    }

    if (!content.trim()) {
      throw new Error('Dokumen Google Docs kosong atau gagal diekstrak.');
    }

    // IDEMPOTENCY CHECK:
    // If the content is identical to existing draftContent and revision matches, do not duplicate version
    const isContentUnchanged =
      article.draftContent.trim() === content.trim() &&
      article.googleDocRevision === revisionId;

    if (isContentUnchanged) {
      await prisma.article.update({
        where: { id: articleId },
        data: {
          syncStatus: 'SYNCED',
          lastSyncedAt: new Date(),
          syncError: null,
        },
      });

      await prisma.syncHistory.create({
        data: {
          articleId,
          googleDocId: docTarget,
          revisionId,
          status: 'SUCCESS',
          draftVersion: article.draftVersion,
          message: 'Konten sudah mutakhir (tidak ada perubahan baru dari Google Docs).',
        },
      });

      return {
        success: true,
        updated: false,
        articleId,
        draftVersion: article.draftVersion,
        publishedVersion: article.publishedVersion,
        publicationStatus: article.publicationStatus,
        syncStatus: 'SYNCED',
        message: 'Konten Google Docs sudah sinkron dan mutakhir.',
      };
    }

    // CONTENT CHANGED: Calculate new draft version & publication status
    let newDraftVersion = article.draftVersion;
    let newPublicationStatus = article.publicationStatus;

    if (article.publicationStatus === 'DRAFT') {
      // New article still in draft: keep status DRAFT, can keep draftVersion or bump
      newDraftVersion = article.draftVersion;
      newPublicationStatus = 'DRAFT';
    } else if (article.publicationStatus === 'PUBLISHED') {
      // Previously published article: mark as UPDATE_AVAILABLE and bump draftVersion
      newDraftVersion = Math.max(article.publishedVersion, article.draftVersion) + 1;
      newPublicationStatus = 'UPDATE_AVAILABLE';
    } else if (article.publicationStatus === 'UPDATE_AVAILABLE') {
      // Already has a pending draft: update pending draft in-place without bumping published
      // (Google Docs changed again before approval)
      newDraftVersion = article.draftVersion;
      newPublicationStatus = 'UPDATE_AVAILABLE';
    }

    // Persist new draft version.
    // CRITICAL: publishedContent and publishedVersion are strictly preserved!
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        draftContent: content,
        draftVersion: newDraftVersion,
        publicationStatus: newPublicationStatus,
        googleDocId: docTarget,
        googleDocRevision: revisionId,
        syncStatus: 'SYNCED',
        lastSyncedAt: new Date(),
        syncError: null,
      },
    });

    // Record in Sync History audit trail
    await prisma.syncHistory.create({
      data: {
        articleId,
        googleDocId: docTarget,
        revisionId,
        status: 'SUCCESS',
        draftVersion: newDraftVersion,
        message:
          newPublicationStatus === 'UPDATE_AVAILABLE'
            ? `Pembaruan draf v${newDraftVersion} dari Google Docs siap ditinjau. Versi publik tetap v${article.publishedVersion}.`
            : `Draf v${newDraftVersion} dari Google Docs berhasil disinkronkan.`,
      },
    });

    return {
      success: true,
      updated: true,
      articleId,
      draftVersion: newDraftVersion,
      publishedVersion: updatedArticle.publishedVersion,
      publicationStatus: newPublicationStatus,
      syncStatus: 'SYNCED',
      message:
        newPublicationStatus === 'UPDATE_AVAILABLE'
          ? `Pembaruan draf v${newDraftVersion} berhasil disimpan (UPDATE_AVAILABLE). Konten publik tidak berubah.`
          : `Draf v${newDraftVersion} berhasil disinkronkan.`,
    };
  } catch (err: any) {
    // SYNC FAILURE HANDLER:
    // CRITICAL: Failed sync must NEVER corrupt or alter published content
    await prisma.article.update({
      where: { id: articleId },
      data: {
        syncStatus: 'SYNC_ERROR',
        syncError: err.message,
      },
    });

    await prisma.syncHistory.create({
      data: {
        articleId,
        googleDocId: docTarget,
        status: 'FAILED',
        draftVersion: article.draftVersion,
        message: `Gagal sinkronisasi: ${err.message}`,
      },
    });

    return {
      success: false,
      error: err.message,
      articleId,
      publishedVersion: article.publishedVersion,
      draftVersion: article.draftVersion,
      publicationStatus: article.publicationStatus,
      syncStatus: 'SYNC_ERROR',
    };
  }
}

/**
 * Publish article or publish pending update.
 * MUST be transactional and atomic.
 */
export async function publishArticle(
  articleId: string,
  options?: { publisherName?: string; notes?: string }
): Promise<PublishResult> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return { success: false, error: `Artikel dengan ID ${articleId} tidak ditemukan.` };
  }

  const isInitialPublish = article.publicationStatus === 'DRAFT';
  const isUpdate = article.publicationStatus === 'UPDATE_AVAILABLE';

  if (!isInitialPublish && !isUpdate && article.publicationStatus === 'PUBLISHED') {
    return {
      success: true,
      articleId,
      publishedVersion: article.publishedVersion,
      publicationStatus: 'PUBLISHED',
      action: 'PUBLISH_UPDATE',
    };
  }

  const targetVersion = article.draftVersion;
  const actionName = isInitialPublish ? 'PUBLISH' : 'PUBLISH_UPDATE';
  const defaultNotes = isInitialPublish
    ? `Publikasi perdana (v${targetVersion}) disetujui oleh administrator.`
    : `Pembaruan draf v${targetVersion} disetujui dan menggantikan versi publik sebelumnya (v${article.publishedVersion}).`;

  // ATOMIC DATABASE TRANSACTION
  const result = await prisma.$transaction(async (tx) => {
    // 1. Update article state atomically
    const updated = await tx.article.update({
      where: { id: articleId },
      data: {
        publishedContent: article.draftContent,
        content: article.draftContent, // Backward compatibility mirror
        publishedVersion: targetVersion,
        draftVersion: targetVersion,
        publicationStatus: 'PUBLISHED',
        status: 'PUBLISHED', // Mirror
        publishedAt: article.publishedAt || new Date(),
      },
    });

    // 2. Record Publication History
    await tx.publicationHistory.create({
      data: {
        articleId,
        action: actionName,
        version: targetVersion,
        publishedBy: options?.publisherName || 'Rizky Aditya Pratama Wijaya',
        notes: options?.notes || defaultNotes,
      },
    });

    // 3. Create persistent version snapshot
    await tx.articleVersion.create({
      data: {
        articleId,
        version: targetVersion,
        title: article.title,
        content: article.draftContent,
        excerpt: article.excerpt,
        createdById: options?.publisherName || 'Administrator',
      },
    });

    return updated;
  });

  return {
    success: true,
    articleId,
    publishedVersion: result.publishedVersion,
    publicationStatus: 'PUBLISHED',
    action: actionName,
  };
}

/**
 * Discard pending draft update.
 * MUST be transactional and atomic.
 * Restores draftContent to publishedContent and reverts status to PUBLISHED.
 */
export async function discardDraftUpdate(
  articleId: string,
  options?: { discardedBy?: string; reason?: string }
): Promise<DiscardResult> {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return { success: false, error: `Artikel dengan ID ${articleId} tidak ditemukan.` };
  }

  if (article.publicationStatus !== 'UPDATE_AVAILABLE') {
    return {
      success: false,
      error: `Hanya artikel berstatus UPDATE_AVAILABLE yang dapat dibatalkan drafnya (Status saat ini: ${article.publicationStatus}).`,
    };
  }

  // ATOMIC TRANSACTION: Revert draft to published content
  const result = await prisma.$transaction(async (tx) => {
    const updated = await tx.article.update({
      where: { id: articleId },
      data: {
        draftContent: article.publishedContent || '',
        draftVersion: article.publishedVersion,
        publicationStatus: 'PUBLISHED',
        status: 'PUBLISHED',
        googleDocRevision: null, // Reset to allow fresh re-sync if needed
      },
    });

    await tx.publicationHistory.create({
      data: {
        articleId,
        action: 'DISCARD_UPDATE',
        version: article.publishedVersion,
        publishedBy: options?.discardedBy || 'Rizky Aditya Pratama Wijaya',
        notes:
          options?.reason ||
          `Draf pembaruan v${article.draftVersion} dibatalkan. Versi publik v${article.publishedVersion} tetap aktif dan tidak berubah.`,
      },
    });

    return updated;
  });

  return {
    success: true,
    articleId,
    publishedVersion: result.publishedVersion,
    publicationStatus: 'PUBLISHED',
  };
}

/**
 * Batch synchronization check for all linked Google Docs.
 */
export async function checkAllArticlesSync(): Promise<{
  total: number;
  synced: number;
  updated: number;
  failed: number;
}> {
  const articles = await prisma.article.findMany({
    where: {
      googleDocId: { not: null },
    },
    select: { id: true, title: true, googleDocId: true },
  });

  let synced = 0;
  let updated = 0;
  let failed = 0;

  for (const art of articles) {
    try {
      const res = await syncArticleFromGoogleDocs(art.id);
      if (res.success) {
        synced++;
        if (res.updated) updated++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  return { total: articles.length, synced, updated, failed };
}
