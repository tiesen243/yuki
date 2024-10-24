'use client'

import { ProductCard, ProductCardSkeleton } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductMarquee: React.FC = () => {
  const { data, isLoading } = api.product.getAll.useQuery({ limit: 10 })

  if (isLoading || !data)
    return Array.from({ length: 10 }).map((_, idx) => (
      <ProductCardSkeleton key={idx} className="w-80" />
    ))

  return data.products
    .slice(3, 11)
    .map((product) => <ProductCard key={product.id} product={product} className="w-80" />)
}
