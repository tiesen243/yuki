import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { ProductCardSkeleton } from '@/app/(shop)/_components/product-card'

export const RelatedProductsSkeleton: React.FC = () => (
  <section className="mt-8">
    <Typography level="h3">Related Products</Typography>

    <Marquee>
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCardSkeleton key={i} className="w-96" />
      ))}
    </Marquee>
  </section>
)
