'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Coffee, Moon } from 'lucide-react';

type ThemeKey = 'light' | 'sepia' | 'dark';
type SizeKey = 'sm' | 'md' | 'lg';

const THEMES: Array<{ key: ThemeKey; label: string; icon: typeof Sun }> = [
  { key: 'light', label: 'Terang', icon: Sun },
  { key: 'sepia', label: 'Sepia', icon: Coffee },
  { key: 'dark', label: 'Gelap', icon: Moon },
];

const SIZES: Array<{ key: SizeKey; label: string; aria: string; cls: string }> = [
  { key: 'sm', label: 'A', aria: 'Huruf kecil', cls: 'text-xs' },
  { key: 'md', label: 'A', aria: 'Huruf sedang', cls: 'text-base' },
  { key: 'lg', label: 'A', aria: 'Huruf besar', cls: 'text-xl' },
];

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* penyimpanan bisa diblokir; pilihan tetap berlaku di halaman ini */
  }
}

/**
 * Kontrol kenyamanan membaca: ukuran huruf dan tema latar.
 * Pilihan disimpan di peramban dan diterapkan sebelum halaman tampil
 * (lihat skrip kecil di app/layout.tsx), jadi tidak ada kedipan.
 * Warna memakai variabel .reading-panel agar ikut berganti bersama temanya.
 */
export default function ReadingControls() {
  const [theme, setTheme] = useState<ThemeKey>('light');
  const [size, setSize] = useState<SizeKey>('md');

  useEffect(() => {
    const el = document.documentElement;
    const t = el.getAttribute('data-read-theme');
    const s = el.getAttribute('data-read-size');
    if (t === 'sepia' || t === 'dark') setTheme(t);
    if (s === 'sm' || s === 'lg') setSize(s);
  }, []);

  const applyTheme = (key: ThemeKey) => {
    setTheme(key);
    const el = document.documentElement;
    if (key === 'light') el.removeAttribute('data-read-theme');
    else el.setAttribute('data-read-theme', key);
    store('zr-read-theme', key);
  };

  const applySize = (key: SizeKey) => {
    setSize(key);
    const el = document.documentElement;
    if (key === 'md') el.removeAttribute('data-read-size');
    else el.setAttribute('data-read-size', key);
    store('zr-read-size', key);
  };

  const idle = { color: 'var(--rp-muted)' };
  const active = { background: 'var(--rp-strong)', color: 'var(--rp-bg)' };

  return (
    <div
      className="mb-8 flex flex-wrap items-center justify-between gap-3 pb-5"
      style={{ borderBottom: '1px solid var(--rp-rule)' }}
    >
      <div className="flex items-center gap-2" role="group" aria-label="Ukuran huruf">
        <span className="mr-1 text-sm font-medium" style={idle}>
          Ukuran huruf
        </span>
        {SIZES.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-label={s.aria}
            aria-pressed={size === s.key}
            onClick={() => applySize(s.key)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg font-heading font-bold transition-colors ${s.cls}`}
            style={size === s.key ? active : { ...idle, boxShadow: 'inset 0 0 0 1px var(--rp-rule)' }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="Tema bacaan">
        {THEMES.map((t) => {
          const Icon = t.icon;
          const on = theme === t.key;
          return (
            <button
              key={t.key}
              type="button"
              aria-pressed={on}
              onClick={() => applyTheme(t.key)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors"
              style={on ? active : { ...idle, boxShadow: 'inset 0 0 0 1px var(--rp-rule)' }}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
