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

        <section className="container mt-4">
          <Suspense fallback="loading..">
            <CartDetails />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
