'use client'

import { CategoryCard, CategoryCardSkeleton } from '@/app/(shop)/_components/category-card'
import { api } from '@/lib/trpc/react'

export const CategoryList: React.FC = () => {
  const { data, isLoading } = api.category.getAll.useQuery({ limit: 12 })

  if (isLoading)
    return Array.from({ length: 12 }).map((_, idx) => <CategoryCardSkeleton key={idx} />)

  if (!data?.categories || data.categories.length < 1) return <p>No categories found</p>

  return data.categories.map((category) => <CategoryCard key={category.id} category={category} />)
}
