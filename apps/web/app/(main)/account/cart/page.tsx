import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { api, HydrateClient } from '@/lib/trpc/server'
import { CartDetails } from './page.client'

export default function CartPage() {
  void api.cart.getCart.prefetch()

  return (
    <HydrateClient>
      <main className="bg-secondary flex-1 rounded py-4 shadow-md">
        <div className="container mb-4">
          <Typography level="h2">Shopping cart</Typography>
          <Typography color="muted">
            Review and manage items you&apos;ve selected for purchase. We securely save
            your cart items so you can continue shopping later.
          </Typography>
        </div>

        <hr className="border-primary/20" />

        <section className="container h-full">
          <Suspense
            fallback={
              <div className="z-10 flex h-4/5 w-full items-center justify-center">
                <div className="border-primary size-12 animate-spin rounded-full border-t-2 border-b-2" />
              </div>
            }
          >
            <CartDetails />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
