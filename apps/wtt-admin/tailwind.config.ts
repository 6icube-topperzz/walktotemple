import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        'primary-dark': '#4F46E5',
      },
    },
  },
  plugins: [],
}

export default config
