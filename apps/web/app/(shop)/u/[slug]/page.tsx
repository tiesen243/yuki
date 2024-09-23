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
      <main className="container flex-1">
        <section className="grid gap-8 md:grid-cols-12">
          <Image
            src={user.avatar ?? user.discord?.avatar ?? ''}
            alt={user.name}
            width={400}
            height={400}
            className="h-auto w-full rounded-lg object-cover md:col-span-3"
          />

          <article className="md:col-span-9">
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
          <Typography level="h2">Products</Typography>
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
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
        user.avatar!,
        user.discord?.avatar!,
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
