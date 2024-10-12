'use client'

import Image from 'next/image'

import { buttonVariants } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const [{ user, rating, products }] = api.user.getOne.useSuspenseQuery({ id })

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

        <article className="grid grid-cols-2 gap-4 rounded-lg p-0 md:col-span-9 md:bg-secondary md:p-6 md:text-start">
          <Typography level="h1">
            {user.name}{' '}
            {user.discord && (
              <span className="text-base font-medium text-muted-foreground">
                #{user.discord.username}
              </span>
            )}
          </Typography>
          <Typography>Rating: {rating}/5</Typography>
          <Typography>Joined at: {user.createdAt.toDateString()}</Typography>
          <Typography>Numer of products: {user._count.products}</Typography>

          <div className="flex-1" />

          <a
            href={
              user.discord ? `https://discord.com/users/${user.discord.id}` : `mailto:${user.email}`
            }
            target="_blank"
            rel="noreferrer noopener"
            className={buttonVariants()}
          >
            Send a message
          </a>
        </article>
      </section>

      <section className="mt-8">
        <Typography level="h2">{user.name}'s products</Typography>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
