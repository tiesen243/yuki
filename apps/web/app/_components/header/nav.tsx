'use client'

import Link from 'next/link'

import { api } from '@/lib/trpc/react'
import { slugify } from '@/lib/utils'

export const Nav: React.FC<{ limit?: number; isSidebar?: boolean }> = ({
  limit = 3,
  isSidebar = false,
}) => {
  const { data = [], isLoading } = api.category.getAll.useQuery({ limit })

  if (isLoading)
    return Array.from({ length: limit }).map((_, i) => (
      <div
        key={i}
        className={
          isSidebar
            ? 'w-full animate-pulse rounded-lg bg-current'
            : 'w-20 animate-pulse rounded bg-current/20'
        }
      >
        &nbsp;
      </div>
    ))

  return data.map((category) => (
    <Link
      key={category.id}
      href={`/shop/${slugify(category.name)}-${category.id}`}
      className={
        isSidebar
          ? 'text-foreground hover:bg-background/40 rounded-lg px-2 py-1 transition-colors'
          : 'text-muted-foreground hover:text-foreground'
      }
    >
      {category.name}
    </Link>
  ))
}
