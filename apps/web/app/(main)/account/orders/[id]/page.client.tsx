'use client'

import Image from 'next/image'

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

import { api } from '@/lib/trpc/react'

export const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
  const [order] = api.order.getDetails.useSuspenseQuery({ id })

  return (
    <div className="my-6 space-y-4 overflow-x-auto">
      <Table className="**:border-primary/20">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>
              Status: <Badge variant={order.status}>{order.status}</Badge>
            </TableHead>
            {['Price', 'Quantity', 'Total'].map((h, i) => (
              <TableHead key={i} className="text-center">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {order.items.map((i) => (
            <OrderItem key={i.productId} product={i.product} quantity={i.quantity} />
          ))}
        </TableBody>

        <TableFooter className="bg-background/50 border-primary/20">
          <TableRow className="hover:bg-background/50">
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-center">${order.total}</TableCell>
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
  <TableRow className="hover:bg-background/50">
    <TableCell className="min-w-[50px]">
      <Image src={product.image} alt={product.name} width={50} height={50} />
    </TableCell>
    <TableCell className="min-w-md break-words">{product.name}</TableCell>
    <TableCell className="text-center">${product.price}</TableCell>
    <TableCell className="text-center">{quantity}</TableCell>
    <TableCell className="text-center">${quantity * product.price}</TableCell>
  </TableRow>
)
