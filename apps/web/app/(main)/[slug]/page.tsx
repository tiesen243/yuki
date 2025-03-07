import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { createMetadata } from '@/lib/metadata'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { ProductDetails, ProductDetailsSkeleton } from './page.client'

interface Props {
  params: Promise<{ slug?: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  const queryClient = getQueryClient()

  const [product, { reviews, averageRating }] = await Promise.all([
    queryClient.fetchQuery(trpc.product.getOne.queryOptions({ id })),
    queryClient.fetchQuery(
      trpc.product.getProductReviews.queryOptions({ productId: id }),
    ),
    queryClient.prefetchQuery(
      trpc.product.getRelativeProducts.queryOptions({ id }),
    ),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.image,
            description: product.description,
            sku: product.id,
            mpn: product.id,
            brand: {
              '@type': 'Brand',
              name: 'Yuki',
            },
            offers: {
              '@type': 'Offer',
              url: `https://yourdomain.com/products/${product.id}`,
              priceCurrency: 'USD',
              price: product.price,
              priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
              availability:
                product.stock > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Yuki',
              },
            },
            aggregateRating:
              reviews.length > 0
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: averageRating,
                    reviewCount: reviews.length,
                  }
                : undefined,
            review:
              reviews.length > 0
                ? reviews.map((review) => ({
                    '@type': 'Review',
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: review.rating,
                    },
                    author: {
                      '@type': 'Person',
                      name: review.user.name,
                    },
                    reviewBody: review.comment,
                    datePublished: review.createdAt,
                  }))
                : undefined,
          }),
        }}
      />

      <HydrateClient>
        <main className="container grow py-4">
          <Suspense fallback={<ProductDetailsSkeleton />}>
            <ProductDetails id={id} />
          </Suspense>
        </main>
      </HydrateClient>
    </>
  )
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  try {
    const product = await getQueryClient().fetchQuery(
      trpc.product.getOne.queryOptions({ id }),
    )

    return createMetadata({
      title: product.name,
      description: product.description.substring(0, 160),
      openGraph: {
        images: `/api/og?title=${encodeURIComponent(
          product.name,
        )}&description=${encodeURIComponent(
          product.description.substring(0, 160),
        )}&image=${encodeURIComponent(product.image)}`,
        url: `/${slug}`,
      },
    })
  } catch {
    notFound()
  }
}
