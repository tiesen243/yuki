import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { createMetadata } from '@/lib/metadata'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import {
  ProductDetail,
  ProductDetailSkeleton,
  RelativeProducts,
} from './page.client'

type Props = Readonly<{
  params: Promise<{ productSlug: string }>
}>

export default async function ProductDetailPage({ params }: Props) {
  const { productSlug } = await params
  const id =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.exec(
      productSlug,
    )?.[0] ?? ''

  try {
    const [product] = await Promise.all([
      getQueryClient().ensureQueryData(trpc.product.byId.queryOptions({ id })),
      getQueryClient().prefetchQuery(
        trpc.product.relativeProducts.queryOptions({ id }),
      ),
    ])

    return (
      <HydrateClient>
        <main className="container py-4">
          <h1 className="sr-only">
            {product.name} - {product.category}
          </h1>

          <Suspense fallback={<ProductDetailSkeleton />}>
            <ProductDetail id={id} />
          </Suspense>

          <Suspense
            fallback={Array.from({ length: 8 }).map((_, i) => (
              <ProductDetailSkeleton key={i} />
            ))}
          >
            <RelativeProducts id={id} />
          </Suspense>
        </main>
      </HydrateClient>
    )
  } catch {
    notFound()
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { productSlug } = await params
  const id =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.exec(
      productSlug,
    )?.[0] ?? ''

  try {
    const product = await getQueryClient().ensureQueryData(
      trpc.product.byId.queryOptions({ id }),
    )

    const inages = new URLSearchParams()
    inages.append('title', product.name)
    inages.append('description', product.description)
    inages.append('image', product.image)

    return createMetadata({
      title: product.name,
      description: product.description,
      keywords: [product.name, product.category],
      openGraph: {
        images: [
          { url: `/api/og?${inages.toString()}`, alt: product.name },
          { url: product.image, alt: product.name },
        ],
        url: `/${productSlug}`,
      },
    })
  } catch {
    notFound()
  }
}
