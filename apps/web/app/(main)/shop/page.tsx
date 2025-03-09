import type { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

import { Button } from '@yuki/ui/button'

import { createMetadata } from '@/lib/metadata'
import { shopSearchCache } from '@/lib/search'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { ProductCardSkeleton } from '../_components/product-card'
import { Pagination, ProductFilter, ProductList } from './page.client'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const query = await shopSearchCache.parse(searchParams)
  await getQueryClient().prefetchQuery(trpc.product.getAll.queryOptions(query))

  return (
    <HydrateClient>
      <main className="container grid grow gap-8 py-4 md:grid-cols-12">
        <h1 className="sr-only">All Product of Shop</h1>

        <section className="md:col-span-3">
          <h2 className="sr-only">Search Product Section</h2>

          <ProductFilter />
        </section>

        <section className="flex flex-col gap-4 md:col-span-9">
          <h2 className="sr-only">Product List Section</h2>

          <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            <Suspense
              fallback={Array.from({ length: query.limit }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              <ProductList />
            </Suspense>
          </div>

          <section>
            <h3 className="sr-only">Pagination Section</h3>

            <nav className="flex flex-wrap items-center justify-center gap-4">
              <Suspense
                fallback={Array.from({ length: 7 }).map((_, i) => (
                  <Button
                    key={i}
                    variant={i === 1 || i === 5 ? 'link' : 'outline'}
                    disabled
                  >
                    {i === 1 || i === 5 ? '...' : ''}
                  </Button>
                ))}
              >
                <Pagination />
              </Suspense>
            </nav>
          </section>
        </section>
      </main>
    </HydrateClient>
  )
}

export const metadata = createMetadata({
  title: 'Shop',
  description: 'A collection of all products for sale.',
  openGraph: {
    images: `/api/og?title=Shop&description=${encodeURIComponent('A collection of all products for sale.')}`,
    url: '/shop',
  },
})
