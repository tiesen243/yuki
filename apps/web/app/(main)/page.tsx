import { api } from '@/lib/trpc/server'
import { ProductCard } from '../_components/product-card'

export default async function IndexPage() {
  const { products } = await api.product.all({ limit: 12 })

  return (
    <main className="container grow space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
