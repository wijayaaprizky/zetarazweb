'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, RotateCcw, Columns } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

interface PreviewActionsBarProps {
  articleId: string;
  publicationStatus: string;
  draftVersion: number;
  publishedVersion: number;
}

export default function PreviewActionsBar({
  articleId,
  publicationStatus,
  draftVersion,
  publishedVersion,
}: PreviewActionsBarProps) {
  const router = useRouter();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isUpdate = publicationStatus === 'UPDATE_AVAILABLE';

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: isUpdate
            ? `Pembaruan draf v${draftVersion} disetujui dari mode pratinjau.`
            : `Publikasi perdana draf v${draftVersion} disetujui dari mode pratinjau.`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsPublishModalOpen(false);
        router.push(`/admin/articles/${articleId}/edit?published=true`);
        router.refresh();
      } else {
        alert(`Gagal mempublikasikan: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/articles/${articleId}/discard-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: 'Draf pembaruan dibatalkan dari halaman pratinjau.',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsDiscardModalOpen(false);
        router.push(`/admin/articles/${articleId}/edit?discarded=true`);
        router.refresh();
      } else {
        alert(`Gagal membatalkan draf: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/articles/${articleId}/edit?tab=diff`}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <Columns className="w-3.5 h-3.5 text-teal-400" />
          <span>Bandingkan Versi (Diff)</span>
        </Link>

        {isUpdate && (
          <button
            type="button"
            onClick={() => setIsDiscardModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Batalkan Draf</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsPublishModalOpen(true)}
          className="px-4 py-1.5 rounded-xl bg-brand-teal hover:bg-teal-600 text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-all"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>
            {isUpdate ? `Publikasikan Pembaruan (v${draftVersion})` : 'Publikasikan Sekarang'}
          </span>
        </button>
      </div>

      {/* Confirmation Modal for Publish */}
      <ConfirmModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={handlePublish}
        title={isUpdate ? 'Konfirmasi Publikasikan Pembaruan' : 'Konfirmasi Publikasi Artikel'}
        description={
          isUpdate
            ? `Apakah Anda yakin ingin mempublikasikan versi draf v${draftVersion}? Versi ini akan menggantikan versi publik saat ini (v${publishedVersion}) secara atomik.`
            : `Apakah Anda yakin ingin mempublikasikan draf artikel v${draftVersion} ke publik? Artikel akan langsung dapat diakses oleh seluruh pengunjung.`
        }
        confirmLabel={isUpdate ? 'Ya, Publikasikan Pembaruan' : 'Ya, Publikasikan'}
        variant="success"
        isLoading={isLoading}
      />

      {/* Confirmation Modal for Discard */}
      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={handleDiscard}
        title="Konfirmasi Batalkan Draf Pembaruan"
        description={`Apakah Anda yakin ingin membatalkan draf pembaruan ini? Draf akan dikembalikan ke versi publik saat ini (v${publishedVersion}). Versi publik tetap aktif dan tidak terpengaruh.`}
        confirmLabel="Ya, Batalkan Draf"
        variant="danger"
        isLoading={isLoading}
      />
    </>
  );
}
