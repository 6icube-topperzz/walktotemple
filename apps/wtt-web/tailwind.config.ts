import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@6icube/ui/src/**/*.{ts,tsx}',
  ],
  safelist: [
    'bg-[var(--brand)]', 'bg-[var(--brand-hover)]', 'bg-[var(--surface)]',
    'ring-[var(--brand-ring)]',
    'text-[var(--brand)]', 'text-[var(--brand-fg)]', 'text-[var(--muted)]', 'text-[var(--surface-fg)]',
    'hover:bg-[var(--brand-hover)]', 'hover:text-[var(--brand)]', 'hover:text-[var(--surface-fg)]',
  ],
  presets: [require('./node_modules/@6icube/ui/tailwind-preset')],
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
