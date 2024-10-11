import type { NextPage } from 'next'

import { ProductMarquee } from './_components/home/product-marquee'
import { ThreeGridProducts } from './_components/home/three-grid-products'

const Page: NextPage = () => (
  <>
    <ThreeGridProducts />
    <ProductMarquee />
  </>
)

export default Page
