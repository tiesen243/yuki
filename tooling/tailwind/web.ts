import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

import base from './base'

const config = {
  darkMode: ['class'],
  content: base.content,
  presets: [base],
  theme: {
    extend: {
      container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
