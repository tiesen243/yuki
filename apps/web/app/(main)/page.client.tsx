'use client'

import * as React from 'react'
import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'

import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'
import { cn } from '@yuki/ui/utils'

import { ProductCard } from '@/app/_components/product-card'
import { useTRPC } from '@/lib/trpc/react'

export const Slider: React.FC = () => {
  const sliders = [
    {
      id: 1,
      title: 'Summer Sale Collections',
      description: 'Sale up to 50% off',
      imageUrl: '/assets/images/hero-2.png',
      bgColor: 'from-success to-destructive',
    },
    {
      id: 2,
      title: 'Atumn Sale Collections',
      description: 'Sale up to 50% off',
      imageUrl: '/assets/images/hero-1.png',
      bgColor: 'from-destructive to-info',
    },
    {
      id: 3,
      title: 'Winter Sale Collections',
      description: 'Sale up to 50% off',
      imageUrl: '/assets/images/hero-4.png',
      bgColor: 'from-info to-warning',
    },
    {
      id: 4,
      title: 'Spring Sale Collections',
      description: 'Sale up to 50% off',
      imageUrl: '/assets/images/hero-3.png',
      bgColor: 'from-warning to-success',
    },
  ]

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const defferredCurrentSlide = React.useDeferredValue(currentSlide)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [sliders.length])

  return (
    <div className="relative h-[800px] w-screen overflow-hidden md:h-[500px]">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-linear"
        style={{ transform: `translateX(-${defferredCurrentSlide * 100}%)` }}
      >
        {sliders.map((slider) => (
          <div
            key={slider.id}
            className={cn(
              'flex h-full w-full shrink-0 flex-col gap-6 bg-gradient-to-br md:flex-row',
              slider.bgColor,
            )}
          >
            <div className="flex grow flex-col items-center justify-center gap-4 p-4">
              <Typography variant="h3" className="text-secondary text-center">
                {slider.description}
              </Typography>
              <Typography variant="h2" className="text-center">
                {slider.title}
              </Typography>

              <Button>Shop Now</Button>
            </div>

            <Image
              src={slider.imageUrl}
              alt={slider.title}
              width={600}
              height={500}
              className="h-full w-full object-cover md:h-[500px] md:w-[600px]"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        {Array.from({ length: sliders.length }, (_, idx) => (
          <button
            key={idx}
            className={cn(
              'ring-ring size-2.5 rounded-full ring-2',
              defferredCurrentSlide === idx ? 'bg-white' : 'bg-transparent',
              'transition-colors duration-200 ease-in-out',
            )}
            onClick={() => {
              setCurrentSlide(idx)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const ProductList: React.FC = () => {
  const { trpc } = useTRPC()
  const {
    data: { products },
  } = useSuspenseQuery(trpc.product.all.queryOptions({ limit: 12 }))

  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
}
