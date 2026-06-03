import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        'saffron-dark': '#E8870A',
        'saffron-light': '#FFB366',
        gold: '#FFD700',
        'gold-light': '#FFF0A0',
        maroon: '#8B0000',
        cream: '#FFF8F0',
        hero: '#1E293B',
      },
      fontFamily: {
        heading: ['"Crimson Text"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
