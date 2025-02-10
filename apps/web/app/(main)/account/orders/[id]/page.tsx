import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { OrderDetails } from './page.client'

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  void api.order.getDetails.prefetch({ id })

  return (
    <HydrateClient>
      <main className="bg-secondary flex-1 rounded py-4 shadow-md">
        <div className="container mb-4">
          <Typography level="h2">Orders Sumary</Typography>
          <Typography color="muted">
            Track your order status, view order details and access delivery information.
            You can find your order history, payment receipts and manage any returns or
            refunds here.
          </Typography>
        </div>

        <hr className="border-primary/20" />

        <section className="container mt-4">
          <Suspense fallback="loading...">
            <OrderDetails id={id} />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
