import { Suspense } from 'react'

import { api, HydrateClient } from '@/lib/trpc/server'
import {
  CategoryList,
  CategoryListSkeleton,
  ProductList,
  ProductListSkeleton,
  Slider,
} from './page.client'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await Promise.all([api.product.getAll.prefetch({}), api.category.getAll.prefetch({})])

  return (
    <HydrateClient>
      <main className="flex grow flex-col gap-4 pb-4">
        <Slider
          slides={[
            {
              id: 0,
              title: 'Summer Sale Collections',
              description: 'Sale! Up to 50% off!',
              img: '/assets/hero-1.webp',
              bg: 'bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900 dark:to-pink-900',
            },
            {
              id: 1,
              title: 'Winter Sale Collections',
              description: 'Sale! Up to 50% off!',
              img: '/assets/hero-2.webp',
              bg: 'bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900 dark:to-blue-900',
            },
            {
              id: 2,
              title: 'Spring Sale Collections',
              description: 'Sale! Up to 50% off!',
              img: '/assets/hero-3.webp',
              bg: 'bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900 dark:to-yellow-900',
            },
          ]}
        />

        <section className="space-y-6">
          <h1 className="sr-only">Featured Products and Categories</h1>

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
          </Suspense>

          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}
