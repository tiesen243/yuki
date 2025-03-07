'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

import { useTRPC } from '@/lib/trpc/react'
import ProductCard, { ProductCardSkeleton } from './_components/product-card'

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
    <section className="relative h-[calc(100dvh-4rem)] w-screen overflow-hidden">
      <div className="flex h-full w-max">
        {slides.map((s) => (
          <div
            key={s.id}
            className={cn(
              'flex h-full w-screen flex-col gap-16 transition-transform duration-500 ease-linear xl:flex-row',
              s.bg,
            )}
            style={{ transform: `translateX(-${current * 100}vw)` }}
          >
            <div className="flex h-1/3 flex-col items-center justify-center gap-8 text-center text-balance xl:h-full xl:w-1/2 xl:gap-12">
              <Typography variant="h2">{s.description}</Typography>
              <Typography variant="h1">{s.title}</Typography>

              <Button size="lg" asChild>
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>

            <Image
              src={s.img}
              alt={s.title}
              width={800}
              height={1200}
              className="mx-auto basis-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 z-10 flex w-full items-center justify-center gap-6">
        {slides.map((s) => (
          <div
            key={s.id}
            className={cn(
              'ring-muted-foreground ring-offset-ring flex size-3 cursor-pointer items-center justify-center rounded-full ring-1 ring-offset-2 transition-all duration-500 ease-linear',
              { 'bg-muted-foreground scale-110': current === s.id },
            )}
            onClick={() => {
              setCurrent(s.id)
            }}
          />
        ))}
      </div>
    </section>
  )
}

export const ProductList: React.FC = () => {
  const trpc = useTRPC()
  const {
    data: { products },
  } = useSuspenseQuery(trpc.product.getAll.queryOptions({ limit: 12 }))

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} discount={15} />
      ))}
    </div>
  )
}
