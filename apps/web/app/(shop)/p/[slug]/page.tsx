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
        <PageClient id={getIdFromSlug(params.slug)} />
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
    const description = `For only $${product.price}, you can get ${product.name} from ${product.owner.name}.`

    return seo({
      title: product.name,
      description: product.description,
      images: [
        `/api/og?title=${product.name}&description=${description}&image=${product.image}`,
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
