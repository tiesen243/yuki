import Image from 'next/image'
import Link from 'next/link'

import type { Category } from '@yuki/db'
import { Badge } from '@yuki/ui/badge'
import { Card, CardContent } from '@yuki/ui/card'
import { Skeleton } from '@yuki/ui/skeleton'

import { slugify } from '@/lib/utils'

export const CategoryCard: React.FC<{ category: Category & { _count: { products: number } } }> = ({
  category,
}) => {
  const productCount = category._count.products

  return (
    <Link href={`/p?category=${slugify(category.name, category.id)}`} className="block" passHref>
      <Card className="overflow-hidden transition-all hover:border-ring hover:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="mb-2 text-2xl font-bold">{category.name}</h3>
            <Badge className="bg-primary/80 text-primary-foreground hover:bg-primary">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Explore our wide range of {category.name.toLowerCase()} products and find exactly what
            you need.
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export const CategoryCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden transition-all hover:border-ring hover:shadow-lg">
    <div className="relative aspect-video">
      <Skeleton className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="mb-2 text-2xl font-bold">Loading...</h3>
        <Badge className="bg-primary/80 text-primary-foreground hover:bg-primary">0 products</Badge>
      </div>
    </div>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">
        Explore our wide range of loading... products and find exactly what you need.
      </p>
    </CardContent>
  </Card>
)
