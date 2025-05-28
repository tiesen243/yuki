import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { CardList, CardListSkeleton } from './page.client'

export default function CartPage() {
  void getQueryClient().prefetchQuery(trpc.cart.get.queryOptions())
  void getQueryClient().prefetchQuery(trpc.address.all.queryOptions())

  return (
    <HydrateClient>
      <section className="grid gap-4">
        <Typography variant="h2">Your Shopping Cart</Typography>
        <Suspense fallback={<CardListSkeleton />}>
          <CardList />
        </Suspense>
      </section>
    </HydrateClient>
  )
}
