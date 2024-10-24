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
    limit: Number(searchParams.limit) || 6,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    sort: searchParams.sort || 'createdAt-desc',
  })

  if (isLoading)
    return (
      <section className="md:col-span-3">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {Array.from({ length: Number(searchParams.limit) || 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>

        <Pagination searchParams={searchParams} totalPage={999} />
      </section>
    )

  if (!data?.products || data.products.length < 1)
    return <p className="text-center text-muted-foreground md:col-span-3">No products found</p>

  return (
    <section className="md:col-span-3">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination searchParams={searchParams} totalPage={data.totalPage} />
    </section>
  )
}
