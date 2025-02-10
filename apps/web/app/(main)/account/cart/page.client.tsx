'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { RouterOutputs } from '@yuki/api'
import { Button } from '@yuki/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'
import { toast } from '@yuki/ui/toast'

import { useDebounce } from '@/hooks/use-debounce'
import { api } from '@/lib/trpc/react'

export const CartDetails: React.FC = () => {
  const router = useRouter()
  const utils = api.useUtils()

  const [cart] = api.cart.getCart.useSuspenseQuery()

  const { data } = api.user.getAddress.useQuery()
  const [address, setAddress] = useState<string>('')

  const confirmOrder = api.order.updateOrder.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async (d) => {
      await utils.order.getDetails.invalidate({ id: cart.id })
      await utils.order.getHistories.invalidate()
      router.push(`/account/orders/${cart.id}`)
      toast.success(d.message)
    },
  })

  return (
    <div className="space-y-4 overflow-x-auto">
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

      <div className="flex items-center justify-between">
        <Select value={address} onValueChange={setAddress}>
          <SelectTrigger className="border-primary/20 basis-1/3 text-start focus:ring-transparent">
            <SelectValue placeholder="Address" />
          </SelectTrigger>

          <SelectContent className="bg-secondary border-primary/20">
            {data?.map((a) => (
              <SelectItem key={a.id} value={a.id} className="focus:bg-background/40">
                <div>
                  {a.name} | {a.phone}
                </div>
                <div>{a.state}</div>
                <div>{a.street}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={confirmOrder.isPending}
          onClick={() => {
            confirmOrder.mutate({
              id: cart.id,
              status: 'PENDING',
              addressId: address,
            })
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

const CartItem: React.FC<{
  cartId: string
  product: RouterOutputs['cart']['getCart']['items'][number]['product']
  quantity: number
}> = ({ cartId, product, quantity }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity)

  const utils = api.useUtils()

  const deleteItem = api.cart.deleteItemFromCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate()
      toast.success('Item deleted!')
    },
    onError: (e) => toast.error(e.message),
  })

  const updateItem = api.cart.updateCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate()
      toast.success('Item updated!')
    },
    onError: (e) => {
      toast.error(e.message)
      setLocalQuantity(quantity)
    },
  })

  const debouncedUpdate = useDebounce((delta: number) => {
    updateItem.mutate({ cartId, productId: product.id, quantity: delta, isUpdate: true })
  }, 727)
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, localQuantity + delta)
    setLocalQuantity(Math.max(1, localQuantity + delta))
    debouncedUpdate(newQuantity)
  }

  return (
    <tr>
      <td className="min-w-[50px] py-4">
        <Image src={product.image} alt={product.name} width={50} height={50} />
      </td>

      <td className="min-w-md p-4 text-start break-words">{product.name}</td>
      <td className="p-4 text-center">${product.price}</td>
      <td className="py-4 text-center">
        <div className="border-primary/20 flex w-full items-center rounded-md border">
          <Button
            variant="outline"
            size="icon"
            className="bg-secondary hover:bg-background/20 border-none"
            onClick={() => {
              handleQuantityChange(-1)
            }}
            disabled={updateItem.isPending || deleteItem.isPending}
          >
            -
          </Button>
          <span className="border-primary/20 flex h-9 min-w-10 grow items-center justify-center border-x">
            {localQuantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="bg-secondary hover:bg-background/20 border-none"
            onClick={() => {
              handleQuantityChange(1)
            }}
            disabled={updateItem.isPending || deleteItem.isPending}
          >
            +
          </Button>
        </div>
      </td>
      <td className="min-w-24 p-4 text-center">${localQuantity * product.price}</td>
      <td className="min-w-20 py-4">
        <Button
          className="w-full"
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteItem.mutate({ cartId, productId: product.id })
          }}
          disabled={updateItem.isPending || deleteItem.isPending}
        >
          {deleteItem.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </td>
    </tr>
  )
}
