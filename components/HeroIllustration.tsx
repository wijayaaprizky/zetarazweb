import React from 'react';

/**
 * Ilustrasi utama hero: buku terbuka (sumber pengetahuan), cahaya yang naik dari
 * lipatannya (lahirnya gagasan), dan simpul-simpul yang saling terhubung
 * (pertukaran pengetahuan). Digambar sebagai SVG dengan gradasi lembut agar
 * terasa tiga dimensi tanpa aset gambar atau dependency tambahan.
 * Warna: teal, sage, putih, dan emas.
 */

function Cube({ x, y, s, top, left, right }: { x: number; y: number; s: number; top: string; left: string; right: string }) {
  const h = s / 2;
  const d = s * 0.58;
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={`0,${-d} ${s},${-d + h * 0.58} 0,${-d + h * 1.16} ${-s},${-d + h * 0.58}`} fill={top} />
      <polygon points={`${-s},${-d + h * 0.58} 0,${-d + h * 1.16} 0,${h * 1.16 + h * 0.58 + 2} ${-s},${h * 0.58 + 2 + 0}`} fill={left} />
      <polygon points={`${s},${-d + h * 0.58} 0,${-d + h * 1.16} 0,${h * 1.16 + h * 0.58 + 2} ${s},${h * 0.58 + 2 + 0}`} fill={right} />
    </g>
  );
}

function Node({ x, y, r, id }: { x: number; y: number; r: number; id: string }) {
  return (
    <g>
      <circle cx={x} cy={y + r * 0.55} r={r} fill="#344C4A" opacity="0.10" />
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
      <circle cx={x - r * 0.32} cy={y - r * 0.34} r={r * 0.28} fill="#fff" opacity="0.55" />
    </g>
  );
}

export default function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 480"
      className={className}
      role="img"
      aria-label="Ilustrasi buku terbuka dengan cahaya gagasan dan jaringan pengetahuan yang saling terhubung"
    >
      <defs>
        <radialGradient id="zi-blob" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#E4EEE8" />
          <stop offset="1" stopColor="#E4EEE8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="zi-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F6D9A4" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="#E8B66C" stopOpacity="0.28" />
          <stop offset="1" stopColor="#E8B66C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="zi-orb" cx="36%" cy="32%" r="75%">
          <stop offset="0" stopColor="#FFF8E6" />
          <stop offset="0.5" stopColor="#F2CD8E" />
          <stop offset="1" stopColor="#D99C43" />
        </radialGradient>
        <linearGradient id="zi-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F6D9A4" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F6D9A4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="zi-pageL" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF1EC" />
        </linearGradient>
        <linearGradient id="zi-pageR" x1="1" y1="0" x2="0" y2="0.4">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF1EC" />
        </linearGradient>
        <linearGradient id="zi-cover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C9A8A" />
          <stop offset="1" stopColor="#226A5E" />
        </linearGradient>
        <radialGradient id="zi-n-teal" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#9BE0D2" />
          <stop offset="1" stopColor="#2A8374" />
        </radialGradient>
        <radialGradient id="zi-n-sage" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#DCEBE1" />
          <stop offset="1" stopColor="#7FA890" />
        </radialGradient>
        <radialGradient id="zi-n-gold" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FBE6BD" />
          <stop offset="1" stopColor="#D99C43" />
        </radialGradient>
        <radialGradient id="zi-n-white" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D5DED8" />
        </radialGradient>
        <filter id="zi-blur" x="-30%" y="-200%" width="160%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Alas lembut dan cincin orbit */}
      <ellipse cx="280" cy="240" rx="250" ry="226" fill="url(#zi-blob)" />
      <ellipse cx="280" cy="236" rx="206" ry="190" fill="none" stroke="#A7C9B5" strokeOpacity="0.55" strokeDasharray="2 7" strokeLinecap="round" strokeWidth="1.6" />
      <ellipse cx="280" cy="236" rx="142" ry="128" fill="none" stroke="#A7C9B5" strokeOpacity="0.4" strokeWidth="1" />

      {/* Jaringan: garis dari cahaya ke simpul */}
      <g stroke="#7FA890" strokeOpacity="0.55" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M280 150 L128 120" />
        <path d="M280 150 L440 112" />
        <path d="M280 150 L488 232" />
        <path d="M280 150 L72 236" />
        <path d="M128 120 L72 236" />
        <path d="M440 112 L488 232" />
        <path d="M128 120 L196 54" />
        <path d="M440 112 L384 52" />
      </g>

      {/* Cahaya naik dari lipatan buku */}
      <polygon points="252,338 308,338 360,170 200,170" fill="url(#zi-beam)" />
      <circle cx="280" cy="150" r="118" fill="url(#zi-glow)" className="zi-pulse" />

      {/* Bayangan di bawah buku */}
      <ellipse cx="280" cy="428" rx="196" ry="20" fill="#344C4A" opacity="0.16" filter="url(#zi-blur)" />

      {/* Sampul: mengikuti bentuk halaman, sedikit lebih besar */}
      <path d="M64 300 Q174 276 280 328 L280 402 Q174 352 64 372 Z" fill="url(#zi-cover)" />
      <path d="M496 300 Q386 276 280 328 L280 402 Q386 352 496 372 Z" fill="url(#zi-cover)" />
      {/* Tebal tumpukan halaman */}
      <path d="M76 346 Q176 330 280 380 L280 392 Q176 344 76 360 Z" fill="#CCE0D4" />
      <path d="M484 346 Q384 330 280 380 L280 392 Q384 344 484 360 Z" fill="#CCE0D4" />

      {/* Halaman kiri dan kanan */}
      <path d="M78 296 Q176 280 280 330 L280 384 Q176 336 78 352 Z" fill="url(#zi-pageL)" />
      <path d="M482 296 Q384 280 280 330 L280 384 Q384 336 482 352 Z" fill="url(#zi-pageR)" />
      <path d="M280 330 L280 384" stroke="#B8D3C3" strokeWidth="2" />

      {/* Baris teks pada halaman */}
      <g stroke="#A7C9B5" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M110 306 Q172 296 246 334" />
        <path d="M110 320 Q172 310 246 348" />
        <path d="M110 334 Q160 326 214 352" opacity="0.8" />
        <path d="M450 306 Q388 296 314 334" />
        <path d="M450 320 Q388 310 314 348" />
        <path d="M450 334 Q400 326 346 352" opacity="0.8" />
      </g>
      <path d="M110 346 Q146 340 184 356" stroke="#E8B66C" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* Bola cahaya (gagasan) */}
      <circle cx="280" cy="150" r="42" fill="url(#zi-orb)" />
      <circle cx="266" cy="136" r="11" fill="#fff" opacity="0.6" />
      <path d="M280 98 L283 112 L297 115 L283 118 L280 132 L277 118 L263 115 L277 112 Z" fill="#fff" opacity="0.9" transform="translate(40 -26) scale(0.7)" />

      {/* Simpul pengetahuan */}
      <Node x={128} y={120} r={19} id="zi-n-teal" />
      <Node x={440} y={112} r={16} id="zi-n-sage" />
      <Node x={488} y={232} r={14} id="zi-n-gold" />
      <Node x={72} y={236} r={13} id="zi-n-white" />
      <Node x={196} y={54} r={10} id="zi-n-sage" />
      <Node x={384} y={52} r={11} id="zi-n-teal" />

      {/* Kubus melayang: teknologi dan kreativitas */}
      <Cube x={452} y={372} s={26} top="#9BE0D2" left="#4BAE9D" right="#2A8374" />
      <Cube x={96} y={388} s={20} top="#FBE6BD" left="#E8B66C" right="#C98E3A" />
      <Cube x={402} y={196} s={14} top="#FFFFFF" left="#DCEBE1" right="#A7C9B5" />
    </svg>
  );
}
