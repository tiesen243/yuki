import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import base from '@yuki/tailwind-config/web'

const config = {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...base.content, '../../packages/ui/src/ui/*.{ts,tsx}'],
  presets: [base],
  theme: { extend: { fontFamily: { sans: ['var(--font-geist-sans)', ...fontFamily.sans] } } },
} satisfies Config

export default config
