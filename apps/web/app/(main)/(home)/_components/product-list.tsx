'use client'

import React from 'react'

import { Typography } from '@yuki/ui/typography'

import { ProductCard, ProductCardSkeleton } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductList: React.FC = () => {
  const [products] = api.product.getAll.useSuspenseQuery({})
  return (
    <section className="container grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Typography level="h3" className="col-span-3 md:col-span-4 lg:col-span-6">
        New Arrivals
      </Typography>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export const ProductListSkeleton: React.FC = () => (
  <section className="container grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <Typography level="h3" className="col-span-3 md:col-span-4 lg:col-span-6">
      New Arrivals
    </Typography>

    {Array.from({ length: 12 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </section>
)
