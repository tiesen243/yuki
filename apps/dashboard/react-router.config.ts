import type { Config } from '@react-router/dev/config'
import { vercelPreset } from '@vercel/react-router/vite'

export default {
  appDirectory: 'src',
  future: {
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
  },
  presets: [vercelPreset()],
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config
