'use client'

import { Marquee } from '@yuki/ui/marquee'

import { ProductCard } from '@/app/(shop)/_components/product-card'
import { api } from '@/lib/trpc/react'

export const ProductMarqueeClient: React.FC = () => {
  const [{ products }] = api.product.getAll.useSuspenseQuery({ limit: 10 })

  return (
    <Marquee>
      {products.slice(3, 11).map((product) => (
        <ProductCard key={product.id} product={product} className="w-80" />
      ))}
    </Marquee>
  )
}
