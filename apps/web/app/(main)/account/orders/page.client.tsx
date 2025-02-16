'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@yuki/ui/badge'

import { api } from '@/lib/trpc/react'
import { mapStatusBadge } from '@/lib/utils'

export const OrderHistories: React.FC = () => {
  const [orders] = api.order.getHistories.useSuspenseQuery()

  return (
    <div className="flex flex-col gap-4 py-4">
      {orders.map((o) => (
        <Link
          key={o.id}
          href={`/account/orders/${o.id}`}
          className="hover:bg-secondary flex flex-col gap-4 rounded-md border p-6 shadow-md transition-colors"
        >
          {o.items.slice(0, 2).map((i) => (
            <div key={i.product.id} className="flex items-center gap-4">
              <Image
                src={i.product.image}
                alt={i.product.name}
                width={50}
                height={50}
                className="rounded-xs object-cover"
              />
              <p className="flex grow flex-col">
                <span className="text-lg">{i.product.name}</span>
                <span className="text-muted-foreground text-sm">x{i.quantity}</span>
              </p>

              <p>${i.product.price}</p>
            </div>
          ))}
          {o.items.length > 2 && (
            <div className="text-muted-foreground mt-2 text-sm">
              And {o.items.length - 2} more item(s)...
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="space-x-2">
              <Badge variant={mapStatusBadge[o.status]}>{o.status.toLowerCase()}</Badge>
              <Badge variant={mapStatusBadge[o.status]}>{o.payment.toLowerCase()}</Badge>
            </div>

            <p>Total: ${o.total}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export const OrderHistoriesSkeleton: React.FC = () => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: 4 }).map((_, o) => (
      <div key={o} className="flex animate-pulse flex-col gap-4 rounded-md p-6 shadow-md">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="size-[50px] animate-pulse rounded-xs bg-current object-cover" />
            <p className="flex grow flex-col">
              <span className="w-1/6 animate-pulse rounded-md bg-current text-lg">
                &nbsp;
              </span>
              <span className="text-muted-foreground text-sm">x0</span>
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
)
