import type { NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { seo } from '@/lib/seo'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { PageClient } from './page.client'

const Page: NextPage<Props> = async ({ params }) => {
  try {
    void api.user.getOne.prefetch({ id: getIdFromSlug(params.slug) })

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
    const { user } = await api.user.getOne({ id: getIdFromSlug(params.slug) })
    const previousImages = (await parent).openGraph?.images ?? []
    const description = `Check out ${user.name}'s products. They have ${user._count.products} products. Join them now!`

    return seo({
      title: user.name,
      description,
      images: [
        `/api/og?title=${user.name}&description=${description}&image=${user.avatar ?? user.discord?.avatar}`,
        user.avatar ?? '',
        user.discord?.avatar ?? '',
        ...previousImages,
      ],
      url: `/u/${params.slug}`,
    })
  } catch {
    notFound()
  }
}

interface Props {
  params: { slug: string }
}
