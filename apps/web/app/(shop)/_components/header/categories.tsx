'use client'

import Link from 'next/link'

import { api } from '@/lib/trpc/react'

export const Categories: React.FC = () => {
  const { data, isLoading } = api.category.getAll.useQuery({ limit: 10 })

  if (isLoading || !data) return <p className="text-sm text-muted-foreground">Loading...</p>

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      {data.categories.map((category) => (
        <Link key={category.id} href={`/p?category=${category.id}`} className="hover:underline">
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
