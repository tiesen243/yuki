import { Suspense } from 'react'

import type { Query } from '@yuki/api/validators/product'
import { Button } from '@yuki/ui/button'

import { ProductCardSkeleton } from '@/app/_components/product-card'
import { createMetadata } from '@/lib/metadata'
import { getQueryClient, HydrateClient, trpc } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { FilterSidebar, ProductList, ProductPagination } from './page.client'

interface Props {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Query>
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params
  const {
    page = 1,
    limit = 4 * 5,
    orderBy = 'desc',
    sortBy = 'createdAt',
    q,
  } = await searchParams

  const queryClient = getQueryClient()

  const categoryId = getIdFromSlug(slug?.at(0))

  void queryClient.prefetchQuery(
    trpc.product.getAll.queryOptions({
      page: +page,
      limit: +limit,
      q,
      orderBy: 'asc',
      sortBy: 'createdAt',
      category: categoryId,
    }),
  )

  const query = {
    category: categoryId,
    limit: +limit,
    orderBy,
    page: +page,
    q,
    sortBy,
  }

  return (
    <HydrateClient>
      <main className="container flex grow flex-col gap-8 py-4 md:flex-row">
        <h1 className="sr-only">All Product of Shop</h1>

        <FilterSidebar slug={slug} {...query} />

        <section className="grow">
          <h3 className="sr-only">Product List Section</h3>
          <Suspense
            fallback={
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: +limit }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <ProductList {...query} />
          </Suspense>

          <Suspense
            fallback={
              <div className="mt-4 flex items-center justify-center gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className="bg-accent animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <ProductPagination {...query} />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  )
}

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params
  const id = getIdFromSlug(slug?.at(0))

  const category = await getQueryClient().fetchQuery(
    trpc.category.getOne.queryOptions({ id }),
  )

  if (!category)
    return createMetadata({
      title: 'Shop',
      description: 'A collection of all products for sale.',
      openGraph: {
        images: `/api/og?title=Shop&description=${encodeURIComponent('A collection of all products for sale.')}`,
        url: '/shop',
      },
    })

  return createMetadata({
    title: category.name,
    description: `A collection of all products of ${category.name} for sale.`,
    openGraph: {
      images: `/api/og?title=${encodeURIComponent(
        category.name,
      )}&description=${encodeURIComponent(
        `A collection of all products of ${category.name} for sale.`,
      )}&image=${encodeURIComponent(category.image)}`,
      url: `/shop/${slug}`,
    },
  })
}
