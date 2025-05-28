'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import type { addresses } from '@yuki/db/schema'
import type { CartItem as ICartItem } from '@yuki/redis/schema'
import { Button } from '@yuki/ui/button'
import { MinusIcon, PlusIcon, Trash2Icon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'

import { useDebounce } from '@/hooks/use-debounce'
import { useTRPC } from '@/lib/trpc/react'

export const CardList: React.FC = () => {
  const { trpc } = useTRPC()
  const { data: cart } = useSuspenseQuery(trpc.cart.get.queryOptions())

  const mockAddress: (typeof addresses.$inferSelect)[] = [
    {
      id: 'address1',
      name: 'Home Address',
      city: 'Los Angeles',
      country: 'USA',
      address: '123 Main St, Los Angeles, CA 90001',
      isDefault: true,
      phone: '1234567890',
      state: 'California',
      zipCode: '90001',
      userId: 'userId',
      createdAt: new Date(),
    },
    {
      id: 'address2',
      name: 'Work Office',
      city: 'New York',
      country: 'USA',
      address: '456 Broadway Ave, New York, NY 10001',
      isDefault: false,
      phone: '0987654321',
      state: 'New York',
      zipCode: '10001',
      userId: 'userId',
      createdAt: new Date(),
    },
    {
      id: 'address3',
      name: 'Parents House',
      city: 'Chicago',
      country: 'USA',
      address: '789 Oak Street, Chicago, IL 60601',
      isDefault: false,
      phone: '5551234567',
      state: 'Illinois',
      zipCode: '60601',
      userId: 'userId',
      createdAt: new Date(),
    },
  ]

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

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Select
              defaultValue={
                mockAddress.find((address) => address.isDefault)?.id
              }
            >
              <SelectTrigger className="line-clamp-1 w-full">
                <SelectValue placeholder="Select a address" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {mockAddress.map((address) => (
                    <SelectItem key={address.id} value={address.id}>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                              Default
                            </span>
                          )}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {address.address}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {address.city}, {address.state} {address.zipCode}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="w-full">Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  const [localQuantity, setLocalQuantity] = useState(item.quantity)

  const { trpc, queryClient } = useTRPC()
  const { mutate: update, isPending: isUpdating } = useMutation({
    ...trpc.cart.update.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.cart.get.queryFilter()),
    onError: () => {
      setLocalQuantity(item.quantity)
    },
  })

  const { mutate: remove, isPending: isRemoving } = useMutation({
    ...trpc.cart.remove.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.cart.get.queryFilter()),
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
