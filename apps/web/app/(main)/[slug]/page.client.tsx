'use client'

import React, { useReducer } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { StarIcon } from '@yuki/ui/icons'
import { toast } from '@yuki/ui/sonner'
import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

import { useTRPC } from '@/lib/trpc/react'

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

          <div className="divide-muted-foreground flex items-center gap-2 divide-x-1 divide-solid *:h-6 *:pr-2">
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
        <span>Quantity:</span>
        <div className="flex h-9 items-center rounded-lg border">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none"
            onClick={() => dispatch({ type: 'decrement' })}
            disabled={state.quantity === 0 || isPending}
          >
            -
          </Button>
          <input
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
            onClick={() => dispatch({ type: 'increment' })}
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

        <div className="divide-muted-foreground flex items-center gap-2 divide-x-1 divide-solid *:h-6 *:pr-2">
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
