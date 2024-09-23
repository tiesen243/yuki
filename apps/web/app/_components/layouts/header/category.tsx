import Link from 'next/link'

import { cn } from '@yuki/ui'

import { api } from '@/lib/trpc/server'
import { slugify } from '@/lib/utils'

export const Category: React.FC<Props> = async ({ className, itemClassName }) => {
  const { categories } = await api.category.getAll({ limit: 3 })

  return (
    <ul className={cn('flex gap-2', className)}>
      {categories.slice(0, 3).map((category) => (
        <li key={category.id} className={itemClassName}>
          <Link href={`/search?category=${slugify(category.name, category.id)}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

interface Props {
  className?: string
  itemClassName?: string
}
