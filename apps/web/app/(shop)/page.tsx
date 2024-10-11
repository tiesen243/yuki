import type { NextPage } from 'next'

import { ProductMarquee } from '@/app/(shop)/_components/home-page/product-marquee'
import { ThreeGridProducts } from '@/app/(shop)/_components/home-page/three-grid-products'

const Page: NextPage = () => (
  <>
    <ThreeGridProducts />
    <ProductMarquee />
  </>
)

export default Page
