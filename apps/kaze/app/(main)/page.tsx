import { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/rsc'
import { ProductCardSkeleton } from '../_components/product-card'
import { ProductList, Slider } from './page.client'

export default function HomePage() {
  void getQueryClient().prefetchQuery(
    trpc.product.all.queryOptions({ limit: 12 }),
  )

  return (
    <main className="grow space-y-4 pb-4">
      <section>
        <h2 className="sr-only">Featured Products</h2>
        <Slider />
      </section>

      <section className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <h2 className="sr-only">Products</h2>
        <Suspense
          fallback={Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        >
          <ProductList />
        </Suspense>
      </section>
    </main>
  )
}
