import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { createMetadata } from '@/lib/metadata'
import { getQueryClient, HydrateClient, trpc } from '@/trpc/rsc'
import { ProductDetail } from './page.client'

export default async function ProductDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params
  const id = slug.split('-').pop() ?? ''
  const { product, reviews } = await getQueryClient().ensureQueryData(
    trpc.product.byId.queryOptions({ id }),
  )
  if (!product) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.id,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: `https://yourstore.com/products/${product.id}`,
      priceCurrency: 'USD',
      price: (product.price * (1 - product.discount / 100)).toFixed(2),
      priceValidUntil: Date.now() + 30 * 24 * 60 * 60 * 1000,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Yukinu',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.reduce((acc, review) => acc + review.rating, 0),
      reviewCount: reviews.length,
    },
  }

  return (
    <HydrateClient>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container py-4">
        <h1 className="sr-only">{product.name}</h1>
        <Suspense
          fallback={
            <div className="flex h-[calc(100dvh-6rem)] w-full flex-col items-center justify-center gap-4">
              <div className="border-primary size-9 animate-spin rounded-full border-4 border-t-transparent" />
              <p className="text-muted-foreground text-lg">
                Loading product...
              </p>
            </div>
          }
        >
          <ProductDetail id={id} />
        </Suspense>
      </main>
    </HydrateClient>
  )
}

export const generateMetadata = async ({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) => {
  const { slug } = await params
  const id = slug.split('-').pop() ?? ''
  const { product } = await getQueryClient().ensureQueryData(
    trpc.product.byId.queryOptions({ id }),
  )
  if (!product) notFound()

  return createMetadata({
    title: product.name,
    description: product.description,
    openGraph: {
      images: [
        product.image,
        `/api/og?title=${product.name}&description=${product.description}&image=${product.image}`,
      ],
    },
  })
}
