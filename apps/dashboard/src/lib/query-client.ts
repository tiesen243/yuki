import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import { defaultShouldDehydrateQuery } from '@tanstack/react-query'
import SuperJSON from 'superjson'

export const queryClientConfigs = {
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
} satisfies VueQueryPluginOptions
