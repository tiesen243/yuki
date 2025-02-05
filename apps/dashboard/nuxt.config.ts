import './env'

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@hebilicious/vue-query-nuxt',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Dashboard | Yuki',
      meta: [
        {
          name: 'description',
          content:
            'An innovative E-Commerce application built using Turbo repo and Next.js, offering a seamless shopping experience with fast performance and modern design.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://tiesen.id.vn/favicon.ico' },
      ],
    },
  },
  css: ['@/styles/globals.css'],
  colorMode: { classSuffix: '' },
  build: { transpile: ['@yuki/api', '@yuki/ui'] },
  compatibilityDate: '2025-02-05',
  vite: { plugins: [tailwindcss()] },
  eslint: { config: { standalone: false, stylistic: true } },
  fonts: { experimental: { processCSSVariables: true } },
  vueQuery: {
    queryClientOptions: { defaultOptions: { queries: { staleTime: 60 * 1000 } } },
  },
})
