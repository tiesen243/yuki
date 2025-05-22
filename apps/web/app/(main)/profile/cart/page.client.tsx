'use client'

import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'

import type { CartItem } from '@yuki/validators/cart'
import { Button } from '@yuki/ui/button'
import { MinusIcon, PlusIcon, TrashIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

import { useTRPC } from '@/lib/trpc/react'

export const CardList: React.FC = () => {
  const { trpc } = useTRPC()
  const { data: cart } = useSuspenseQuery(trpc.cart.get.queryOptions())

  return cart.map((cartItem) => (
    <CartItemCard key={cartItem.productId} cartItem={cartItem} />
  ))
}

export const CartItemCard: React.FC<{
  cartItem: CartItem
}> = ({ cartItem }) => {
  return (
    <div className="flex items-center gap-4 border-b pt-2 pb-4">
      <Image
        src={cartItem.productImage ?? ''}
        alt={cartItem.productName ?? ''}
        className="aspect-square size-20 rounded-lg object-cover"
        width={80}
        height={80}
      />

      <div className="flex grow flex-col gap-2">
        <p className="text-lg font-bold">{cartItem.productName}</p>

        <div className="flex">
          <Button variant="outline" size="icon" className="rounded-r-none">
            <MinusIcon />
          </Button>
          <Input
            defaultValue={cartItem.quantity}
            className="w-20 rounded-none text-center"
          />
          <Button variant="outline" size="icon" className="rounded-l-none">
            <PlusIcon />
          </Button>

          <Button variant="ghost" size="icon" className="ml-2">
            <TrashIcon className="stroke-destructive" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="mb-2 text-sm font-medium">{cartItem.productPrice}</p>
        <span className="text-muted-foreground text-xs">Subtotal</span>
        <p className="text-sm font-medium">
          {cartItem.productPrice ?? 0 * cartItem.quantity}
        </p>
      </div>
    </div>
  )
}
