import Image from 'next/image'

import type { Product } from '@yuki/db'
import { Button } from '@yuki/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@yuki/ui/card'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <Card>
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
      <CardTitle>{product.name}</CardTitle>
      <CardDescription className="flex items-center justify-between">
        <span>${product.price}</span>
        <span>Stock: {product.stock}</span>
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button className="w-full">Add to cart</Button>
    </CardFooter>
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

    <CardFooter>
      <Button className="w-full animate-pulse"> &nbsp;</Button>
    </CardFooter>
  </Card>
)
