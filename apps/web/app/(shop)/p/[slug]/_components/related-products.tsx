import type { Product } from '@yuki/db'
import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/(shop)/_components/product-card'

interface Props {
  products: Array<Product & { category: { name: string } }>
}

export const RelatedProducts: React.FC<Props> = ({ products }) => (
  <section className="mt-8">
    <Typography level="h3">Related Products</Typography>

    <Marquee>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="w-96" />
      ))}
    </Marquee>
  </section>
)
