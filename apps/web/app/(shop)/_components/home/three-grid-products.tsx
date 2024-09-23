import { Skeleton } from '@yuki/ui/skeleton'

import { ProductCard } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/server'

export const ThreeGridProducts: React.FC = async () => {
  const { products } = await api.product.getAll({ limit: 3 })

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          className={idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}
        />
      ))}
    </div>
  )
}

export const ThreeGridProductsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton
        key={i}
        className={`${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} aspect-square`}
      />
    ))}
  </div>
)
