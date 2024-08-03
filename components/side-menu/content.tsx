import Link from 'next/link'

import { createSlug, getIdFromSlug } from '@/lib/utils'

interface Props {
  slug?: string
  query?: { sortBy: string; orderBy: 'asc' | 'desc' }
  categories: { id: string; name: string }[]
}

export const SideMenuContent: React.FC<Props> = ({ slug, query, categories }) => {
  const id = slug ? getIdFromSlug(slug) : null

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold">Sort by</h2>

        <nav className="mt-2 flex flex-col gap-2">
          {sort.map((s) => (
            <Link
              key={s.name}
              href={{ query: s.query }}
              className={`hover:underline ${JSON.stringify(s.query) === JSON.stringify(query) ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {s.name}
            </Link>
          ))}
        </nav>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Category</h2>

        <nav className="mt-2 flex flex-col gap-2">
          <Link
            href="/shop"
            className={`hover:underline ${id ? 'text-muted-foreground' : 'text-primary'}`}
          >
            All
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/category/${createSlug({ str: category.name, suffix: category.id })}`}
              className={`hover:underline ${id === category.id ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </section>
    </>
  )
}

export const sort = [
  { id: 'latest', name: 'Latest', query: { sortBy: 'createdAt', orderBy: 'desc' } },
  { id: 'name-asc', name: 'Name (A-Z)', query: { sortBy: 'name', orderBy: 'asc' } },
  { id: 'name-desc', name: 'Name (Z-A)', query: { sortBy: 'name', orderBy: 'desc' } },
  { id: 'price-asc', name: 'Price (Low to High)', query: { sortBy: 'price', orderBy: 'asc' } },
  { id: 'price-desc', name: 'Price (High to Low)', query: { sortBy: 'price', orderBy: 'desc' } },
]