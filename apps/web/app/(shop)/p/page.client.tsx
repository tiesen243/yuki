'use client'

import type { Query } from '@yuki/api'

import { Pagination } from '@/app/(shop)/_components/pagination'
import { ProductCard, ProductCardSkeleton } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'
import { getIdFromSlug } from '@/lib/utils'

export const PageClient: React.FC<{ searchParams: Query }> = ({ searchParams }) => {
  const { data, isLoading } = api.product.getAll.useQuery({
    q: searchParams.q,
    category: getIdFromSlug(searchParams.category ?? ''),
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 12,
  })

  if (isLoading)
    return (
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </section>
    )

  if (!data?.products || data.products.length < 1)
    return <p className="text-center text-muted-foreground">No products found</p>

  return (
    <>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <Pagination searchParams={searchParams} totalPage={data.totalPage} />
    </>
  )
}
