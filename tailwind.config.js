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
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(220, 38, 38, 0.3)',
        'premium': '0 20px 30px -10px rgba(15, 23, 42, 0.1)',
      }
    },
  },
  plugins: [],
}
