'use client'

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
        alt={category.name}
        width={300}
        height={300}
        className="aspect-square w-full rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = '/assets/logo.svg'
          e.currentTarget.className = 'aspect-square w-full rounded-t-xl dark:invert'
        }}
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
