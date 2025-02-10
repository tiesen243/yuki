import Image from 'next/image'
import Link from 'next/link'

import type { Product } from '@yuki/db'
import { Card, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { slugify } from '@/lib/utils'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Card variant="pressable" asChild>
    <Link href={`/${slugify(product.name)}-${product.id}`}>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="aspect-square w-full rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = '/assets/logo.svg'
          e.currentTarget.className = 'aspect-square w-full rounded-t-xl dark:invert'
        }}
      />
      <CardHeader>
        <CardTitle className="truncate">{product.name}</CardTitle>
        <CardDescription className="flex flex-wrap items-center justify-between gap-0.5">
          <span>${product.price}</span>
          <span>Stock: {product.stock}</span>
        </CardDescription>
      </CardHeader>
    </Link>
  </Card>
)

export const ProductCardSkeleton: React.FC = () => (
  <Card>
    <div className="aspect-square w-full animate-pulse rounded-t-xl bg-current" />
    <CardHeader>
      <CardTitle className="w-1/2 animate-pulse rounded bg-current"> &nbsp;</CardTitle>
      <CardDescription className="flex items-center justify-between">
        <span className="w-1/4 animate-pulse rounded bg-current"> &nbsp;</span>
        <span className="w-1/4 animate-pulse rounded bg-current"> &nbsp;</span>
      </CardDescription>
    </CardHeader>
  </Card>
)
