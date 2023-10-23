/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        secondary: {
          DEFAULT: '#666666',
          100: '#f5f5f5',
          200: '#d1d1d1',
          300: '#bab8b8',
          400: '#a3a2a2',
          500: '#7a7a7a',
          600: '#666666',
          700: '#4d4d4d',
          800: '#303030',
          900: '#1c1c1c'
        },
        primary: {
          DEFAULT: '#666666',
          100: '#0ef087',
          200: '#09b867',
          300: '#089e59',
          400: '#067d46',
          500: '#046337',
          600: '#034d2a',
          700: '#02331c',
          750: '#022e19',
          800: '#011c0f',
          900: '#02140b'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
