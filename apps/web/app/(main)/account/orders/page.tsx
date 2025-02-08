import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { OrderHistories, OrderHistoriesSkeleton } from './page.client'

export default function OrdersPage() {
  void api.order.getHistories.prefetch()

  return (
    <HydrateClient>
      <main className="bg-secondary flex-1 rounded py-4 shadow-md">
        <div className="container mb-4">
          <Typography level="h2">Your orders</Typography>
          <Typography color="muted">
            Manage your order history and track recent purchases. View order details,
            invoices and delivery status.
          </Typography>
        </div>

        <hr className="border-primary/20" />

        <section className="container mt-4">
          <Suspense fallback={<OrderHistoriesSkeleton />}>
            <OrderHistories />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
