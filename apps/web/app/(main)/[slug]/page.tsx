import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { createMetadata } from '@/lib/metadata'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { ProductDetails } from './page.client'

interface Props {
  params: Promise<{ slug?: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  void api.product.getOne.prefetch({ id })

  return (
    <HydrateClient>
      <main className="container grow py-4">
        <Suspense fallback={'loading....'}>
          <ProductDetails id={id} />
        </Suspense>
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
