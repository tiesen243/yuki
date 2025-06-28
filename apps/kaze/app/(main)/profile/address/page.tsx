import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@yukinu/ui/button'
import { Typography } from '@yukinu/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/trpc/rsc'
import { AddressCardSkeleton, AddressList } from './page.client'

export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  void getQueryClient().prefetchQuery(trpc.address.all.queryOptions())

  return (
    <HydrateClient>
      <section className="w-full space-y-4">
        <div className="flex items-start justify-between gap-4">
          <Typography variant="h4" component="h2">
            My Addresses
          </Typography>
          <Button asChild>
            <Link href="/profile/address/new">Add New Address</Link>
          </Button>
        </div>

        <Suspense
          fallback={Array(3).map((_, i) => (
            <AddressCardSkeleton key={i} />
          ))}
        >
          <AddressList />
        </Suspense>
      </section>
    </HydrateClient>
  )
}
