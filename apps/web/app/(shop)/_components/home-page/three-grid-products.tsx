'use client'

import { ProductCard, ProductCardSkeleton } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ThreeGridProducts: React.FC = () => {
  const { data, isLoading } = api.product.getAll.useQuery({ limit: 3 })

  if (isLoading || !data)
    return Array.from({ length: 3 }).map((_, idx) => (
      <ProductCardSkeleton
        key={idx}
        className={idx === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-3'}
      />
    ))

  return data.products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      className={idx === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-3'}
    />
  ))
}
