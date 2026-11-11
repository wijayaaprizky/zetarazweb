'use client';

import React, { useEffect, useState } from 'react';
import { ListTree } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse markdown headings ## and ###
    const lines = content.split('\n');
    const items: TOCItem[] = [];

    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].trim().replace(/\*\*/g, '');
        items.push({ id: slugify(text), text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim().replace(/\*\*/g, '');
        items.push({ id: slugify(text), text, level: 3 });
      }
    }

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%', threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-28">
      <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-slate-100 text-slate-900 font-heading font-bold text-sm">
        <ListTree className="w-4 h-4 text-brand-teal" />
        <span>Daftar Isi Artikel</span>
      </div>

      <ul className="space-y-2 text-xs leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              className={`${h.level === 3 ? 'pl-3' : ''}`}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveId(h.id);
                  }
                }}
                className={`block transition-colors py-1 ${
                  isActive
                    ? 'text-brand-blue font-bold border-l-2 border-brand-blue pl-2 -ml-2.5'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
