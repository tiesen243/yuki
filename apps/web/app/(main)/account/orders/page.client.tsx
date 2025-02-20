'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'

import { Badge } from '@yuki/ui/badge'

import { useTRPC } from '@/lib/trpc/react'
import { mapStatusBadge } from '@/lib/utils'

export const OrderHistories: React.FC = () => {
  const trpc = useTRPC()
  const { data: orders } = useSuspenseQuery(
    trpc.order.getHistories.queryOptions(),
  )

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
                <span className="text-muted-foreground text-sm">
                  x{i.quantity}
                </span>
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
              <Badge variant={mapStatusBadge[o.status]}>
                {o.status.toLowerCase()}
              </Badge>
              <Badge variant={mapStatusBadge[o.payment]}>
                {o.payment.toLowerCase()}
              </Badge>
            </div>

            <p>Total: ${o.total}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
