import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@yuki/ui'
import { Badge } from '@yuki/ui/badge'
import { Card, CardDescription, CardTitle } from '@yuki/ui/card'

import { slugify } from '@/lib/utils'

interface ProductCardProps {
  product: { id: string; image: string; name: string; price: number; category: { name: string } }
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => (
  <Card className={cn('group/product aspect-square overflow-hidden', className)} asChild>
    <Link href={`/p/${slugify(product.name, product.id)}`}>
      <Image
        src={product.image}
        alt={product.name}
        className={cn(
          'object-cover transition-all ease-linear hover:border-secondary group-hover/product:scale-110 group-hover/product:brightness-75',
          product.image === '/assets/logo.svg' && 'dark:invert',
        )}
        fill
      />

      <div className="flex h-full w-full items-end">
        <div className="flex w-full flex-col items-start gap-1 bg-secondary p-4 transition-colors ease-linear group-hover/product:bg-secondary/90">
          <div className="flex items-center gap-2">
            <Badge>{product.category.name}</Badge>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          </div>
          <CardDescription>$ {product.price.toFixed(2)}</CardDescription>
        </div>
      </div>
    </Link>
  </Card>
)
