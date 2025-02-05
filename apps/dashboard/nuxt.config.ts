import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Dashboard | Yuki',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://tiesen.id.vn/favicon.ico' },
      ],
    },
  },
  css: ['@/styles/globals.css'],
  build: { transpile: ['@yuki/ui'] },
  compatibilityDate: '2025-02-05',
  vite: { plugins: [tailwindcss()] },
  eslint: { config: { standalone: false, stylistic: true } },
  fonts: {
    experimental: { processCSSVariables: true },
  },
})
