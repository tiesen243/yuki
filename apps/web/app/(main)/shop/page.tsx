import type { Query } from '@yuki/api/validators/product'

import { createMetadata } from '@/lib/metadata'

interface Props {
  searchParams: Promise<Query>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q, category, sortBy, orderBy, page, limit } = await searchParams

  return (
    <main className="container flex grow flex-col gap-8 py-4 md:flex-row">
      <h1 className="sr-only">All Product of Shop</h1>
      <pre>
        {JSON.stringify({
          q,
          category,
          sortBy,
          orderBy,
          page,
          limit,
        })}
      </pre>
    </main>
  )
}

export const generateMetadata = (_: Props) => {
  return createMetadata({
    title: 'Shop',
    description: 'A collection of all products for sale.',
    openGraph: {
      images: `/api/og?title=Shop&description=${encodeURIComponent('A collection of all products for sale.')}`,
      url: '/shop',
    },
  })
}
