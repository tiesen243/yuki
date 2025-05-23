'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { CartItem as ICartItem } from '@yuki/redis/schema'
import { Button } from '@yuki/ui/button'
import { MinusIcon, PlusIcon, Trash2Icon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

import { useDebounce } from '@/hooks/use-debounce'
import { useTRPC } from '@/lib/trpc/react'

export const CardList: React.FC = () => {
  const { trpc } = useTRPC()
  const { data: cart } = useSuspenseQuery(trpc.cart.getCart.queryOptions())

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        {cart?.items.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>

      {cart?.items.length === 0 ? (
        <div className="text-muted-foreground text-center">
          Your cart is empty
        </div>
      ) : (
        <div className="grid gap-1 border-t pt-4">
          <p className="font-semibold">Total: {cart?.total.toFixed(2)}</p>
          <p className="text-muted-foreground text-sm">
            Items: {cart?.items.length}
          </p>
        </div>
      )}
    </div>
  )
}

const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity)

  const { trpc, queryClient } = useTRPC()
  const { mutate: update, isPending: isUpdating } = useMutation({
    ...trpc.cart.updateItem.mutationOptions(),
    onSuccess: () =>
      queryClient.invalidateQueries(trpc.cart.getCart.queryFilter()),
    onError: () => {
      setLocalQuantity(item.quantity)
    },
  })

  const { mutate: remove, isPending: isRemoving } = useMutation({
    ...trpc.cart.removeItem.mutationOptions(),
    onSuccess: () =>
      queryClient.invalidateQueries(trpc.cart.getCart.queryFilter()),
  })

  const debouncedUpdate = useDebounce((quantity: number) => {
    if (quantity !== item.quantity && quantity > 0) {
      update({
        productId: item.productId,
        quantity,
        action: 'replace',
      })
    }
  }, 500)

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (newQuantity > 0) {
        setLocalQuantity(newQuantity)
        debouncedUpdate(newQuantity)
      }
    },
    [debouncedUpdate],
  )

  return (
    <div className="bg-card hover:bg-card/80 grid grid-cols-7 gap-4 rounded-xl border p-4 shadow-md transition-colors">
      <Image
        src={item.productImage}
        alt={item.productName}
        className="aspect-square object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={80}
        height={80}
      />

      <div className="col-span-5 grid gap-2">
        <h3 className="text-lg font-semibold">{item.productName}</h3>

        <div className="flex">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              if (localQuantity > 1) handleQuantityChange(localQuantity - 1)
            }}
            disabled={isUpdating}
          >
            <MinusIcon />
          </Button>

          <Input
            type="number"
            className="mx-2 h-8 w-16 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={localQuantity}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10)
              if (value > 0) handleQuantityChange(value)
            }}
            disabled={isUpdating}
          />
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              handleQuantityChange(localQuantity + 1)
            }}
            disabled={isUpdating}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <p className="pl-6 font-semibold">
          ${(item.productPrice * localQuantity).toFixed(2)}
        </p>

        <Button
          variant="ghost"
          className="text-destructive"
          disabled={isRemoving}
          onClick={() => {
            remove({ productId: item.productId })
          }}
        >
          <Trash2Icon /> Remove
        </Button>
      </div>
    </div>
  )
}
