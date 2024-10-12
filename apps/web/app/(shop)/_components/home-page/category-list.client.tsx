'use client'

import { CategoryCard } from '@/app/(shop)/_components/category-card'
import { api } from '@/lib/trpc/react'

export const CategoryListClient: React.FC = () => {
  const [{ categories }] = api.category.getAll.useSuspenseQuery({ limit: 12 })

  return categories.map((category) => <CategoryCard key={category.id} category={category} />)
}
