import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { OrderDetails } from './page.client'

interface Props {
  params: Promise<{ id: string }>
}
export default async function OrderDetailsPage({ params }: Props) {
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

        <section className="container h-full">
          <Suspense
            fallback={
              <div className="z-10 flex h-4/5 w-full items-center justify-center">
                <div className="border-primary size-12 animate-spin rounded-full border-t-2 border-b-2" />
              </div>
            }
          >
            <OrderDetails id={id} />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params
  try {
    const order = await api.order.getDetails({ id })

    return createMetadata({
      title: `Order #${order.id}`,
      description: `View details for order #${order.id}`,
      robots: { index: false, follow: false },
    })
  } catch {
    return notFound()
  }
}
