import { Suspense } from 'react'

import { Typography } from '@yukinu/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/trpc/rsc'
import { CardList, CardListSkeleton } from './page.client'

export const dynamic = 'force-dynamic'

export default function CartPage() {
  void Promise.all([
    getQueryClient().prefetchQuery(
      trpc.order.byIdOrStatus.queryOptions({ status: 'new' }),
    ),
    getQueryClient().prefetchQuery(trpc.address.all.queryOptions()),
  ])

  return (
    <HydrateClient>
      <section className="w-full space-y-4">
        <Typography variant="h4" component="h2">
          Your Shopping Cart
        </Typography>
        <Suspense fallback={<CardListSkeleton />}>
          <CardList />
        </Suspense>
      </section>
    </HydrateClient>
  )
}
