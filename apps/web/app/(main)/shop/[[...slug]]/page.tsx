import { Suspense } from 'react'

import type { Query } from '@yuki/api/validators/product'

import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import {
  ProductList,
  ProductListSkeleton,
  ProductPagination,
  ProductPaginationSkeleton,
} from './page.client'

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Query>
}) {
  const { slug } = await params
  const {
    page = 1,
    limit = 6 * 4,
    orderBy = 'createdAt',
    sortBy = 'desc',
    query,
  } = await searchParams

  const categoryId = getIdFromSlug(slug?.at(0))

  void api.product.getAll.prefetch({
    page: +page,
    limit,
    query,
    orderBy,
    sortBy,
    category: categoryId,
  })

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <Suspense fallback={<ProductListSkeleton limit={+limit} />}>
          <ProductList
            page={+page}
            limit={+limit}
            query={query}
            orderBy={orderBy}
            sortBy={sortBy}
            category={categoryId}
          />
        </Suspense>

        <Suspense fallback={<ProductPaginationSkeleton />}>
          <ProductPagination
            page={+page}
            limit={+limit}
            query={query}
            orderBy={orderBy}
            sortBy={sortBy}
            category={categoryId}
          />
        </Suspense>
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
