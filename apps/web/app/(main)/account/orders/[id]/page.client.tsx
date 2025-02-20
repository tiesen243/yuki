'use client'

import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { Product } from '@yuki/db'
import { Badge } from '@yuki/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'

import { useTRPC } from '@/lib/trpc/react'
import { mapStatusBadge } from '@/lib/utils'

export const OrderDetails: React.FC<{ id: number }> = ({ id }) => {
  const trpc = useTRPC()

  const { data: order } = useSuspenseQuery(
    trpc.order.getDetails.queryOptions({ id }),
  )

  return (
    <div className="space-y-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Order ID: {order.id}</TableHead>
            {['Price', 'Quantity', 'Total'].map((h, i) => (
              <TableHead key={i} className="text-center">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.items.map((i) => (
            <OrderItem
              key={i.productId}
              product={i.product}
              quantity={i.quantity}
            />
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="space-x-2">
              <Badge variant={mapStatusBadge[order.status]}>
                {order.status.toLowerCase()}
              </Badge>
              <Badge variant={mapStatusBadge[order.payment]}>
                {order.payment.toLowerCase()}
              </Badge>
            </TableCell>

            <TableCell align="right">Total</TableCell>
            <TableCell align="right">${order.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

const OrderItem: React.FC<{ product: Product; quantity: number }> = ({
  product,
  quantity,
}) => (
  <TableRow>
    <TableCell className="min-w-[50px]">
      <Image src={product.image} alt={product.name} width={50} height={50} />
    </TableCell>
    <TableCell className="min-w-md break-words">{product.name}</TableCell>
    <TableCell align="right">${product.price}</TableCell>
    <TableCell align="right">{quantity}</TableCell>
    <TableCell align="right">${quantity * product.price}</TableCell>
  </TableRow>
)
