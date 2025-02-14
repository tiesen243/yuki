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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'
import { toast } from '@yuki/ui/toast'

import { useDebounce } from '@/hooks/use-debounce'
import { api } from '@/lib/trpc/react'

export const CartDetails: React.FC = () => {
  const router = useRouter()
  const utils = api.useUtils()

  const [cart] = api.cart.getCart.useSuspenseQuery()

  const { data } = api.user.getAddresses.useQuery()
  const [address, setAddress] = useState<string>('')

  const confirmOrder = api.order.updateOrder.useMutation({
    onError: (e) => toast.error(e.message),
    onSuccess: async (d) => {
      await utils.cart.getCart.invalidate()
      await utils.order.getDetails.invalidate({ id: cart.id })
      await utils.order.getHistories.invalidate()
      router.push(`/account/orders/${cart.id}`)
      toast.success(d.message)
    },
  })

  return (
    <div className="space-y-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2}>Product Information</TableHead>
            {['Price', 'Quantity', 'Total', 'Action'].map((h, i) => (
              <TableHead key={i} className="text-center">
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart.items.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-muted-foreground text-center">
                No items
              </TableCell>
            </TableRow>
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
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell align="center">${cart.total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex items-center justify-between">
        <Select value={address} onValueChange={setAddress}>
          <SelectTrigger className="basis-1/3 text-start focus:ring-0">
            <SelectValue placeholder="Address" />
          </SelectTrigger>

          <SelectContent>
            {data?.map((a) => (
              <SelectItem key={a.id} value={a.id}>
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
          {confirmOrder.isPending ? 'Confirming...' : 'Confirm'}
        </Button>
      </div>
    </div>
  )
}

const CartItem: React.FC<{
  cartId: number
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
    <TableRow>
      <TableCell className="min-w-[50px]">
        <Image src={product.image} alt={product.name} width={50} height={50} />
      </TableCell>

      <TableCell className="min-w-xs">{product.name}</TableCell>
      <TableCell align="center">${product.price}</TableCell>
      <TableCell align="center">
        <div className="flex items-center rounded-md border">
          <Button
            variant="outline"
            size="icon"
            className="border-none"
            onClick={() => {
              handleQuantityChange(-1)
            }}
            disabled={updateItem.isPending || deleteItem.isPending}
          >
            -
          </Button>
          <span className="flex h-9 min-w-14 grow items-center justify-center border-x">
            {localQuantity}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="border-none"
            onClick={() => {
              handleQuantityChange(1)
            }}
            disabled={updateItem.isPending || deleteItem.isPending}
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell align="center">${localQuantity * product.price}</TableCell>
      <TableCell align="center">
        <Button
          className="w-20"
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteItem.mutate({ cartId, productId: product.id })
          }}
          disabled={updateItem.isPending || deleteItem.isPending}
        >
          {deleteItem.isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </TableCell>
    </TableRow>
  )
}
