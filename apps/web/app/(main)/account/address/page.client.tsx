'use client'

import Link from 'next/link'

import type { Address } from '@yuki/db'
import { buttonVariants } from '@yuki/ui/button'

import { api } from '@/lib/trpc/react'

export const AddressList: React.FC = () => {
  const [addresses] = api.user.getAddress.useSuspenseQuery()
  return addresses.map((address) => <AddressCard key={address.id} address={address} />)
}

export const AddressCard: React.FC<{ address: Address }> = ({ address }) => (
  <div className="border-primary/20 flex w-full flex-col justify-between gap-4 border-b py-4 md:flex-row">
    <div className="text-muted-foreground leading-7">
      <div className="flex items-center gap-2">
        <p className="text-foreground">{address.name}</p>
        <p className="border-primary/20 border-l px-2">{address.phone}</p>
      </div>
      <p>{address.state}</p>
      <p>{address.street}</p>
    </div>

    <div className="grid gap-2">
      <Link
        href={`/account/address/${address.id}`}
        className={buttonVariants({
          variant: 'outline',
          className: 'bg-secondary hover:bg-primary/20 border-primary/20',
        })}
      >
        Edit
      </Link>
      <Link
        href={`/account/address/${address.id}`}
        className={buttonVariants({
          variant: 'destructive',
        })}
      >
        Delete
      </Link>
    </div>
  </div>
)

export const AddressCardSkeleton: React.FC = () => (
  <div className="border-primary/20 flex w-full flex-col justify-between gap-4 border-b py-4 md:flex-row">
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
