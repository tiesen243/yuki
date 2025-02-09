'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, Star } from '@yuki/ui/icons'
import { toast } from '@yuki/ui/toast'
import { Typography } from '@yuki/ui/typography'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; payload: number }

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const [product] = api.product.getOne.useSuspenseQuery({ id })
  const [quantity, dispatch] = React.useReducer(
    (quantity: number, action: CounterAction) => {
      switch (action.type) {
        case 'INCREMENT':
          return quantity + 1
        case 'DECREMENT':
          return quantity <= 0 ? 0 : quantity - 1
        case 'SET':
          return action.payload < 0 ? 0 : action.payload
        default:
          return quantity
      }
    },
    0,
  )

  const utils = api.useUtils()
  const addToCart = api.cart.updateCart.useMutation({
    onSuccess: async () => {
      await utils.cart.getCart.invalidate()
      await utils.product.getOne.invalidate({ id })
      dispatch({ type: 'SET', payload: 0 })
      toast.success('Item added to cart!')
    },
    onError: (e) => toast.error(e.message),
  })

  return (
    <section className="grid gap-4 md:grid-cols-12">
      <h1 className="sr-only">{product.name}</h1>
      <section className="md:col-span-5">
        <h2 className="sr-only">Product Image Section</h2>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="aspect-square w-full rounded-md object-cover"
        />
      </section>

      <section className="flex max-h-full flex-col md:col-span-7">
        <h2 className="sr-only">Product Information Section</h2>
        <Typography level="h3">{product.name}</Typography>
        <div className="my-4 flex items-center gap-4">
          <StarRating rating={product.rating} />
          <hr className="bg-border h-6 w-0.5" />
          <p>{product.reviews} Reviews</p>
          <hr className="bg-border h-6 w-0.5" />
          <p>{product.sold} Sold</p>
        </div>

        <Typography className="grow">{product.description}</Typography>

        <section className="flex items-center text-lg">
          <h3 className="sr-only">Product Price Section</h3>
          <Typography>${product.price.toFixed(2)}</Typography>
        </section>

        <div className="flex items-center gap-4">
          <span>Quantity:</span>

          <div className="flex items-center rounded-md border">
            <Button
              variant="outline"
              size="icon"
              className="rounded-r-none border-none"
              onClick={() => {
                dispatch({ type: 'DECREMENT' })
              }}
            >
              -
            </Button>
            <input
              className="flex h-9 w-16 items-center justify-center border-x text-center focus-visible:outline-none"
              value={quantity}
              onChange={(e) => {
                dispatch({
                  type: 'SET',
                  payload: (() => {
                    const value = parseInt(e.target.value, 10)
                    if (!isNaN(value)) return value
                    return quantity
                  })(),
                })
              }}
              aria-valuenow={quantity}
            />
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none border-none"
              onClick={() => {
                dispatch({ type: 'INCREMENT' })
              }}
            >
              +
            </Button>
          </div>

          <span className="text-muted-foreground text-xs">
            {product.stock} items available
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 items-center gap-4 md:flex">
          <Button
            variant="outline"
            disabled={quantity <= 0 || quantity > product.stock || addToCart.isPending}
            onClick={() => {
              addToCart.mutate({ productId: product.id, quantity })
            }}
          >
            <ShoppingCartIcon />
            {addToCart.isPending ? 'Adding...' : 'Add to cart'}
          </Button>
          <Button
            disabled={quantity <= 0 || quantity > product.stock || addToCart.isPending}
            onClick={() => {
              addToCart.mutate({ productId: product.id, quantity })
              router.push('/account/cart')
            }}
          >
            Buy now
          </Button>
        </div>
      </section>
    </section>
  )
}

export const ProductDetailsSkeleton: React.FC = () => (
  <section className="grid gap-4 md:grid-cols-12">
    <section className="md:col-span-5">
      <h2 className="sr-only">Product Image Section</h2>
      <div className="aspect-square w-full animate-pulse rounded-md bg-current object-cover" />
    </section>

    <section className="flex max-h-full flex-col md:col-span-7">
      <h2 className="sr-only">Product Information Section</h2>
      <Typography level="h3" className="animate-pulse rounded-md bg-current">
        &nbsp;
      </Typography>
      <div className="my-4 flex items-center gap-4">
        <StarRating rating={0} />
        <hr className="bg-border h-6 w-0.5" />
        <p>0 Reviews</p>
        <hr className="bg-border h-6 w-0.5" />
        <p>0 Sold</p>
      </div>

      <Typography className="w-full grow animate-pulse rounded-md bg-current">
        &nbsp;
      </Typography>

      <section className="flex items-center text-lg">
        <h3 className="sr-only">Product Price Section</h3>
        <Typography className="mb-4 w-1/6 animate-pulse rounded-md bg-current">
          &nbsp;
        </Typography>
      </section>

      <div className="flex items-center gap-4">
        <span>Quantity:</span>

        <div className="flex items-center rounded-md border">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none border-none"
            disabled
          >
            -
          </Button>
          <input
            className="text-muted-foreground flex h-9 w-16 items-center justify-center border-x text-center focus-visible:outline-none"
            value={0}
            disabled
          />
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none border-none"
            disabled
          >
            +
          </Button>
        </div>

        <span className="text-muted-foreground text-xs">0 items available</span>
      </div>

      <div className="mt-4 grid grid-cols-2 items-center gap-4 md:flex">
        <Button variant="outline" disabled>
          <ShoppingCartIcon />
          Add to cart
        </Button>
        <Button disabled>Buy now</Button>
      </div>
    </section>
  </section>
)

export const ProductReviews: React.FC<{ id: string }> = ({ id }) => {
  const [page, setPage] = React.useState<number>(1)
  const [{ reviews, rating, totalPage }] = api.product.getProductReviews.useSuspenseQuery(
    { productId: id, page },
  )

  return (
    <div>
      <StarRating rating={rating} />

      <div className="my-4">
        {reviews.length <= 0 ? (
          <span className="text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </span>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b py-4">
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarImage src={r.user.image} />
                  <AvatarFallback>{r.user.name.at(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <span>{r.user.name}</span>
                  <StarRating rating={r.rating} />
                </div>
              </div>
              <Typography className="pl-11">{r.comment}</Typography>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setPage(Math.max(1, page - 1))
          }}
          disabled={page === 1}
        >
          <ChevronLeftIcon />
        </Button>

        {Array.from({ length: totalPage }).map((_, i) => (
          <Button
            key={i + 1}
            variant="outline"
            size="icon"
            className={page === i + 1 ? 'bg-accent text-accent-foreground' : ''}
            onClick={() => {
              setPage(i + 1)
            }}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setPage(Math.min(totalPage, page + 1))
          }}
          disabled={page === totalPage}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}

export const ProductReviewsSkeleton: React.FC = () => (
  <>
    <StarRating rating={0} />

    <div className="my-4">
      <span className="text-muted-foreground">
        No reviews yet. Be the first to review this product!
      </span>
    </div>
  </>
)

export const RelativeProducts: React.FC<{ id: string }> = ({ id }) => {
  const [relativeProducts] = api.product.getRelativeProducts.useSuspenseQuery({ id })

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
      {relativeProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = []
  const roundedRating = Math.round(rating * 2) / 2

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<Star key={i} className="size-4 fill-yellow-400 stroke-yellow-400" />)
    } else if (i - 0.5 <= roundedRating) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 stroke-yellow-400"
        >
          <defs>
            <linearGradient id="half-fill" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="var(--color-yellow-400)" />
              <stop offset="50%" stopColor="var(--color-background)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half-fill)"
            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
          />
        </svg>,
      )
    } else {
      stars.push(<Star key={i} className="size-4 stroke-yellow-400" />)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="text-muted-foreground ml-2 text-sm">({rating.toFixed(1)})</span>
    </div>
  )
}
