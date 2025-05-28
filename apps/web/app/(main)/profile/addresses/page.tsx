import { Suspense } from 'react'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { AddressCardSkeleton, AddressList } from './page.client'

export default function ProfilePage() {
  void getQueryClient().prefetchQuery(trpc.address.all.queryOptions())

  return (
    <HydrateClient>
      <section>
        <h1 className="sr-only">Addresses</h1>

        <section className="grid gap-4">
          <div className="mb-4 flex items-center justify-between">
            <Typography variant="h2">My Addresses</Typography>
            <Button asChild>
              <Link href="/profile/addresses/new">Add New Address</Link>
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
      </section>
    </HydrateClient>
  )
}
