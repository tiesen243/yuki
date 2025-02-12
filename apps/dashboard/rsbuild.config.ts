import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [pluginVue()],
  resolve: { alias: { '@': './src' } },
  source: { define: { 'process.env': JSON.stringify(process.env) } },
})
