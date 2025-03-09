'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { RouterOutputs } from '@yuki/api'
import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { ExternalLinkIcon, StarIcon } from '@yuki/ui/icons'
import { cn } from '@yuki/ui/utils'

import { slugify } from '@/lib/utils'

type Product = RouterOutputs['product']['getAll']['products'][number]

interface ProductCardProps extends Product {
  currency?: string
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  category,
  price,
  averageRating,
  currency = '$',
  discount,
  className = '',
}) => {
  const discountedPrice = discount
    ? parseFloat((price - (price * discount) / 100).toFixed(2))
    : null

  return (
    <Card className={cn('group h-fit pt-0', className)}>
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="aspect-square h-full w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <Badge
          variant="outline"
          className="bg-card/70 absolute right-6 bottom-2 z-10 backdrop-blur-xl"
        >
          {category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                'h-4 w-4',
                i < averageRating
                  ? 'fill-warning-foreground text-warning-foreground'
                  : 'fill-muted text-muted-foreground',
              )}
            />
          ))}
          <span className="text-muted-foreground ml-1 text-xs">
            ({averageRating.toFixed(1)})
          </span>
        </div>
        <CardDescription className="inline-flex justify-between gap-1">
          {currency}
          {discountedPrice ?? price}

          {discount && (
            <>
              <del className="grow">
                {currency}
                {price}
              </del>
              <Badge variant="destructive">{discount}% off</Badge>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Add to cart</Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/${slugify(name)}-${id}`}>
            View details <ExternalLinkIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export const ProductCardSkeleton: React.FC<
  React.ComponentProps<typeof Card>
> = ({ className, ...props }) => (
  <Card {...props} className={cn('group pt-0', className)}>
    <div className="relative overflow-hidden">
      <div className="aspect-square h-full w-full animate-pulse rounded-t-xl bg-current object-cover" />

      <Badge
        variant="outline"
        className="bg-card/70 absolute right-6 bottom-2 z-10 w-20 animate-pulse backdrop-blur-xl"
      >
        &nbsp;
      </Badge>
    </div>

    <CardHeader>
      <CardTitle className="w-1/2 animate-pulse rounded-md bg-current">
        &nbsp;
      </CardTitle>

      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={cn('h-4 w-4', 'fill-muted text-muted-foreground')}
          />
        ))}
        <span className="text-muted-foreground ml-1 text-xs">(0.0)</span>
      </div>
      <CardDescription className="w-1/3 animate-pulse rounded-md bg-current">
        &nbsp;
      </CardDescription>
    </CardHeader>

    <CardFooter className="flex-col gap-2">
      <Button className="w-full animate-pulse" />
      <Button variant="outline" className="w-full animate-pulse" />
    </CardFooter>
  </Card>
)
