import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@yuki/ui'
import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardFooter } from '@yuki/ui/card'
import { ShoppingCart } from '@yuki/ui/icons'
import { Skeleton } from '@yuki/ui/skeleton'

import { slugify } from '@/lib/utils'

interface ProductCardProps {
  product: { id: string; image: string; name: string; price: number; category: { name: string } }
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => (
  <Card
    className={cn('overflow-hidden transition-all hover:border-ring hover:shadow-lg', className)}
  >
    <Link href={`/p/${slugify(product.name, product.id)}`} passHref>
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          className="aspect-square h-auto w-full object-cover"
          width={500}
          height={200}
        />
        <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
          {product.category.name}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">$ {product.price.toFixed(2)}</p>
      </CardContent>
    </Link>

    <CardFooter className="p-4 pt-0">
      <Button className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </CardFooter>
  </Card>
)

export const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Card
    className={cn(
      'w-full overflow-hidden transition-all hover:border-ring hover:shadow-lg',
      className,
    )}
  >
    <div className="relative">
      <Skeleton className="aspect-square h-auto w-full object-cover" />
      <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">
        Loading...
      </Badge>
    </div>

    <CardContent className="p-4">
      <h3 className="mb-2 line-clamp-1 text-lg font-semibold">Loading...</h3>
      <p className="text-2xl font-bold text-primary">$ NaN</p>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </CardFooter>
  </Card>
)
