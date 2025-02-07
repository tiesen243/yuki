'use client'

import Image from 'next/image'

import type { RouterOutputs } from '@yuki/api'
import { Button } from '@yuki/ui/button'

import { api } from '@/lib/trpc/react'

export const CartDetails: React.FC = () => {
  const [cart] = api.cart.getCart.useSuspenseQuery()

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-primary/20 border-b py-2">
          <tr className="text-muted-foreground m-0 p-0">
            <td colSpan={2} />
            {['Price', 'Quantity', 'Total', 'Action'].map((h, i) => (
              <td key={i} className="py-4 text-center">
                {h}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {cart.items.length <= 0 ? (
            <tr>
              <td colSpan={6} className="text-muted-foreground py-4 text-center">
                No items
              </td>
            </tr>
          ) : (
            cart.items.map((item) => (
              <CartItem
                key={item.productId}
                cartId={cart.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          )}
        </tbody>

        <tfoot className="border-primary/20 border-t">
          <tr>
            <td className="py-4" colSpan={5}>
              Total
            </td>
            <td className="py-4 text-center">${cart.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const CartItem: React.FC<{
  cartId: string
  product: RouterOutputs['cart']['getCart']['items'][number]['product']
  quantity: number
}> = ({ cartId, product, quantity }) => {
  const utils = api.useUtils()
  const deleteItem = api.cart.deleteItemFromCart.useMutation({
    onSuccess: () => utils.cart.getCart.invalidate(),
  })

  return (
    <tr>
      <td className="min-w-[50px] py-4">
        <Image src={product.image} alt={product.name} width={50} height={50} />
      </td>

      <td className="min-w-md p-4 text-start break-words">{product.name}</td>
      <td className="p-4 text-center">${product.price}</td>
      <td className="p-4 text-center">{quantity}</td>
      <td className="p-4 text-center">${quantity * product.price}</td>
      <td className="min-w-20 py-4">
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteItem.mutate({ cartId, productId: product.id })
          }}
          disabled={deleteItem.isPending}
        >
          {deleteItem.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </td>
    </tr>
  )
}
