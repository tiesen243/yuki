import type { NextPage } from 'next'

import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { ThreeGridProducts } from '@/app/(shop)/_components/home-page/three-grid-products'
import { CategoryList } from './_components/home-page/category-list'
import { ProductMarquee } from './_components/home-page/product-marquee'

const Page: NextPage = () => (
  <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-7 md:grid-rows-2">
      <ThreeGridProducts />
    </div>
    <Marquee>
      <ProductMarquee />
    </Marquee>
    <section className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Typography level="h2" className="col-span-2 md:col-span-4">
        Explore Categories
      </Typography>

      <CategoryList />
    </section>
  </>
)

export default Page
