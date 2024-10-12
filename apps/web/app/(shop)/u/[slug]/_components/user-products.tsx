import type { Product } from '@yuki/db'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/(shop)/_components/product-card'

interface Props {
  name: string
  products: Array<Product & { category: { name: string } }>
}

export const UserProducts: React.FC<Props> = ({ name, products }) => (
  <section className="mt-8">
    <Typography level="h2">{name}'s products</Typography>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
)
