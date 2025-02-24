import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { ShoppingCartIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

import { ProductCardSkeleton } from '@/app/(main)/_components/product-card'
import { createMetadata } from '@/lib/metadata'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import {
  ProductDetails,
  ProductReviews,
  RelativeProducts,
  StarRating,
} from './page.client'

interface Props {
  params: Promise<{ slug?: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  const queryClient = getQueryClient()

  void Promise.all([
    queryClient.prefetchQuery(trpc.product.getOne.queryOptions({ id })),
    queryClient.prefetchQuery(
      trpc.product.getProductReviews.queryOptions({ productId: id }),
    ),
    queryClient.prefetchQuery(
      trpc.product.getRelativeProducts.queryOptions({ id }),
    ),
  ])

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <Suspense
          fallback={
            <section className="grid gap-4 md:grid-cols-12">
              <section className="md:col-span-5">
                <h2 className="sr-only">Product Image Section</h2>
                <div className="aspect-square w-full animate-pulse rounded-md bg-current object-cover" />
              </section>

              <section className="flex max-h-full flex-col md:col-span-7">
                <h2 className="sr-only">Product Information Section</h2>
                <Typography
                  variant="h3"
                  className="animate-pulse rounded-md bg-current"
                >
                  &nbsp;
                </Typography>
                <div className="my-4 flex items-center gap-4">
                  <StarRating rating={0} />
                  <hr className="bg-border h-6 w-0.5" />
                  <p>0 Reviews</p>
                  <hr className="bg-border h-6 w-0.5" />
                  <p>0 Sold</p>
                </div>

                <Typography className="w-1/3 animate-pulse rounded-md bg-current">
                  &nbsp;
                </Typography>

                <Typography className="w-full grow animate-pulse rounded-md bg-current">
                  &nbsp;
                </Typography>

                <section className="flex items-center text-lg">
                  <h3 className="sr-only">Product Price Section</h3>
                  <Typography className="mb-4 w-1/6 animate-pulse rounded-md bg-current">
                    &nbsp;
                  </Typography>
                </section>

                <div className="flex items-center gap-4">
                  <span>Quantity:</span>

                  <div className="flex items-center rounded-md border">
                    <label htmlFor="quantity" className="sr-only">
                      Quantity
                    </label>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none border-none"
                      disabled
                    >
                      -
                    </Button>
                    <input
                      name="quantity"
                      className="text-muted-foreground flex h-9 w-16 items-center justify-center border-x text-center focus-visible:outline-none"
                      value={0}
                      disabled
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-none border-none"
                      disabled
                    >
                      +
                    </Button>
                  </div>

                  <span className="text-muted-foreground text-xs">
                    0 items available
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 items-center gap-4 md:flex">
                  <Button variant="outline" disabled>
                    <ShoppingCartIcon />
                    Add to cart
                  </Button>
                  <Button disabled>Buy now</Button>
                </div>
              </section>
            </section>
          }
        >
          <ProductDetails id={id} />
        </Suspense>

        <section className="my-8">
          <h2 className="sr-only">PRODUCT REVIEWS Section</h2>
          <p className="my-4 text-lg uppercase">PRODUCT REVIEWS</p>
          <Suspense
            fallback={
              <>
                <StarRating rating={0} />

                <div className="my-4">
                  <span className="text-muted-foreground">
                    No reviews yet. Be the first to review this product!
                  </span>
                </div>
              </>
            }
          >
            <ProductReviews id={id} />{' '}
          </Suspense>
        </section>

        <section>
          <h2 className="sr-only">Relative Products Section</h2>
          <p className="my-4 text-lg uppercase">You may also like</p>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {Array.from({ length: 12 }).map((_, i) => (
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
    const product = await getQueryClient().fetchQuery(
      trpc.product.getOne.queryOptions({ id }),
    )

    return createMetadata({
      title: product.name,
      description: product.description,
      openGraph: {
        images: `/api/og?title=${encodeURIComponent(
          product.name,
        )}&description=${encodeURIComponent(
          product.description,
        )}&image=${encodeURIComponent(product.image)}`,
        url: `/${slug}`,
      },
    })
  } catch {
    notFound()
  }
}
