/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#05050f',
        bgSecondary: '#0d0d1a',
        bgTertiary: '#13131f',
        accentViolet: '#7c3aed',
        accentCyan: '#06b6d4',
        accentPink: '#ec4899',
        textPrimary: '#e2e8f0',
        textMuted: '#64748b',
        borderViolet: 'rgba(124, 58, 237, 0.2)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
