import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@yuki/db'
import { Badge } from '@yuki/ui/badge'
import { Card, CardDescription, CardFooter, CardTitle } from '@yuki/ui/card'

import { slugify } from '@/lib/utils'

export const ProductCard: React.FC<{
  product: Product & { category: { name: string } }
}> = ({ product }) => (
  <Card variant="pressable" className="relative space-y-4" asChild>
    <Link href={`/${slugify(product.name)}-${product.id}`}>
      <figure>
        <Badge className="bg-card/50 absolute top-2 right-2">
          {product.category.name}
        </Badge>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={500}
          className="aspect-square w-full"
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
  <Card variant="pressable" className="space-y-4">
    <div className="aspect-square w-full animate-pulse rounded-t-lg bg-current" />

    <CardFooter className="flex-col items-start gap-0.5">
      <CardTitle className="w-1/2 animate-pulse rounded-md bg-current">&nbsp;</CardTitle>
      <CardDescription className="w-1/4 animate-pulse rounded-md bg-current">
        &nbsp;
      </CardDescription>
    </CardFooter>
  </Card>
)
