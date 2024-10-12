'use client'

import type { Query } from '@yuki/api'

import { Pagination } from '@/app/(shop)/_components/pagination'
import { ProductCard } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'
import { getIdFromSlug } from '@/lib/utils'

export const PageClient: React.FC<{ searchParams: Query }> = ({ searchParams }) => {
  const [{ products, totalPage }] = api.product.getAll.useSuspenseQuery({
    q: searchParams.q,
    category: getIdFromSlug(searchParams.category ?? ''),
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 12,
  })

  return (
    <>
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <Pagination searchParams={searchParams} totalPage={totalPage} />
    </>
  )
}
