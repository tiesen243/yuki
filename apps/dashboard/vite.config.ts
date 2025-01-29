import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue(), vueJsx(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, './src') } },
    define: { 'process.env': { ...process.env, ...env } },
  }
})
