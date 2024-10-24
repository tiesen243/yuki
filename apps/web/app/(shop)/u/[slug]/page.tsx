import type { NextPage, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import type { Query } from '@yuki/api'

import { seo } from '@/lib/seo'
import { api, HydrateClient } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'
import { PageClient } from './page.client'

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  try {
    const page = Number(searchParams.page) || 1
    void api.user.getOne.prefetch({ id: getIdFromSlug(params.slug), page })

    return (
      <HydrateClient>
        <main className="container py-4">
          <PageClient id={getIdFromSlug(params.slug)} searchParams={searchParams} />
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
        ...(previousImages as string[]),
      ],
      url: `/u/${params.slug}`,
    })
  } catch {
    notFound()
  }
}

interface Props {
  params: { slug: string }
  searchParams: Query
}
