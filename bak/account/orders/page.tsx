import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { OrderHistories, OrderHistoriesSkeleton } from './page.client'

export default function OrdersPage() {
  void api.order.getHistories.prefetch()

  return (
    <HydrateClient>
      <main className="flex-1 rounded-md border py-4 shadow-md">
        <div className="container mb-4">
          <Typography variant="h2">Your orders</Typography>
          <Typography color="muted">
            Manage your order history and track recent purchases. View order details,
            invoices and delivery status.
          </Typography>
        </div>

        <hr />

        <section className="container mt-4">
          <Suspense fallback={<OrderHistoriesSkeleton />}>
            <OrderHistories />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
