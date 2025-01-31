import '@/globals.css'

import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { defaultShouldDehydrateQuery, VueQueryPlugin } from '@tanstack/vue-query'
import SuperJSON from 'superjson'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
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
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const app = createApp(App)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(router)
app.mount('#app')
