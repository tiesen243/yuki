import { api } from '@/lib/trpc/server'
import { ProductCard } from '../_components/product-card'
import { Slider } from './page.client'

export default async function IndexPage() {
  const { products } = await api.product.all({ limit: 12 })

  return (
    <main className="grow space-y-4 pb-4">
      <section>
        <h2 className="sr-only">Featured Products</h2>
        <Slider />
      </section>

      <section className="container grid grid-cols-1 gap-4 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4">
        <h2 className="sr-only">Products</h2>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}
