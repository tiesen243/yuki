'use client'

import Image from 'next/image'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import { Card, CardContent } from '@yuki/ui/card'
import {
  HeartIcon,
  PackageIcon,
  Share2Icon,
  ShoppingCartIcon,
  TagIcon,
} from '@yuki/ui/icons'
import { toast } from '@yuki/ui/sonner'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/_components/product-card'
import { useTRPC } from '@/lib/trpc/react'

export const ProductDetail: React.FC<{ id: string }> = ({ id }) => {
  const { trpc, queryClient } = useTRPC()

  const { data: product } = useSuspenseQuery(
    trpc.product.byId.queryOptions({ id }),
  )

  const { mutate, isPending } = useMutation({
    ...trpc.cart.add.mutationOptions(),
    onSuccess: async () => {
      toast.success('Product added to cart successfully!')
      await queryClient.invalidateQueries(trpc.cart.get.queryFilter())
    },
  })

  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <section className="space-y-4">
        <h2 className="sr-only">{product.name} Image section</h2>

        <Card className="overflow-hidden py-0">
          <CardContent className="px-0">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-auto w-full object-cover"
              priority
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="sr-only">{product.name} Information section</h2>

        <section>
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TagIcon className="h-3 w-3" />
              {product.category}
            </Badge>
          </div>

          <Typography variant="h3">{product.name}</Typography>
        </section>

        <section className="space-y-4">
          <h3 className="sr-only">Price and Stock section</h3>

          <div className="flex items-center justify-between">
            <div className="text-primary text-2xl font-bold">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-2">
              <PackageIcon className="h-4 w-4" />
              <span
                className={`font-medium ${product.stock > 0 ? 'text-success' : 'text-destructive'}`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : 'Out of stock'}
              </span>
            </div>
          </div>
        </section>

        <hr />

        <section>
          <Typography variant="h3" className="text-xl lg:text-xl">
            Description
          </Typography>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </section>

        <hr />

        <section>
          <Typography variant="h3" className="text-xl lg:text-xl">
            Key Features
          </Typography>
          <ul className="text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              Premium quality materials
            </li>
            <li className="flex items-center gap-2">
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              Fast and reliable shipping
            </li>
            <li className="flex items-center gap-2">
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              30-day return policy
            </li>
            <li className="flex items-center gap-2">
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              1-year warranty included
            </li>
          </ul>
        </section>

        <section className="space-y-4 pt-4">
          <h3 className="sr-only">Action Buttons section</h3>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              size="lg"
              className="grow"
              disabled={isPending || product.stock === 0}
              onClick={() => {
                mutate({ productId: product.id, quantity: 1 })
              }}
            >
              <ShoppingCartIcon />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button size="lg" variant="outline">
              <HeartIcon />
              Wishlist
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href)
                toast.success('Product link copied to clipboard!')
              }}
            >
              <Share2Icon />
              Share
            </Button>
          </div>

          {/* Product Details */}
          <Card className="py-4">
            <CardContent>
              <Typography
                variant="h3"
                className="mb-4 text-lg font-semibold lg:text-lg"
              >
                Product Details
              </Typography>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Product ID:</dt>
                  <dd className="font-medium">#{product.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Availability:</dt>
                  <dd
                    className={`font-medium ${product.stock > 0 ? 'text-success' : 'text-destructive'}`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </section>
      </section>
    </section>
  )
}

export const ProductDetailSkeleton: React.FC = () => (
  <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
    <section className="space-y-4">
      <h2 className="sr-only">Image section</h2>

      <Card className="overflow-hidden py-0">
        <CardContent className="px-0">
          <div className="aspect-square h-auto w-full animate-pulse bg-current object-cover" />
        </CardContent>
      </Card>
    </section>

    <section className="space-y-6">
      <h2 className="sr-only">Information section</h2>

      <section>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <TagIcon className="h-3 w-3" />
            <span className="w-24 animate-pulse rounded-md bg-current">
              &nbsp;
            </span>
          </Badge>
        </div>
        <Typography
          variant="h3"
          className="w-3/4 animate-pulse rounded-md bg-current"
        >
          &nbsp;
        </Typography>
      </section>

      <section className="space-y-4">
        <h3 className="sr-only">Price and Stock section</h3>

        <div className="flex items-center justify-between">
          <div className="text-primary w-24 animate-pulse rounded-md bg-current text-2xl font-bold">
            &nbsp;
          </div>
          <div className="flex items-center gap-2">
            <PackageIcon className="h-4 w-4" />
            <span className="w-32 animate-pulse rounded-md bg-current font-medium">
              &nbsp;
            </span>
          </div>
        </div>
      </section>

      <hr />

      <section>
        <Typography variant="h3" className="text-xl lg:text-xl">
          Description
        </Typography>
        <p className="h-20 w-full animate-pulse rounded-md bg-current leading-relaxed">
          &nbsp;
        </p>
      </section>

      <hr />

      <section>
        <Typography variant="h3" className="text-xl lg:text-xl">
          Key Features
        </Typography>
        <ul className="text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            Premium quality materials
          </li>
          <li className="flex items-center gap-2">
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            Fast and reliable shipping
          </li>
          <li className="flex items-center gap-2">
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            30-day return policy
          </li>
          <li className="flex items-center gap-2">
            <div className="bg-primary h-1.5 w-1.5 rounded-full" />
            1-year warranty included
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-4">
        <h3 className="sr-only">Action Buttons section</h3>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg">
            <ShoppingCartIcon />
            Add to Cart
          </Button>
          <Button size="lg" variant="outline">
            <HeartIcon />
            Wishlist
          </Button>
          <Button size="lg" variant="outline">
            <Share2Icon />
            Share
          </Button>
        </div>

        {/* Product Details */}
        <Card className="py-4">
          <CardContent>
            <Typography
              variant="h3"
              className="mb-4 text-lg font-semibold lg:text-lg"
            >
              Product Details
            </Typography>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Product ID:</dt>
                <dd className="w-24 animate-pulse rounded-md bg-current font-medium">
                  &nbsp;
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Category:</dt>
                <dd className="w-24 animate-pulse rounded-md bg-current font-medium">
                  &nbsp;
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Availability:</dt>
                <dd className="w-24 animate-pulse rounded-md bg-current font-medium">
                  &nbsp;
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </section>
    </section>
  </section>
)

export const RelativeProducts: React.FC<{ id: string }> = ({ id }) => {
  const { trpc } = useTRPC()

  const { data: products } = useSuspenseQuery(
    trpc.product.relativeProducts.queryOptions({ id }),
  )

  return (
    <section className="mt-6 space-y-4">
      <Typography variant="h2" className="text-xl lg:text-2xl">
        Related Products
      </Typography>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
