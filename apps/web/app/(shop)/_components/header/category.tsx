import Link from 'next/link'

import { cn } from '@yuki/ui'

import { api } from '@/lib/trpc/server'
import { slugify } from '@/lib/utils'

export const Category: React.FC<Props> = async ({ limit = 10, className, itemClassName }) => {
  const { categories } = await api.category.getAll({ limit })

  return (
    <nav className={cn('flex gap-2', className)}>
      <Link className={itemClassName} href="/p">
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          className={itemClassName}
          href={`/p?category=${slugify(category.name, category.id)}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

interface Props {
  limit?: number
  className?: string
  itemClassName?: string
}
