import { Suspense } from 'react'

import { CategoryCardSkeleton } from '@/app/_components/category-card'
import { ProductCardSkeleton } from '@/app/_components/product-card'
import { api, HydrateClient } from '@/lib/trpc/server'
import Hero1 from '@/public/assets/imgs/hero-1.png'
import Hero2 from '@/public/assets/imgs/hero-2.png'
import Hero3 from '@/public/assets/imgs/hero-3.png'
import { CategoryList, ProductList, Slider } from './page.client'

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
              img: Hero1,
              bg: 'bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900 dark:to-pink-900',
            },
            {
              id: 1,
              title: 'Winter Sale Collections',
              description: 'Sale! Up to 50% off!',
              img: Hero2,
              bg: 'bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900 dark:to-blue-900',
            },
            {
              id: 2,
              title: 'Spring Sale Collections',
              description: 'Sale! Up to 50% off!',
              img: Hero3,
              bg: 'bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900 dark:to-yellow-900',
            },
          ]}
        />

        <Suspense fallback={<ProductCardSkeleton />}>
          <ProductList />
        </Suspense>

        <Suspense fallback={<CategoryCardSkeleton />}>
          <CategoryList />
        </Suspense>
      </main>
    </HydrateClient>
  )
}
