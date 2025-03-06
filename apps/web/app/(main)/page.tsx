import { HydrateClient } from '@/lib/trpc/server'
import { Slider } from './page.client'

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="flex grow flex-col gap-4">
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
      </main>
    </HydrateClient>
  )
}

//<section className="space-y-6">
//  <h1 className="sr-only">Featured Products and Categories</h1>
//
//  <Suspense
//    fallback={
//      <section className="container grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//        <Typography variant="h2" className="col-span-full">
//          New Arrivals
//        </Typography>
//
//        {Array.from({ length: 12 }).map((_, i) => (
//          <ProductCardSkeleton key={i} />
//        ))}
//      </section>
//    }
//  >
//    <ProductList />
//  </Suspense>
//
//  <Suspense
//    fallback={
//      <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
//        <Typography variant="h2" className="col-span-2 md:col-span-4">
//          Categories
//        </Typography>
//
//        {Array.from({ length: 6 }).map((_, i) => (
//          <CategoryCardSkeleton key={i} />
//        ))}
//      </section>
//    }
//  >
//    <CategoryList />
//  </Suspense>
//</section>
