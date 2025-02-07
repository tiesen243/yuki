'use client'

import { useReducer } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@yuki/ui/button'
import { ShoppingCartIcon, Star } from '@yuki/ui/icons'
import { toast } from '@yuki/ui/toast'
import { Typography } from '@yuki/ui/typography'

import { api } from '@/lib/trpc/react'

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; payload: number }

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const [product] = api.product.getOne.useSuspenseQuery({ id })
  const [quantity, dispatch] = useReducer((quantity: number, action: CounterAction) => {
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
  }, 0)

  const addToCart = api.cart.updateCart.useMutation({
    onSuccess: () => {
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
          <p>{product.evaluations} Evaluations</p>
          <hr className="bg-border h-6 w-0.5" />
          <p>{product.sold} Sold</p>
        </div>

        <Typography className="grow">{product.description}</Typography>

        <section className="flex items-center text-lg">
          <h3 className="sr-only">Product Price Section</h3>
          <Typography>${product.price.toFixed(2)}</Typography>
        </section>

        <section className="flex items-center text-lg">
          <h3 className="sr-only">Product Stock Section</h3>
          <Typography>Stock: {product.stock}</Typography>
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
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-2 items-center gap-4 md:flex">
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
          {quantity <= 0 ||
            (quantity > product.stock && (
              <span className="text-muted-foreground text-xs">
                * Quantity must be greater than 0 and less than available stock (
                {product.stock} items available)
              </span>
            ))}
        </div>
      </section>
    </section>
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
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
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
