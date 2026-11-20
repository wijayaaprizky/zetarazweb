import type { Config } from "tailwindcss";

/**
 * Sistem warna ZETARAZ Knowledge: "Soft Intellectual".
 *
 * Dasarnya gading hangat dan putih; aksennya teal lembut, hijau sage, dan emas.
 * Tidak ada biru tua/navy. Tiga kategori diberi warna lembut yang berbeda:
 *   - kn  (teal)  -> Pengetahuan
 *   - ex  (sage)  -> Pengalaman
 *   - op  (emas)  -> Opini
 * `slate` adalah netral bernuansa sage (bukan abu-abu biru): 50 = gading latar,
 * 700 = Deep Sage untuk teks utama.
 *
 * Skala `teal`, `blue`, `sky`, dan `indigo` bawaan Tailwind dialihkan ke teal
 * kita, sehingga komponen lama (termasuk admin) ikut selaras.
 */
const kn = {
  50: "#EEF8F5", 100: "#D8F0EA", 200: "#B3E2D8", 300: "#87D0C2", 400: "#62BFAE",
  500: "#4BAE9D", 600: "#2A8374", 700: "#226A5E", 800: "#1D554C", 900: "#1A453F", 950: "#0F2B27",
};
const ex = {
  50: "#F2F7F3", 100: "#E4EEE8", 200: "#CCE0D4", 300: "#A7C9B5", 400: "#86B09A",
  500: "#689981", 600: "#4F7D67", 700: "#3F6452", 800: "#335044", 900: "#2B4239", 950: "#17261F",
};
const op = {
  50: "#FDF7EB", 100: "#FAEBCF", 200: "#F4DBA9", 300: "#EDC789", 400: "#E8B66C",
  500: "#D99C43", 600: "#B87D26", 700: "#8F5F1C", 800: "#6F4A1A", 900: "#5A3D19", 950: "#32200B",
};
const slate = {
  50: "#F7F8F5", 100: "#EEF1EC", 200: "#DFE5DF", 300: "#C5CEC8", 400: "#8D9996",
  500: "#66706E", 600: "#4F5F5D", 700: "#344C4A", 800: "#2A3F3D", 900: "#1F302E", 950: "#152220",
};
const sun = { 300: "#F0CB93", 400: "#E8B66C", 500: "#D99C43" };

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
        teal: kn,
        blue: kn,
        sky: kn,
        indigo: kn,
        brand: {
          navy: slate[900],
          dark: slate[950],
          blue: kn[600],
          teal: kn[700],
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
        lift: "0 1px 2px rgba(31,48,46,0.05), 0 14px 32px -16px rgba(31,48,46,0.20)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
