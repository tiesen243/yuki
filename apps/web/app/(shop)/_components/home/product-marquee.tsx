import { Marquee } from '@yuki/ui/marquee'
import { Skeleton } from '@yuki/ui/skeleton'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/server'

export const ProductMarquee: React.FC = async () => {
  const products = await api.product.getAll({ limit: 13 }).then((res) => res.slice(3, 14))

  return (
    <Marquee>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="w-80" />
      ))}
    </Marquee>
  )
}

export const ProductMarqueeSkeleton: React.FC = () => (
  <Marquee>
    {Array.from({ length: 10 }).map((_, i) => (
      <Skeleton key={i} className="aspect-square w-80" />
    ))}
  </Marquee>
)
