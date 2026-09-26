/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0062d2', // Màu xanh dương công nghệ ô tô & tập đoàn uy tín
          dark: '#004599',   // Xanh hoàng gia đậm
          light: '#38bdf8',  // Xanh điện/xanh ngọc sáng
          subtle: '#eff6ff', // Nền xanh nhạt thanh nhã
        },
        secondary: {
          DEFAULT: '#0b1329', // Xanh đen vũ trụ sang trọng
          light: '#132142',
          muted: '#233760',
        },
        brand: {
          gold: '#f59e0b',
          silver: '#94a3b8',
          cyan: '#06b6d4',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'sans-serif'],
      },
      lineHeight: {
        'viet-tight': '1.25',
        'viet-snug': '1.38',
        'viet-normal': '1.6',
        'viet-relaxed': '1.75',
      },
      letterSpacing: {
        'viet-title': '-0.015em',
        'viet-wide': '0.05em',
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(0, 98, 210, 0.45)',
        'premium': '0 20px 30px -10px rgba(11, 19, 41, 0.12)',
      }
    },
  },
  plugins: [],
}
