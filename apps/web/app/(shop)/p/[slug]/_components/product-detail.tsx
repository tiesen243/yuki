import Image from 'next/image'

import type { Product } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

export const ProductDetail: React.FC<{ product: Product & { category: { name: string } } }> = ({
  product,
}) => (
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
        {product.description.split('\\n').map((p, idx) => (
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
)
