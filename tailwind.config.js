/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#1b1a55'
        },
        emerald: {
          500: '#10b981'
        },
        rose: {
          500: '#f43f5e'
        },
        violet: {
          500: '#8b5cf6'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        glow: '0 0 0 4px rgba(99,102,241,0.2)'
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease forwards',
        'slide-up': 'slide-up 0.35s ease forwards'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: [],
};
