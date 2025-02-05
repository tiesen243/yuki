'use client'

import React from 'react'

import { Typography } from '@yuki/ui/typography'

import { CategoryCard, CategoryCardSkeleton } from '@/app/_components/category-card'
import { api } from '@/lib/trpc/react'

export const CategoryList: React.FC = () => {
  const [categories] = api.category.getAll.useSuspenseQuery({})
  return (
    <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
      <Typography level="h3" className="col-span-2 md:col-span-4">
        Categories
      </Typography>

      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  )
}

export const CategoryListSkeleton: React.FC = () => (
  <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
    <Typography level="h3" className="col-span-2 md:col-span-4">
      Categories
    </Typography>

    {Array.from({ length: 6 }).map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))}
  </section>
)
