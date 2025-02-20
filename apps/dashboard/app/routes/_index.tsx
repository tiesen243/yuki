import { Suspense } from 'react'

import type { Route } from './+types/_index'
import { Products } from '@/components/products'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'

export const loader = ({ request }: Route.LoaderArgs) => {
  void getQueryClient().prefetchQuery(
    trpc(request).product.getAll.queryOptions({}),
  )
}

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="container py-4">
        <Suspense fallback="Loading....">
          <Products />
        </Suspense>
      </main>
    </HydrateClient>
  )
}
