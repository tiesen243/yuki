import { Suspense } from 'react'
import Form from 'next/form'
import Link from 'next/link'

import type { Query } from '@yuki/api/validators/product'
import { Input } from '@yuki/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@yuki/ui/select'
import { cn } from '@yuki/ui/utils'

import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug, slugify } from '@/lib/utils'
import {
  ProductList,
  ProductListSkeleton,
  ProductPagination,
  ProductPaginationSkeleton,
  SubmitButton,
} from './page.client'

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Query>
}) {
  const { slug } = await params
  const {
    page = 1,
    limit = 6 * 4,
    orderBy = 'createdAt',
    sortBy = 'desc',
    query,
  } = await searchParams

  const categoryId = getIdFromSlug(slug?.at(0))

  const [categories] = await Promise.all([
    api.category.getAll({ limit: 999 }),
    api.product.getAll.prefetch({
      page: +page,
      limit: +limit,
      query,
      orderBy,
      sortBy,
      category: categoryId,
    }),
  ])

  const q = {
    category: categoryId,
    limit: +limit,
    orderBy,
    page: +page,
    query: query,
    sortBy,
  }

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <h1 className="sr-only">All Product of Shop</h1>

        <Form
          action={slug ? `/shop/${slug}` : '/shop'}
          className="mb-4 flex flex-col items-center gap-4 md:flex-row"
        >
          <h2 className="sr-only">Product Filter Section</h2>

          <Input
            name="query"
            type="search"
            placeholder="Search..."
            defaultValue={query}
          />

          <Select name="orderBy" defaultValue={orderBy}>
            <SelectTrigger>
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <Select name="sortBy" defaultValue={sortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to High</SelectItem>
              <SelectItem value="desc">High to Low</SelectItem>
            </SelectContent>
          </Select>

          <input name="limit" defaultValue={limit} hidden readOnly />
          <input name="page" defaultValue={page} hidden readOnly />

          <SubmitButton />
        </Form>

        <div className="grid gap-4 md:grid-cols-12">
          <section className="col-span-2 hidden max-h-[50dvh] flex-col gap-2 overflow-y-auto md:flex">
            <h3 className="sr-only">Category List Section</h3>
            <Link
              href={{ pathname: '/shop', query: { ...q, page: 1 } }}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1',
                !categoryId && 'bg-accent text-accent-foreground',
              )}
            >
              All
            </Link>

            {categories.map((c) => (
              <Link
                key={c.id}
                href={{
                  pathname: `/shop/${slugify(c.name)}-${c.id}`,
                  query: { ...q, page: 1 },
                }}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1',
                  categoryId === c.id && 'bg-accent text-accent-foreground',
                )}
              >
                {c.name}
              </Link>
            ))}
          </section>

          <section className="md:col-span-10">
            <h3 className="sr-only">Product List Section</h3>

            <Suspense fallback={<ProductListSkeleton limit={+limit} />}>
              <ProductList {...q} />
            </Suspense>

            <Suspense fallback={<ProductPaginationSkeleton />}>
              <ProductPagination {...q} />
            </Suspense>
          </section>
        </div>
      </main>
    </HydrateClient>
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
