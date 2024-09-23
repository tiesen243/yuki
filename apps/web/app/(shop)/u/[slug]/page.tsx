import type { NextPage, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/_components/product-card'
import { seo } from '@/lib/seo'
import { api } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'

const Page: NextPage<Props> = async ({ params }) => {
  try {
    const { user, products } = await api.user.getOne({ id: getIdFromSlug(params.slug) })

    return (
      <>
        <section className="grid gap-8 md:grid-cols-12">
          <Image
            src={user.avatar ?? user.discord?.avatar ?? ''}
            alt={user.name}
            width={400}
            height={400}
            className="mx-auto h-auto w-1/2 rounded-lg object-cover md:col-span-3 md:w-full"
          />

          <article className="text-center md:col-span-9 md:text-start">
            <Typography level="h1">
              {user.name}{' '}
              {user.discord && (
                <span className="text-base font-medium text-muted-foreground">
                  #{user.discord.username}
                </span>
              )}
            </Typography>
            <Typography>Joined at: {user.createdAt.toDateString()}</Typography>
            <Typography>Numer of products: {user._count.products}</Typography>
          </article>
        </section>

        <section className="mt-8">
          <Typography level="h2">{user.name}'s products</Typography>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </>
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
