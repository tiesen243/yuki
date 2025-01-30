import { Suspense } from 'react'

import { api, HydrateClient } from '@/lib/trpc/server'
import { CategoryCardSkeleton } from '../_components/category-card'
import { ProductCardSkeleton } from '../_components/product-card'
import { CategoryList, ProductList } from './page.client'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await Promise.all([api.product.getAll.prefetch({}), api.category.getAll.prefetch({})])

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <Suspense
          fallback={
            <section className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </section>
          }
        >
          <ProductList />
        </Suspense>

        <Suspense
          fallback={
            <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </section>
          }
        >
          <CategoryList />
        </Suspense>
      </main>
    </HydrateClient>
  )
}
