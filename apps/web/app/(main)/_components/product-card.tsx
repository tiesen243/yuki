import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@yuki/db'
import { Badge } from '@yuki/ui/badge'
import { Card, CardDescription, CardFooter, CardTitle } from '@yuki/ui/card'

import { slugify } from '@/lib/utils'

export const ProductCard: React.FC<{
  product: Product & { category: { name: string } }
}> = ({ product }) => (
  <Card variant="pressable" className="group relative space-y-4" asChild>
    <Link href={`/${slugify(product.name)}-${product.id}`}>
      <figure>
        <Badge
          variant="outline"
          className="bg-card/70 group-hover:bg-secondary/70 absolute top-2 right-2 z-10 backdrop-blur-xl"
        >
          {product.category.name}
        </Badge>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={500}
          className="aspect-square w-full group-hover:opacity-90"
        />
      </figure>

      <CardFooter className="flex-col items-start gap-0.5">
        <CardTitle className="w-full truncate">{product.name}</CardTitle>
        <CardDescription>${product.price}</CardDescription>
      </CardFooter>
    </Link>
  </Card>
)

export const ProductCardSkeleton: React.FC = () => (
  <Card variant="pressable" className="relative space-y-4">
    <div className="aspect-square w-full animate-pulse rounded-t-lg bg-current" />

    <CardFooter className="flex-col items-start gap-0.5">
      <CardTitle className="w-1/2 animate-pulse rounded-md bg-current">
        &nbsp;
      </CardTitle>
      <CardDescription className="w-1/4 animate-pulse rounded-md bg-current">
        &nbsp;
      </CardDescription>
    </CardFooter>
  </Card>
)
