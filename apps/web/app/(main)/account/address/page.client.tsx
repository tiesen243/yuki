'use client'

import Link from 'next/link'

import type { Address } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { cn } from '@yuki/ui/utils'

import { api } from '@/lib/trpc/react'

export const AddressList: React.FC = () => {
  const [addresses] = api.user.getAddresses.useSuspenseQuery()
  return addresses.map((address, i) => (
    <AddressCard
      key={address.id}
      address={address}
      isLatest={i === addresses.length - 1}
    />
  ))
}

export const AddressCard: React.FC<{ address: Address; isLatest?: boolean }> = ({
  address,
  isLatest = false,
}) => {
  const utils = api.useUtils()
  const { mutate, isPending } = api.user.deleteAddress.useMutation({
    onSuccess: () => utils.user.getAddresses.invalidate(),
  })

  return (
    <div
      className={cn(
        'border-primary/20 flex w-full flex-col justify-between gap-4 py-4 md:flex-row',
        !isLatest && 'border-b',
      )}
    >
      <div className="text-muted-foreground leading-7">
        <div className="flex items-center gap-2">
          <p className="text-foreground">{address.name}</p>
          <p className="border-primary/20 border-l px-2">{address.phone}</p>
        </div>
        <p>{address.state}</p>
        <p>{address.street}</p>
      </div>

      <div className="grid gap-2">
        <Button
          variant="outline"
          className="bg-secondary hover:bg-primary/20 border-primary/20"
          asChild
        >
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
      'border-primary/20 flex w-full flex-col justify-between gap-4 py-4 md:flex-row',
      !isLatest && 'border-b',
    )}
  >
    <div className="text-muted-foreground leading-7">
      <div className="flex items-center gap-2">
        <p className="w-16 animate-pulse rounded bg-current">&nbsp;</p>
        <p className="border-primary/20 border-l">&nbsp;</p>
        <span className="w-40 animate-pulse rounded bg-current">&nbsp;</span>
      </div>
      <p className="w-full animate-pulse rounded bg-current md:w-[200%]">&nbsp;</p>
      <p className="w-full animate-pulse rounded bg-current md:w-[200%]">&nbsp;</p>
    </div>
  </div>
)
