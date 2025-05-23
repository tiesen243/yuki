'use client'

import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'

import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { ShoppingCartIcon } from '@yuki/ui/icons'
import { toast } from '@yuki/ui/sonner'

import { useTRPC } from '@/lib/trpc/react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    createdAt: Date
  }
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { trpc, queryClient } = useTRPC()
  const { mutate, isPending } = useMutation({
    ...trpc.cart.addItem.mutationOptions(),
    onError: (error) => toast.error(error.message),
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.cart.getCart.queryFilter())
      toast.success('Item added to cart', {
        action: {
          label: 'View Cart',
          onClick: () => (window.location.href = '/profile/cart'),
        },
      })
    },
  })

  const isNew =
    product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  return (
    <Card className="h-full overflow-hidden py-4 pt-0 transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
        {isNew && (
          <Badge variant="info" className="absolute top-2 right-2">
            New
          </Badge>
        )}
      </div>

      <CardHeader className="px-4">
        <CardTitle className="line-clamp-1 text-lg">{product.name}</CardTitle>
        <span className="font-bold">${product.price}</span>
      </CardHeader>

      <CardContent className="px-4">
        <CardDescription className="line-clamp-1">
          {product.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="px-4">
        <Button
          className="w-full"
          disabled={isPending}
          onClick={() => {
            mutate({ productId: product.id, quantity: 1 })
          }}
        >
          <ShoppingCartIcon /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
