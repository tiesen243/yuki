'use client'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ThreeGridProductsClient: React.FC = () => {
  const [{ products }] = api.product.getAll.useSuspenseQuery({ limit: 3 })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          className={idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}
        />
      ))}
    </div>
  )
}
