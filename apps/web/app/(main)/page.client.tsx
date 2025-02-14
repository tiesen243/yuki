'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

import { CategoryCard, CategoryCardSkeleton } from '@/app/_components/category-card'
import { ProductCard, ProductCardSkeleton } from '@/app/_components/product-card'
import { api } from '@/lib/trpc/react'

export const Slider: React.FC<{
  slides: {
    id: number
    title: string
    description: string
    img: string
    bg: string
  }[]
}> = ({ slides }) => {
  const [current, setCurrent] = React.useState<number>(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [current, slides.length])

  return (
    <section className="h-[calc(100dvh-5rem)] w-screen overflow-hidden">
      <div className="flex h-full w-max">
        {slides.map((s) => (
          <div
            key={s.id}
            className={cn(
              'flex h-full w-screen flex-col gap-16 transition-transform duration-1000 ease-in-out xl:flex-row',
              s.bg,
            )}
            style={{ transform: `translateX(-${current * 100}vw)` }}
          >
            <div className="flex h-1/3 flex-col items-center justify-center gap-8 text-center text-balance md:h-1/2 xl:h-full xl:w-1/2 xl:gap-12">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{s.description}</h2>
              <h1 className="text-5xl font-semibold lg:text-6xl 2xl:text-8xl">
                {s.title}
              </h1>
              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>

            <Image
              src={s.img}
              alt={s.title}
              width={800}
              height={1200}
              className="h-2/3 w-full object-cover md:h-1/2 xl:h-full xl:w-1/2"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 z-10 flex w-full items-center justify-center gap-6">
        {slides.map((s) => (
          <div
            key={s.id}
            className={cn(
              'ring-muted-foreground flex size-3 cursor-pointer items-center justify-center rounded-full ring-1 transition-transform duration-300 ease-in-out',
              { 'scale-150': current === s.id },
            )}
            onClick={() => {
              setCurrent(s.id)
            }}
          >
            {current === s.id && (
              <div className="bg-muted-foreground size-1.5 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export const ProductList: React.FC = () => {
  const [{ products }] = api.product.getAll.useSuspenseQuery({})

  return (
    <section className="container grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Typography level="h2" className="col-span-3 md:col-span-4 lg:col-span-6">
        New Arrivals
      </Typography>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export const ProductListSkeleton: React.FC = () => (
  <section className="container grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    <Typography level="h2" className="col-span-3 md:col-span-4 lg:col-span-6">
      New Arrivals
    </Typography>

    {Array.from({ length: 12 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </section>
)

export const CategoryList: React.FC = () => {
  const [categories] = api.category.getAll.useSuspenseQuery({})
  return (
    <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
      <Typography level="h2" className="col-span-2 md:col-span-4">
        Categories
      </Typography>

      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  )
}

export const CategoryListSkeleton: React.FC = () => (
  <section className="container grid grid-cols-2 gap-4 md:grid-cols-4">
    <Typography level="h2" className="col-span-2 md:col-span-4">
      Categories
    </Typography>

    {Array.from({ length: 6 }).map((_, i) => (
      <CategoryCardSkeleton key={i} />
    ))}
  </section>
)
