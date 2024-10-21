import { Marquee } from '@yuki/ui/marquee'

import { ProductMarqueeClient } from './product-marquee.client'

export const ProductMarquee: React.FC = async () => (
  <Marquee>
    <ProductMarqueeClient />
  </Marquee>
)
