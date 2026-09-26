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
          DEFAULT: '#dc2626',
          dark: '#991b1b',
          light: '#ef4444',
          subtle: '#fee2e2',
        },
        secondary: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          muted: '#334155',
        },
        brand: {
          gold: '#f59e0b',
          silver: '#94a3b8',
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
        'glow': '0 0 25px -5px rgba(220, 38, 38, 0.3)',
        'premium': '0 20px 30px -10px rgba(15, 23, 42, 0.1)',
      }
    },
  },
  plugins: [],
}
