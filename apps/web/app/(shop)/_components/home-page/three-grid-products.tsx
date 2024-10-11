import { api, HydrateClient } from '@/lib/trpc/server'
import { ThreeGridProductsClient } from './three-grid-products.client'

export const ThreeGridProducts: React.FC = async () => {
  void api.product.getAll.prefetch({ limit: 3 })

  return (
    <HydrateClient>
      <ThreeGridProductsClient />
    </HydrateClient>
  )
}
