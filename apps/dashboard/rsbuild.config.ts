import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

import { env } from './src/env'

export default defineConfig({
  plugins: [pluginVue()],
  resolve: { alias: { '@': './src' } },
  source: { define: { 'process.env': JSON.stringify(process.env) } },
  html: {
    title: 'Dashboard | Yuki',
    favicon: `${env.VUE_PUBLIC_WEB_URL}/favicon.ico`,
  },
})
