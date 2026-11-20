'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-slate-300 mr-1 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" /> Bagikan
      </span>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white ring-1 ring-inset ring-white/10 transition-colors relative"
        title="Salin tautan"
        aria-label="Salin tautan artikel ke papan klip"
      >
        {copied ? (
          <Check className="w-4 h-4 text-ex-300" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
            Tersalin!
          </span>
        )}
      </button>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white ring-1 ring-inset ring-white/10 transition-colors"
        title="Bagikan ke X"
        aria-label="Bagikan artikel ke X (Twitter)"
      >
        <Twitter className="w-4 h-4" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white ring-1 ring-inset ring-white/10 transition-colors"
        title="Bagikan ke LinkedIn"
        aria-label="Bagikan artikel ke LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-ex-500/20 hover:bg-ex-500/30 text-ex-200 ring-1 ring-inset ring-ex-400/30 transition-colors text-xs font-bold"
        title="Bagikan ke WhatsApp"
        aria-label="Bagikan artikel ke WhatsApp"
      >
        WA
      </a>
    </div>
  );
}
