import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { ProductCardSkeleton } from '@/app/_components/product-card'
import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import {
  ProductDetails,
  ProductDetailsSkeleton,
  ProductReviews,
  ProductReviewsSkeleton,
  RelativeProducts,
} from './page.client'

interface Props {
  params: Promise<{ slug?: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  void Promise.all([
    api.product.getOne.prefetch({ id }),
    api.product.getProductReviews.prefetch({ productId: id }),
    api.product.getRelativeProducts.prefetch({ id }),
  ])

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails id={id} />
        </Suspense>

        <section className="my-8">
          <h2 className="sr-only">PRODUCT REVIEWS Section</h2>
          <p className="my-4 text-lg uppercase">PRODUCT REVIEWS</p>
          <Suspense fallback={<ProductReviewsSkeleton />}>
            <ProductReviews id={id} />
          </Suspense>
        </section>

        <section>
          <h2 className="sr-only">Relative Products Section</h2>
          <p className="my-4 text-lg uppercase">You may also like</p>

          <Suspense
            fallback={
              <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <RelativeProducts id={id} />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  try {
    const product = await api.product.getOne({ id })

    return createMetadata({
      title: product.name,
      description: product.description,
      openGraph: {
        images: `/api/og?title=${product.name}&description=${product.description}&image=${product.image}`,
        url: `/${slug}`,
      },
    })
  } catch {
    notFound()
  }
}
