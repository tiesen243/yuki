import { Suspense } from 'react'

import { Badge } from '@yuki/ui/badge'
import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { OrderHistories } from './page.client'

export const dynamic = 'force-dynamic'

export default function OrdersPage() {
  void getQueryClient().prefetchQuery(trpc.order.getHistories.queryOptions())

  return (
    <HydrateClient>
      <main className="flex-1 rounded-md border py-4 shadow-md">
        <div className="container mb-4">
          <Typography variant="h2">Your orders</Typography>
          <Typography color="muted">
            Manage your order history and track recent purchases. View order
            details, invoices and delivery status.
          </Typography>
        </div>

        <hr />

        <section className="container mt-4">
          <Suspense
            fallback={
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, o) => (
                  <div
                    key={o}
                    className="flex animate-pulse flex-col gap-4 rounded-md p-6 shadow-md"
                  >
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="size-[50px] animate-pulse rounded-xs bg-current object-cover" />
                        <p className="flex grow flex-col">
                          <span className="w-1/6 animate-pulse rounded-md bg-current text-lg">
                            &nbsp;
                          </span>
                          <span className="text-muted-foreground text-sm">
                            x0
                          </span>
                        </p>

                        <p>$0</p>
                      </div>
                    ))}

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-x-2">
                        <Badge>Loading...</Badge>
                        <Badge>Loading...</Badge>
                      </div>
                      <p>Total: $0</p>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <OrderHistories />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
