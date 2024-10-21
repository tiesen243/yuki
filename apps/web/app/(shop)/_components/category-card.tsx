import Image from 'next/image'
import Link from 'next/link'

import type { Category } from '@yuki/db'
import { Card, CardHeader, CardTitle } from '@yuki/ui/card'
import { Skeleton } from '@yuki/ui/skeleton'

import { slugify } from '@/lib/utils'

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <Link href={`/p?category=${slugify(category.name, category.id)}`} passHref>
    <Card className="aspect-square w-full transition-colors ease-linear hover:bg-secondary">
      <Image
        src={category.image}
        alt={`category-${category.name.toLowerCase()}`}
        width={200}
        height={200}
        className="absolute inset-0 aspect-square w-full object-cover"
      />
      <CardHeader className="absolute bottom-0 w-full bg-secondary">
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
    </Card>
  </Link>
)

export const CategoryCardSkeleton: React.FC = () => (
  <Card className="aspect-square w-full">
    <Skeleton className="absolute inset-0 aspect-square w-full object-cover" />

    <CardHeader className="absolute bottom-0 w-full bg-secondary">
      <CardTitle className="animate-pulse">Loading...</CardTitle>
    </CardHeader>
  </Card>
)
