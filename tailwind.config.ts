import type { Config } from "tailwindcss";

/**
 * Sistem warna ZETARAZ Knowledge
 *
 * Gagasan: "peta pengetahuan". Tiga kategori punya warna sendiri supaya pembaca
 * langsung mengenali jenis tulisan tanpa membaca labelnya:
 *   - kn  (ultramarine)  → Pengetahuan
 *   - ex  (hijau-teal)   → Pengalaman
 *   - op  (koral-rose)   → Opini
 * Warna netral (slate) sengaja diberi semburat biru-malam agar seluruh halaman
 * terasa satu keluarga, bukan abu-abu generik.
 *
 * Skala `teal`, `blue`, `sky`, dan `indigo` bawaan Tailwind dialihkan ke palet
 * ini, sehingga komponen lama yang masih memakai nama-nama itu ikut selaras.
 *
 * Semua pasangan teks/latar utama sudah diuji kontrasnya (WCAG AA).
 */
const kn = {
  50: "#EEF0FF", 100: "#E0E4FF", 200: "#C4CBFF", 300: "#9AA6FF", 400: "#6E7CFF",
  500: "#4B5BF7", 600: "#3A47E6", 700: "#2F39C4", 800: "#29329D", 900: "#272F7B", 950: "#181C52",
};
const ex = {
  50: "#E8FBF6", 100: "#C8F5EA", 200: "#96EAD6", 300: "#5ADABF", 400: "#2BC4A5",
  500: "#12A88C", 600: "#087A66", 700: "#0B6F5F", 800: "#0D594D", 900: "#0D493F", 950: "#052B25",
};
const op = {
  50: "#FFF0F3", 100: "#FFE0E7", 200: "#FFC2D0", 300: "#FF94AB", 400: "#FF5F84",
  500: "#F23A67", 600: "#D8214F", 700: "#B5163F", 800: "#94153A", 900: "#7A1535", 950: "#430A1D",
};
const slate = {
  50: "#F6F7FC", 100: "#EDEFF8", 200: "#DDE0F0", 300: "#C3C8E0", 400: "#7D84AB",
  500: "#5F6690", 600: "#4A5079", 700: "#363B63", 800: "#262A4D", 900: "#171A3A", 950: "#0E1128",
};
const sun = { 300: "#FFD84D", 400: "#FFC53D", 500: "#FFB000" };

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Kelas warna kategori didefinisikan di lib/categoryTheme.ts
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kn,
        ex,
        op,
        sun,
        slate,
        teal: ex,
        blue: kn,
        sky: kn,
        indigo: kn,
        brand: {
          navy: slate[900],
          dark: slate[950],
          blue: kn[600],
          teal: ex[600],
          cyan: kn[500],
          bg: slate[50],
          card: "#FFFFFF",
          border: slate[200],
          text: slate[800],
          muted: slate[500],
        },
      },
      fontFamily: {
        // Judul dan antarmuka
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-ui)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-ui)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Isi artikel: dirancang untuk membaca teks panjang di layar
        read: ["var(--font-read)", "Georgia", "serif"],
      },
      boxShadow: {
        lift: "0 1px 2px rgba(23,26,58,0.06), 0 12px 32px -12px rgba(23,26,58,0.18)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
