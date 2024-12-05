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
      colors: {
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
