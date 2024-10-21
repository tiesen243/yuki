import type { NextPage } from 'next'

import { ProductMarquee } from '@/app/(shop)/_components/home-page/product-marquee'
import { ThreeGridProducts } from '@/app/(shop)/_components/home-page/three-grid-products'
import { CategoryList } from './_components/home-page/category-list'

const Page: NextPage = () => (
  <>
    <ThreeGridProducts />
    <ProductMarquee />
    <CategoryList />
  </>
)

export default Page
