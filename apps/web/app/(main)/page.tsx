import { Suspense } from 'react'

import { Typography } from '@yuki/ui/typography'

import { getQueryClient, trpc } from '@/lib/trpc/server'
import { ProductCardSkeleton } from './_components/product-card'
import { ProductList, Slider } from './page.client'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  void getQueryClient().prefetchQuery(
    trpc.product.getAll.queryOptions({ limit: 12 }),
  )

  return (
    <main className="flex grow flex-col gap-4">
      <Slider
        slides={[
          {
            id: 0,
            title: 'Summer Sale Collections',
            description: 'Sale! Up to 50% off!',
            img: '/assets/hero-1.webp',
            bg: 'bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-yellow-900 dark:to-pink-900',
          },
          {
            id: 1,
            title: 'Winter Sale Collections',
            description: 'Sale! Up to 50% off!',
            img: '/assets/hero-2.webp',
            bg: 'bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900',
          },
          {
            id: 2,
            title: 'Spring Sale Collections',
            description: 'Sale! Up to 50% off!',
            img: '/assets/hero-3.webp',
            bg: 'bg-gradient-to-r from-blue-100 to-yellow-100 dark:from-blue-900 dark:to-yellow-900',
          },
        ]}
      />

      <section className="container">
        <Typography variant="h2">New Arrivals</Typography>

        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </section>
    </main>
  )
}
