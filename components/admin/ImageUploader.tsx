'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  UploadCloud,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  ExternalLink,
} from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: string; // e.g. "aspect-video" or "aspect-square"
  helperText?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Gambar',
  aspectRatio = 'aspect-video',
  helperText,
}: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa format gambar (JPG, PNG, WebP, GIF, SVG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Ukuran gambar tidak boleh melebihi 10MB');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(null);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
        setUploadSuccess(`Berhasil diunggah: ${file.name}`);
        setTimeout(() => setUploadSuccess(null), 4000);
      } else {
        setUploadError(data.error || 'Gagal mengunggah gambar');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError('Koneksi terputus saat mengunggah gambar');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}

      {/* Visual Preview */}
      <div
        className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Pratinjau Gambar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1 shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Buka Asli
              </a>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow"
              >
                <X className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <ImageIcon className="w-8 h-8 mb-1.5 text-slate-300" />
            <span className="text-xs font-medium">Belum ada gambar yang dipilih</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4">
            <RefreshCw className="w-8 h-8 animate-spin text-teal-400 mb-2" />
            <span className="text-xs font-bold">Sedang mengunggah gambar...</span>
          </div>
        )}
      </div>

      {/* Method Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'upload'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload File Gambar</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'url'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>Tautan URL Web</span>
        </button>
      </div>

      {/* Upload Zone */}
      {activeTab === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-')}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-')}`}
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-teal-300 hover:border-teal-500 bg-teal-50/40 hover:bg-teal-50/80 rounded-xl cursor-pointer transition-all text-center group"
          >
            <UploadCloud className="w-6 h-6 text-teal-600 group-hover:scale-110 transition-transform mb-1" />
            <span className="text-xs font-bold text-teal-900">
              Pilih Gambar dari Komputer / Perangkat Anda
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Mendukung JPG, PNG, WebP, GIF, SVG (Maks. 10MB)
            </span>
          </label>
        </div>
      )}

      {/* URL Input */}
      {activeTab === 'url' && (
        <div>
          <input
            type="text"
            placeholder="Tempelkan tautan URL gambar (https://...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
          />
        </div>
      )}

      {/* Feedback Messages */}
      {uploadError && (
        <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="text-xs text-teal-700 bg-teal-50 p-2.5 rounded-lg border border-teal-200 flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-400 leading-tight">
          {helperText}
        </p>
      )}
    </div>
  );
}
