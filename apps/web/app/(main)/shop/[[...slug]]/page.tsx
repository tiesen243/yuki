import { createMetadata } from '@/lib/metadata'
import { getIdFromSlug } from '@/lib/utils'

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ page: number }>
}) {
  const { slug } = await params
  const { page = 1 } = await searchParams

  const id = getIdFromSlug(slug)

  return (
    <main className="container grow py-4">
      <p>Shop {id}</p>
      <p>Page {page}</p>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Shop',
  description: 'A collection of all products for sale.',
  openGraph: {
    images: `/api/og?title=Shop&description=${encodeURIComponent('A collection of all products for sale.')}`,
    url: '/shop',
  },
})
