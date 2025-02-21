import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ['@yuki/api', '@yuki/auth', '@yuki/db', '@yuki/ui/icons'],
    exclude: ['@node-rs/argon2-wasm32-wasi'],
  },
  build: {
    rollupOptions: {
      external: ['@node-rs/argon2', '@node-rs/argon2-wasm32-wasi'],
    },
  },
  define: {
    // eslint-disable-next-line no-restricted-properties
    'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) },
  },
}))
