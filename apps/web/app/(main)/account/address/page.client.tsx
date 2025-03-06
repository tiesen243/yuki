'use client'

import Link from 'next/link'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import type { Address } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { cn } from '@yuki/ui/utils'

import { useTRPC } from '@/lib/trpc/react'

export const AddressList: React.FC = () => {
  const trpc = useTRPC()
  const { data: addresses } = useSuspenseQuery(
    trpc.user.getAddresses.queryOptions(),
  )

  return addresses.map((address, i) => (
    <AddressCard
      key={address.id + `${Math.random()}`}
      address={address}
      isLatest={i === addresses.length - 1}
    />
  ))
}

export const AddressCard: React.FC<{
  address: Address
  isLatest?: boolean
}> = ({ address, isLatest = false }) => {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const { mutate, isPending } = useMutation(
    trpc.user.deleteAddress.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.user.getAddresses.queryKey(),
        })
      },
    }),
  )

  return (
    <div
      className={cn(
        'flex w-full flex-col justify-between gap-4 py-4 md:flex-row',
        !isLatest && 'border-b',
      )}
    >
      <div className="text-muted-foreground leading-7">
        <div className="flex items-center gap-3">
          <p className="text-foreground">{address.name}</p>
          <p className="border-l px-2">{address.phone}</p>
        </div>
        <p>{address.state}</p>
        <p>{address.street}</p>
      </div>

      <div className="grid gap-2">
        <Button variant="outline" asChild>
          <Link href={`/account/address/${address.id}`}>Edit</Link>
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            mutate({ id: address.id })
          }}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  )
}

export const AddressCardSkeleton: React.FC<{ isLatest?: boolean }> = ({
  isLatest = false,
}) => (
  <div
    className={cn(
      'flex w-full flex-col justify-between gap-4 py-4 md:flex-row',
      !isLatest && 'border-b',
    )}
  >
    <div className="text-muted-foreground leading-7">
      <div className="flex items-center gap-3">
        <p className="w-16 animate-pulse rounded bg-current">&nbsp;</p>
        <p className="border-l px-2">&nbsp;</p>
        <span className="w-40 animate-pulse rounded bg-current">&nbsp;</span>
      </div>
      <p className="w-full animate-pulse rounded bg-current md:w-[200%]">
        &nbsp;
      </p>
      <p className="w-full animate-pulse rounded bg-current md:w-[200%]">
        &nbsp;
      </p>
    </div>
  </div>
)
