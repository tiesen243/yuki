import type { NextPage } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/server'
import { getIdFromSlug } from '@/lib/utils'

const Page: NextPage<Props> = async ({ params }) => {
  try {
    const { product, relatedProducts } = await api.product.getOne({
      id: getIdFromSlug(params.slug),
    })

    return (
      <main className="container flex-1">
        <section className="grid gap-4 md:grid-cols-12 md:gap-8">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-auto w-full rounded-lg object-cover md:col-span-4"
          />

          <article className="md:col-span-8">
            <Typography level="h2">{product.name}</Typography>

            <Typography className="h-[350px] max-h-[350px] overflow-y-auto pr-2">
              {product.description?.split('\\n').map((p) => (
                <span>
                  {p}
                  <br />
                </span>
              ))}
            </Typography>

            <Typography>
              <span>
                <strong>Category:</strong> {product.category.name}
              </span>
              <br />
              <span>
                <strong>Price:</strong> ${product.price}
              </span>
              <br />
              <span>
                <strong>Stock:</strong> {product.stock}
              </span>
            </Typography>
          </article>
        </section>

        <section className="mt-8">
          <Typography level="h3">Related Products</Typography>

          <Marquee>
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="w-1/2" />
            ))}
          </Marquee>
        </section>
      </main>
    )
  } catch {
    notFound()
  }
}

export default Page

interface Props {
  params: { slug: string }
}
