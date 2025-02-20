import { Suspense } from 'react'

import type { Query } from '@yuki/api/validators/product'

import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import {
  FilterSidebar,
  ProductList,
  ProductListSkeleton,
  ProductPagination,
  ProductPaginationSkeleton,
} from './page.client'

interface Props {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Query>
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params
  const {
    page = 1,
    limit = 20,
    orderBy = 'desc',
    sortBy = 'createdAt',
    q,
  } = await searchParams

  const categoryId = getIdFromSlug(slug?.at(0))

  void api.product.getAll.prefetch({
    page: +page,
    limit: +limit,
    q,
    orderBy: 'asc',
    sortBy: 'createdAt',
    category: categoryId,
  })

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
          <Suspense fallback={<ProductListSkeleton limit={+limit} />}>
            <ProductList {...query} />
          </Suspense>

          <Suspense fallback={<ProductPaginationSkeleton />}>
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

  const category = await api.category.getOne({ id })

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
