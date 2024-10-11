import { api, HydrateClient } from '@/lib/trpc/server'
import { ProductMarqueeClient } from './product-marquee.client'

export const ProductMarquee: React.FC = async () => {
  void api.product.getAll.prefetch({ limit: 10 })

  return (
    <HydrateClient>
      <ProductMarqueeClient />
    </HydrateClient>
  )
}
