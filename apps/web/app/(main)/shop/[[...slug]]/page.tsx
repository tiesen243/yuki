import { createMetadata } from '@/lib/metadata'

export default function ShopPage() {
  return (
    <main className="container py-4">
      <p>Shop</p>
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
