'use client'

import { ProductCard, ProductCardSkeleton } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductMarqueeClient: React.FC = () => {
  const { data, isLoading } = api.product.getAll.useQuery({ limit: 10 })

  if (isLoading)
    return Array.from({ length: 10 }).map((_, idx) => (
      <ProductCardSkeleton key={idx} className="w-80" />
    ))

  if (!data?.products || data.products.length < 1) return <div>No products found</div>

  return data.products
    .slice(3, 11)
    .map((product) => <ProductCard key={product.id} product={product} className="w-80" />)
}
