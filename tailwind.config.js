/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmos: {
          bg: '#0D0E0F',
          surface: '#121314',
          'surface-dim': '#121314',
          'surface-bright': '#39393A',
          'container-lowest': '#0D0E0F',
          'container-low': '#1B1C1D',
          container: '#1F2021',
          'container-high': '#292A2B',
          'container-highest': '#343536',
          lime: {
            DEFAULT: '#AAD622',
            bright: '#C6F341',
            glow: '#D1FF4D',
            dark: '#546D00',
          },
          text: {
            primary: '#E3E2E3',
            secondary: '#C4C9AF',
            muted: '#8E937B',
          },
          border: {
            DEFAULT: 'rgba(255, 255, 255, 0.1)',
            bright: 'rgba(255, 255, 255, 0.2)',
            lime: 'rgba(170, 214, 34, 0.4)',
          }
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'lime-glow': '0 0 20px rgba(170, 214, 34, 0.35)',
        'lime-glow-lg': '0 0 35px rgba(198, 243, 65, 0.45)',
      },
      backdropBlur: {
        'xs': '4px',
        'glass': '20px',
        'heavy': '40px',
      }
    },
  },
  plugins: [],
}
