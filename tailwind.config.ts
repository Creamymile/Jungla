import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black:        '#080808',
        'black-soft': '#111110',
        'black-mid':  '#1a1a19',
        charcoal:     '#2c2c2a',
        cream:        '#f5f0e8',
        'cream-dark': '#ece6d8',
        'cream-deep': '#ddd5c4',
        white:        '#fefcf8',
        taupe:        '#c4b49a',
        muted:        '#8a8478',
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.38em',
        wider:  '0.22em',
      },
    },
  },
  plugins: [],
}

export default config
