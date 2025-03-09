'use client'

import React, { useReducer } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { Card, CardContent } from '@yuki/ui/card'
import { StarIcon } from '@yuki/ui/icons'
import { Separator } from '@yuki/ui/separator'
import { toast } from '@yuki/ui/sonner'
import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

import { useTRPC } from '@/lib/trpc/react'
import { ProductCard } from '../_components/product-card'

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const trpc = useTRPC()
  const { data: product } = useSuspenseQuery(
    trpc.product.getOne.queryOptions({ id }),
  )
  const { data: reviews } = useSuspenseQuery(
    trpc.product.getProductReviews.queryOptions({ productId: id }),
  )

  const discountedPrice = product.discount
    ? parseFloat(
        (product.price - (product.price * product.discount) / 100).toFixed(2),
      )
    : null

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <h1 className="sr-only">{product.name}</h1>

      <section>
        <h2 className="sr-only">Product Image Section</h2>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="mx-auto w-full rounded-lg object-cover"
        />
      </section>

      <section className="md:col-span-2">
        <h2 className="sr-only">Product Information Section</h2>

        <section>
          <Typography variant="h3">{product.name}</Typography>

          <div className="divide-muted-foreground flex items-center gap-2 divide-x-1 divide-solid pt-2 *:h-6 *:pr-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < reviews.averageRating
                      ? 'fill-warning-foreground text-warning-foreground'
                      : 'fill-muted text-muted-foreground',
                  )}
                />
              ))}
              <span className="text-muted-foreground ml-1 text-xs">
                ({reviews.averageRating.toFixed(1)})
              </span>
            </div>

            <p className="text-muted-foreground">
              {reviews.reviews.length} reviews
            </p>

            <p className="text-muted-foreground">{product.sold} sold</p>
          </div>

          <section>
            <h3 className="sr-only">Price Section</h3>

            <Typography className="flex items-center gap-4 text-lg font-medium">
              <span>${discountedPrice ?? product.price}</span>
              {product.discount > 0 && <del>${product.price}</del>}
              {product.discount > 0 && (
                <span className="text-destructive-foreground">
                  {product.discount}% off
                </span>
              )}
            </Typography>
          </section>

          <section>
            <h3 className="sr-only">Description Section</h3>

            <Typography>
              Category:{' '}
              <span className="text-muted-foreground">
                {product.category.name}
              </span>
            </Typography>
            <Typography>{product.description}</Typography>
          </section>

          <AddToCartButton id={id} name={product.name} stock={product.stock} />
        </section>
      </section>
    </section>
  )
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'input'; quantity: number }

const AddToCartButton: React.FC<{
  id: string
  name: string
  stock: number
}> = ({ id, name, stock }) => {
  const [state, dispatch] = useReducer(
    (state, action: Action) => {
      switch (action.type) {
        case 'increment':
          return { quantity: Math.min(state.quantity + 1, stock) }
        case 'decrement':
          return { quantity: Math.max(state.quantity - 1, 0) }
        case 'input':
          return { quantity: action.quantity }
        default:
          return state
      }
    },
    { quantity: 0 },
  )

  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation(
    trpc.cart.updateCart.mutationOptions({
      onSuccess: async () => {
        toast.success(`Product ${name} added to cart`)
        dispatch({ type: 'input', quantity: 0 })
        await queryClient.invalidateQueries({
          queryKey: trpc.cart.getCart.queryKey(),
        })
        router.refresh()
      },
      onError: (error) => toast.error(error.message),
    }),
  )

  return (
    <section className="mt-4 grid grid-cols-2 gap-4 md:w-1/2">
      <h3 className="sr-only">Add to Cart Section</h3>

      <div className="col-span-2 flex items-center gap-4">
        <label htmlFor="quantity-input" className="text-sm font-medium">
          Quantity:
        </label>
        <div className="flex h-9 items-center rounded-lg border">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={() => {
              dispatch({ type: 'decrement' })
            }}
            disabled={state.quantity === 0 || isPending}
          >
            -
          </Button>
          <input
            id="quantity-input"
            name="quantity-input"
            className="w-20 [appearance:textfield] text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            type="number"
            value={state.quantity}
            onChange={(e) => {
              const newValue = parseInt(e.target.value)
              if (!isNaN(newValue) && newValue <= stock)
                dispatch({ type: 'input', quantity: newValue })
            }}
            disabled={isPending}
          />
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none"
            onClick={() => {
              dispatch({ type: 'increment' })
            }}
            disabled={state.quantity === stock || isPending}
          >
            +
          </Button>
        </div>

        <span className="text-muted-foreground text-sm">{stock} in stock</span>
      </div>

      <Button
        onClick={() => {
          mutate({
            productId: id,
            quantity: state.quantity,
          })
        }}
        disabled={state.quantity === 0 || state.quantity > stock || isPending}
      >
        Add to cart
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          mutate({
            productId: id,
            quantity: state.quantity,
          })
          router.push('/account/cart')
          await new Promise((resolve) => setTimeout(resolve, 100))
          router.refresh()
        }}
        disabled={state.quantity === 0 || state.quantity > stock || isPending}
      >
        Buy now
      </Button>
    </section>
  )
}

export const ProductDetailsSkeleton: React.FC = () => (
  <section className="grid gap-4 md:grid-cols-3">
    <h1 className="sr-only">loading...</h1>

    <section>
      <h2 className="sr-only">Product Image Section</h2>
      <div className="mx-auto aspect-square w-full animate-pulse rounded-lg bg-current object-cover" />
    </section>

    <section className="md:col-span-2">
      <h2 className="sr-only">Product Information Section</h2>

      <section>
        <Typography
          variant="h3"
          className="w-2/3 animate-pulse rounded-md bg-current"
        >
          &nbsp;
        </Typography>

        <div className="divide-muted-foreground flex items-center gap-2 divide-x-1 divide-solid pt-2 *:h-6 *:pr-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn('h-4 w-4', 'fill-muted text-muted-foreground')}
              />
            ))}
            <span className="text-muted-foreground ml-1 text-xs">(0.0)</span>
          </div>

          <p className="text-muted-foreground">0 reviews</p>

          <p className="text-muted-foreground">0 sold</p>
        </div>

        <section>
          <h3 className="sr-only">Price Section</h3>

          <Typography className="w-1/2 animate-pulse rounded-md bg-current text-lg font-medium">
            &nbsp;
          </Typography>
        </section>

        <section>
          <h3 className="sr-only">Description Section</h3>

          <Typography className="w-1/3 animate-pulse rounded-md bg-current">
            &nbsp;
          </Typography>
          <Typography className="h-52 animate-pulse rounded-md bg-current" />
        </section>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-4 md:w-1/2">
        <h2 className="sr-only">Add to Cart Section</h2>

        <div className="col-span-2 flex items-center gap-4">
          <span>Quantity:</span>
          <div className="flex h-9 items-center rounded-lg border">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none"
              disabled
            >
              -
            </Button>
            <input
              className="w-20 [appearance:textfield] text-center outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              value={0}
              disabled
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none"
              disabled
            >
              +
            </Button>
          </div>

          <span className="text-muted-foreground text-sm">0 in stock</span>
        </div>

        <Button disabled>Add to cart</Button>
        <Button variant="outline" disabled>
          Buy now
        </Button>
      </section>
    </section>
  </section>
)

export const ProductReviews = ({ id }: { id: string }) => {
  const trpc = useTRPC()
  const {
    data: { reviews, averageRating },
  } = useSuspenseQuery(
    trpc.product.getProductReviews.queryOptions({ productId: id }),
  )

  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    if (review.rating && review.rating >= 1 && review.rating <= 5)
      // @ts-expect-error - trust me bri
      ratingCounts[review.rating - 1]++
  })
  const percentages = ratingCounts.map((count) =>
    reviews.length > 0 ? (count / reviews.length) * 100 : 0,
  )

  return (
    <>
      <div className="my-4 grid gap-8 md:grid-cols-[1fr_2fr]">
        <Card className="flex flex-col items-center justify-center">
          <div className="mb-2 text-4xl font-bold">
            {averageRating.toFixed(1)}
          </div>
          <div className="mb-2 flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Based on {reviews.length || 0} review
            {reviews.length !== 1 ? 's' : ''}
          </p>
        </Card>

        <Card>
          <CardContent>
            <h3 className="mb-4 font-medium">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex w-16 items-center gap-1">
                    <span className="text-sm">{rating}</span>
                    <StarIcon className="fill-primary text-primary h-4 w-4" />
                  </div>
                  <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${percentages[rating - 1]}%` }}
                    />
                  </div>
                  <div className="w-10 text-right text-xs">
                    {ratingCounts[rating - 1]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h3 className="sr-only">Reviews Section</h3>

        {reviews.length === 0 ? (
          <p className="text-muted-foreground py-4">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage
                    src={review.user.image || ''}
                    alt={review.user.name}
                  />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-start gap-4">
                    <div className="grid gap-0.5">
                      <h4 className="font-semibold">{review.user.name}</h4>
                      <time className="text-muted-foreground text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </time>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-muted-foreground mt-2 text-sm leading-loose">
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export const ProductReviewsSkeleton: React.FC = () => (
  <>
    <div className="my-4 grid gap-8 md:grid-cols-[1fr_2fr]">
      <Card className="flex flex-col items-center justify-center">
        <div className="mb-2 text-4xl font-bold">0.0</div>
        <div className="mb-2 flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${'fill-muted text-muted-foreground'}`}
            />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 text-sm">Based on 0 reviews</p>
      </Card>

      <Card>
        <CardContent>
          <h3 className="mb-4 font-medium">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex w-16 items-center gap-1">
                  <span className="text-sm">{rating}</span>
                  <StarIcon className="fill-primary text-primary h-4 w-4" />
                </div>
                <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                  <div className="bg-primary h-full w-0 rounded-full" />
                </div>
                <div className="w-10 text-right text-xs">0</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <section className="space-y-6">
      <h3 className="sr-only">Reviews Section</h3>

      <p className="text-muted-foreground py-4">
        No reviews yet. Be the first to review this product!
      </p>
    </section>
  </>
)

export const RelatedProducts: React.FC<{ id: string }> = ({ id }) => {
  const trpc = useTRPC()
  const {
    data: { products },
  } = useSuspenseQuery(trpc.product.getRelatedProducts.queryOptions({ id }))

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ))
}
