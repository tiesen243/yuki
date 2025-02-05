import './env'

import tailwindcss from '@tailwindcss/vite'
import { defaultShouldDehydrateQuery } from '@tanstack/vue-query'
import SuperJSON from 'superjson'

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
  fonts: {
    experimental: { processCSSVariables: true },
  },
  vueQuery: {
    queryClientOptions: {
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          staleTime: 60 * 1000,
        },
        dehydrate: {
          serializeData: SuperJSON.serialize,
          shouldDehydrateQuery: (query) =>
            defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        },
        hydrate: {
          deserializeData: SuperJSON.deserialize,
        },
      },
    },
  },
})
