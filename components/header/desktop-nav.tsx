import Link from 'next/link'

import { api } from '@/lib/trpc/server'
import { createSlug } from '@/lib/utils'

export const DesktopNav: React.FC = async () => {
  const categories = await api.category.getCategories({}).then((res) => res.slice(0, 2))

  return (
    <nav className="hidden gap-2 md:flex">
      <Link href="/shop" className="hover:text-muted-foreground">
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop/category/${createSlug({ str: category.name, suffix: category.id })}`}
          className="hover:text-muted-foreground"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}