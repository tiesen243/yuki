'use client'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'
import { CategoryCard } from '../_components/category-card'

export const ProductList = () => {
  const [products] = api.product.getAll.useSuspenseQuery({})
  return (
    <section className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export const CategoryList = () => {
  const [categories] = api.category.getAll.useSuspenseQuery({})
  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  )
}
