import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { CardList } from './page.client'

export default function CartPage() {
  void getQueryClient().prefetchQuery(trpc.cart.getCart.queryOptions())

  return (
    <HydrateClient>
      <section className="grid gap-4">
        <Typography variant="h2">Your Shopping Cart</Typography>

        <Suspense fallback={<div>Loading...</div>}>
          <CardList />
        </Suspense>
      </section>
    </HydrateClient>
  )
}
