import Image from 'next/image'

import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const [{ user, products }] = api.user.getOne.useSuspenseQuery({ id })

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
}
