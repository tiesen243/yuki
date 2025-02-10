'use client'

import Link from 'next/link'
import { useFormStatus } from 'react-dom'

import type { Query } from '@yuki/api/validators/product'
import { Button } from '@yuki/ui/button'

import { ProductCard, ProductCardSkeleton } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductList: React.FC<Query> = (query) => {
  const [{ products }] = api.product.getAll.useSuspenseQuery(query)
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export const ProductListSkeleton: React.FC<{ limit: number }> = ({ limit }) => (
  <div className="grid grid-cols-3 gap-4 md:grid-cols-4 xl:grid-cols-6">
    {Array.from({ length: limit }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export const ProductPagination: React.FC<Query> = (query) => {
  const [{ totalPage }] = api.product.getAll.useSuspenseQuery(query)

  if (totalPage <= 1) return

  const PageButton = ({ p }: { p: number }) => (
    <Button
      variant="outline"
      size="icon"
      className={p === query.page ? 'bg-accent text-accent-foreground' : ''}
      asChild
    >
      <Link href={{ query: { ...query, page: p } }}>{p}</Link>
    </Button>
  )

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {query.page < 4 ? (
        <>
          {Array.from({ length: 5 }).map((_, p) => (
            <PageButton key={p + 1} p={p + 1} />
          ))}
          <span>...</span>
          <PageButton p={totalPage} />
        </>
      ) : query.page >= totalPage - 2 ? (
        <>
          {Array.from({ length: 5 }).map((_, p) => (
            <PageButton key={p + 1} p={p + 1} />
          ))}
          <span>...</span>
          <PageButton p={totalPage} />
        </>
      ) : (
        <>
          <PageButton p={1} />
          <span>...</span>
          {[
            query.page - 2,
            query.page - 1,
            query.page,
            query.page + 1,
            query.page + 2,
          ].map((p) => (
            <PageButton key={p} p={p} />
          ))}
          <span>...</span>
          <PageButton p={totalPage} />
        </>
      )}
    </div>
  )
}

export const ProductPaginationSkeleton: React.FC = () => (
  <div className="mt-4 flex items-center justify-center gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <Button key={i} variant="outline" size="icon" className="bg-accent animate-pulse" />
    ))}
  </div>
)

export const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()

  return <Button disabled={pending}>Apply</Button>
}
