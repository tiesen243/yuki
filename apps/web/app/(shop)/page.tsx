import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { CategoryList } from '@/app/(shop)/_components/home-page/category-list'
import { ProductMarquee } from '@/app/(shop)/_components/home-page/product-marquee'
import { ThreeGridProducts } from '@/app/(shop)/_components/home-page/three-grid-products'

const Page: React.FC = () => (
  <>
    <Typography level="h1" className="mb-6 text-center">
      Welcome to the Yuki Shop
    </Typography>

    <Typography level="h2">New Arrivals</Typography>
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-10 lg:grid-rows-2">
      <ThreeGridProducts />
    </div>
    <Marquee className="mb-4">
      <ProductMarquee />
    </Marquee>

    <Typography level="h2">Explore by Category</Typography>
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <CategoryList />
    </div>
  </>
)

export default Page
