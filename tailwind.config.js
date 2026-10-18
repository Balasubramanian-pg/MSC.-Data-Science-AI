/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Abadi', 'Abadi MT Condensed Light', 'Avenir Next Cyr', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        headings: ['Abadi', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#F9F8F5',
          200: '#F3F0EA',
          300: '#EAE6DD',
          400: '#D5CEC0',
        },
        dark: {
          canvas: '#0D0E12',
          panel: '#12131A',
          card: '#15161E',
          capsule: '#191B24',
          track: '#232532',
        },
        brand: {
          coral: '#E75A4E',
          violet: '#906BFF',
          mint: '#34D399',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
