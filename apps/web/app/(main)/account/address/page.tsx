import { Suspense } from 'react'
import Link from 'next/link'

import { buttonVariants } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { AddressCardSkeleton, AddressList } from './page.client'

export default function AddressPage() {
  void getQueryClient().prefetchQuery(trpc.user.getAddresses.queryOptions())

  return (
    <HydrateClient>
      <main className="flex-1 rounded-md border py-4 shadow-md">
        <div className="container mb-4 flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <Typography variant="h2">Your Address</Typography>
            <Typography color="muted">
              Manage your address information to receive your orders.
            </Typography>
          </div>

          <Link
            href="/account/address/new"
            className={buttonVariants({ size: 'sm', className: 'mt-4' })}
          >
            + Add new address
          </Link>
        </div>

        <hr />

        <section className="container py-4">
          <Suspense
            fallback={
              <>
                <AddressCardSkeleton />
                <AddressCardSkeleton />
                <AddressCardSkeleton isLatest />
              </>
            }
          >
            <AddressList />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
