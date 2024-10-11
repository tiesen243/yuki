'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'
import { slugify } from '@/lib/utils'

export const PageClient: React.FC<{ id: string }> = ({ id }) => {
  const [{ product, relatedProducts }] = api.product.getOne.useSuspenseQuery({ id })

  return (
    <>
      <section className="grid gap-4 md:grid-cols-12 md:gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-auto w-full rounded-lg object-cover md:col-span-4"
        />

        <article className="flex h-full flex-col md:col-span-8">
          <Typography level="h2">{product.name}</Typography>

          <Typography className="max-h-[300px] overflow-y-auto pr-2">
            {product.description?.split('\\n').map((p, idx) => (
              <span key={idx}>
                {p}
                <br />
              </span>
            ))}
          </Typography>

          <div className="flex-1" />

          <Typography>
            <strong>Category:</strong> {product.category.name}
          </Typography>

          <Typography className="flex justify-between">
            <span>
              <strong>Price:</strong> ${product.price}
            </span>
            <span>
              <strong>Stock:</strong> {product.stock}
            </span>
          </Typography>

          <Button className="mt-4 w-full">Add to Cart</Button>
        </article>
      </section>

      <section className="mt-8 flex items-center gap-8 rounded-lg border p-6 shadow-md">
        <Image
          src={product.owner.avatar ?? product.owner.discord?.avatar ?? ''}
          alt={product.owner.name}
          width={100}
          height={100}
          className="aspect-square rounded-full"
        />

        <article className="flex-1">
          <Typography level="h4">
            {product.owner.name}{' '}
            {product.owner.discord && (
              <span className="text-base font-medium text-muted-foreground">
                #{product.owner.discord.username}
              </span>
            )}
          </Typography>

          <Typography>
            <strong>Joined at:</strong> {product.owner.createdAt.toDateString()}
          </Typography>
        </article>

        <div className="flex flex-col gap-2">
          <Button asChild>
            <Link href={`/u/${slugify(product.owner.name, product.owner.id)}`}>Profile</Link>
          </Button>

          <Button variant="outline" asChild>
            <a
              href={
                product.owner.discord
                  ? `https://discord.com/users/${product.owner.discord.id}`
                  : `mailto:${product.owner.email}`
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              Message
            </a>
          </Button>
        </div>
      </section>

      <section className="mt-8">
        <Typography level="h3">Related Products</Typography>

        <Marquee>
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} className="w-1/2" />
          ))}
        </Marquee>
      </section>
    </>
  )
}
