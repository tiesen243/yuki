import Image from 'next/image'
import Link from 'next/link'

import type { Category } from '@yuki/db'
import { Card, CardHeader, CardTitle } from '@yuki/ui/card'

import { slugify } from '@/lib/utils'

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <Card variant="pressable" asChild>
    <Link href={`/shop/${slugify(category.name)}-${category.id}`}>
      <Image
        src={category.image}
        alt={`Category image for ${category.name.toLowerCase()}`}
        width={300}
        height={300}
        className="aspect-square h-auto w-full rounded-t-xl object-cover"
      />
      <CardHeader className="text-center">
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
    </Link>
  </Card>
)

export const CategoryCardSkeleton: React.FC = () => (
  <Card>
    <div className="aspect-square w-full animate-pulse rounded-t-xl bg-current" />
    <CardHeader>
      <CardTitle className="w-1/2 animate-pulse rounded bg-current"> &nbsp;</CardTitle>
    </CardHeader>
  </Card>
)
