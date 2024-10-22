'use client'

import { ProductCard, ProductCardSkeleton } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ThreeGridProducts: React.FC = () => {
  const { data, isLoading } = api.product.getAll.useQuery({ limit: 3 })

  if (isLoading)
    return Array.from({ length: 3 }).map((_, idx) => (
      <ProductCardSkeleton
        key={idx}
        className={idx === 0 ? 'md:col-span-5 md:row-span-2' : 'col-span-2'}
      />
    ))

  if (!data?.products || data.products.length < 1) return <div>No products found</div>

  return data.products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      className={idx === 0 ? 'md:col-span-5 md:row-span-2' : 'col-span-2'}
    />
  ))
}
