'use client'

import Link from 'next/link'

import type { Query } from '@yuki/api/validators/product'
import { Button } from '@yuki/ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from '@yuki/ui/icons'

import { ProductCard, ProductCardSkeleton } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductList: React.FC<Query> = (query) => {
  const [{ products }] = api.product.getAll.useSuspenseQuery(query)
  return (
    <div className="container grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export const ProductListSkeleton: React.FC<{ limit: number }> = ({ limit }) => (
  <div className="container grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
    {Array.from({ length: limit }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

export const ProductPagination: React.FC<Query> = (query) => {
  const [{ totalPage }] = api.product.getAll.useSuspenseQuery(query)

  const nextPage = Math.min(totalPage, query.page + 1)
  const prevPage = Math.max(1, query.page - 1)

  const renderPageButton = (p: number) => (
    <Button
      key={p}
      variant="outline"
      size="icon"
      className={p === query.page ? 'bg-accent text-accent-foreground' : ''}
      asChild
    >
      <Link href={{ query: { page: p } }}>{p}</Link>
    </Button>
  )

  const renderPageNumbers = () => {
    if (query.page <= 5) {
      // First 4 pages: show 1,2,3,...,totalPage-1,totalPage
      return (
        <>
          {[1, 2, 3, 4, 5].map((p) => renderPageButton(p))}
          <span className="px-2">...</span>
        </>
      )
    }

    if (query.page >= totalPage - 3)
      return (
        <>
          {[1, 2].map((p) => renderPageButton(p))}
          <span className="px-2">...</span>
          {[totalPage - 3, totalPage - 2, totalPage - 1, totalPage].map((p) =>
            renderPageButton(p),
          )}
        </>
      )

    return (
      <>
        {[1, 2].map((p) => renderPageButton(p))}
        <span className="px-2">...</span>
        {[query.page - 1, query.page, query.page + 1, query.page + 2].map((p) =>
          renderPageButton(p),
        )}
        <span className="px-2">...</span>
        {[totalPage - 1, totalPage].map((p) => renderPageButton(p))}
      </>
    )
  }

  if (totalPage <= 1) return

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      {query.page > 1 && (
        <>
          <Button variant="outline" size="icon" asChild>
            <Link href={{ query: { page: 1 } }}>
              <ChevronsLeftIcon />
            </Link>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <Link href={{ query: { page: prevPage } }} aria-disabled>
              <ChevronLeftIcon />
            </Link>
          </Button>
        </>
      )}

      {renderPageNumbers()}

      {query.page < totalPage && (
        <>
          <Button variant="outline" size="icon" asChild>
            <Link href={{ query: { page: nextPage } }}>
              <ChevronRightIcon />
            </Link>
          </Button>

          <Button variant="outline" size="icon" asChild>
            <Link href={{ query: { page: totalPage } }}>
              <ChevronsRightIcon />
            </Link>
          </Button>
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
