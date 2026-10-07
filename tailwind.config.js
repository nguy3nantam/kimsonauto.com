/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-progress': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
        'hero-progress': 'hero-progress 6.5s linear forwards',
      },
      colors: {
        primary: {
          DEFAULT: '#1464F4', // Xanh VinFast mặc định
          dark: '#0B4FD1',   // Xanh đậm hơn cho trạng thái hover
          light: '#4A8CFF',  // Xanh sáng cho điểm nhấn
          subtle: '#EAF2FF', // Nền xanh nhạt thanh nhã
        },
        secondary: {
          DEFAULT: '#0f1117', // Đen tuyền sang trọng từ logo Kim Sơn
          light: '#1a1d26',
          muted: '#282c37',
        },
        brand: {
          gold: '#4A8CFF',
          amber: '#1464F4',
          bronze: '#0B4FD1',
          dark: '#0f1117',
          silver: '#94a3b8',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['"Mulish"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Mulish"', 'system-ui', '-apple-system', 'sans-serif'],
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
        'glow': '0 0 25px -5px rgba(20, 100, 244, 0.45)',
        'glow-lg': '0 0 35px -5px rgba(74, 140, 255, 0.5)',
        'premium': '0 20px 30px -10px rgba(15, 17, 23, 0.12)',
      }
    },
  },
  plugins: [],
}
