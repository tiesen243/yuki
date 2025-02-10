'use client'

import Image from 'next/image'

import { Product } from '@yuki/db'

import { api } from '@/lib/trpc/react'

export const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
  const [order] = api.order.getDetails.useSuspenseQuery({ id })

  const mapColor = {
    NEW: '',
    PENDING: 'text-yellow-600 dark:text-yellow-500',
    DELIVERED: 'text-green-600 dark:text-green-500',
    CANCELED: 'text-red-600 dark:text-red-500',
  }

  return (
    <div className="space-y-4 overflow-x-auto">
      <table className="w-full">
        <thead className="border-primary/20 border-b py-2">
          <tr className="text-muted-foreground m-0 p-0">
            <td colSpan={2} />
            {['Price', 'Quantity', 'Total'].map((h, i) => (
              <td key={i} className="py-4 text-center">
                {h}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {order.items.map((i) => (
            <OrderItem key={i.productId} product={i.product} quantity={i.quantity} />
          ))}
        </tbody>

        <tfoot className="border-primary/20 border-t">
          <tr>
            <td className="py-4" colSpan={4}>
              Total
            </td>
            <td className="py-4 text-center">${order.total}</td>
          </tr>
          <tr>
            <td className="py-4">Stauts</td>
            <td className={'py-4 lowercase ' + mapColor[order.status]}>{order.status}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const OrderItem: React.FC<{ product: Product; quantity: number }> = ({
  product,
  quantity,
}) => (
  <tr>
    <td className="min-w-[50px] py-4">
      <Image src={product.image} alt={product.name} width={50} height={50} />
    </td>
    <td className="min-w-md p-4 text-start break-words">{product.name}</td>
    <td className="p-4 text-center">${product.price}</td>
    <td className="p-4 text-center">{quantity}</td>
    <td className="p-4 text-center">${quantity * product.price}</td>
  </tr>
)
