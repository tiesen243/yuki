import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import baseConfig from '@yuki/tailwind-config'

const config = {
  content: [...baseConfig.content, '../../packages/ui/src/*.{ts,tsx}'],
  presets: [baseConfig],
  theme: { extend: { fontFamily: { sans: ['var(--font-geist-sans)', ...fontFamily.sans] } } },
} satisfies Config

export default config
