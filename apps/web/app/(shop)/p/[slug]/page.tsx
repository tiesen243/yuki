import type { NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { seo } from '@/lib/seo'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { PageClient } from './page.client'

const Page: NextPage<Props> = async ({ params }) => {
  try {
    void api.product.getOne.prefetch({ id: getIdFromSlug(params.slug) })

    return (
      <HydrateClient>
        <main className="container py-4">
          <PageClient id={getIdFromSlug(params.slug)} />
        </main>
      </HydrateClient>
    )
  } catch {
    notFound()
  }
}

export default Page

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  try {
    const { product } = await api.product.getOne({ id: getIdFromSlug(params.slug) })
    const previousImages = (await parent).openGraph?.images ?? []

    const name = product.name.length > 50 ? `${product.name.slice(0, 50)}...` : product.name
    const description =
      product.description.length > 200
        ? `${product.description.slice(0, 200)}...`
        : product.description

    return seo({
      title: product.name,
      description: product.description,
      images: [
        `/api/og?title=${name}&description=${description}&image=${product.image}`,
        product.image,
        ...previousImages,
      ],
      url: `/p/${params.slug}`,
    })
  } catch {
    notFound()
  }
}

interface Props {
  params: { slug: string }
}
