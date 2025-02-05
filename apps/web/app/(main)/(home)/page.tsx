import { Suspense } from 'react'

import { CategoryCardSkeleton } from '@/app/_components/category-card'
import { ProductCardSkeleton } from '@/app/_components/product-card'
import { Slider } from '@/app/(main)/(home)/_components/slider'
import { api, HydrateClient } from '@/lib/trpc/server'
import { CategoryList } from './_components/category-list'
import { ProductList } from './_components/product-list'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  await Promise.all([api.product.getAll.prefetch({}), api.category.getAll.prefetch({})])

  return (
    <HydrateClient>
      <main className="flex grow flex-col gap-4 pb-4">
        <Slider />

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
