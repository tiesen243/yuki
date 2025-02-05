import { Suspense } from 'react'

import { CategoryCardSkeleton } from '@/app/_components/category-card'
import { ProductCardSkeleton } from '@/app/_components/product-card'
import { Slider } from '@/app/(main)/(home)/_components/slider'
import { api, HydrateClient } from '@/lib/trpc/server'
import { CategoryList, ProductList } from './page.client'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await Promise.all([api.product.getAll.prefetch({}), api.category.getAll.prefetch({})])

  return (
    <HydrateClient>
      <main className="flex grow flex-col gap-4 pb-4">
        <Slider />

        <Suspense
          fallback={
            <section className="container grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
            <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
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
