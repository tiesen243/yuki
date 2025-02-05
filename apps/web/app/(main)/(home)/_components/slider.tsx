'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { cn } from '@yuki/ui/utils'

import Hero1 from '@/public/assets/imgs/hero-1.png'
import Hero2 from '@/public/assets/imgs/hero-2.png'
import Hero3 from '@/public/assets/imgs/hero-3.png'

const slides = [
  {
    id: 0,
    title: 'Summer Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: Hero1,
    bg: 'bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900 dark:to-pink-900',
  },
  {
    id: 1,
    title: 'Winter Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: Hero2,
    bg: 'bg-gradient-to-r from-pink-50 to-blue-50 dark:from-pink-900 dark:to-blue-900',
  },
  {
    id: 2,
    title: 'Spring Sale Collections',
    description: 'Sale! Up to 50% off!',
    img: Hero3,
    bg: 'bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900 dark:to-yellow-900',
  },
]

export const Slider: React.FC = () => {
  const [current, setCurrent] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => {
      clearInterval(interval)
    }
  }, [current])

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
            <div className="flex h-1/2 flex-col items-center justify-center gap-8 text-center text-balance xl:h-full xl:w-1/2 xl:gap-12">
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
              className="h-1/2 w-full object-cover xl:h-full xl:w-1/2"
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
