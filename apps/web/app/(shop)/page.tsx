import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { ChevronRightIcon } from '@yuki/ui/icons'
import { Marquee } from '@yuki/ui/marquee'
import { Typography } from '@yuki/ui/typography'

import { CategoryList } from '@/app/(shop)/_components/home-page/category-list'
import { ProductMarquee } from '@/app/(shop)/_components/home-page/product-marquee'
import { ThreeGridProducts } from '@/app/(shop)/_components/home-page/three-grid-products'

const Page: React.FC = () => (
  <main className="container flex flex-col gap-6 py-4">
    <Typography level="h1" className="text-center">
      Welcome to the Yuki Shop
    </Typography>

    <Typography level="h2">New Arrivals</Typography>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-10 lg:grid-rows-2">
      <ThreeGridProducts />
    </div>
    <Marquee>
      <ProductMarquee />
    </Marquee>

    <Button variant="outline" className="mx-auto" asChild>
      <Link href="/p">
        View All Products <ChevronRightIcon />
      </Link>
    </Button>

    <Typography level="h2">Explore by Category</Typography>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <CategoryList />
    </div>
  </main>
)

export default Page
