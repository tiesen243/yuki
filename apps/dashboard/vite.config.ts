import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  define: {
    // eslint-disable-next-line no-restricted-properties
    'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
  },
}))
