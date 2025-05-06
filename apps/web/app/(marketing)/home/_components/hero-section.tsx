import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, PlayIcon } from 'lucide-react'

import { Button } from '@yuki/ui/button'

import Yuki_1 from '@/public/assets/yuki-1.png'

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden py-20 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
                Introducing Yuki
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Elevate your shopping experience
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover a new way to shop with Yuki. Personalized
                recommendations, seamless checkout, and a beautiful interface
                designed for the modern shopper.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/" className="flex items-center gap-1">
                  <PlayIcon className="h-4 w-4" />
                  <span>Explore the App</span>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo" className="flex items-center gap-1">
                  <span>Watch Demo</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full">
                  <span className="text-xs font-medium">AK</span>
                </div>
                <div className="bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full">
                  <span className="text-xs font-medium">MT</span>
                </div>
                <div className="bg-muted inline-flex h-8 w-8 items-center justify-center rounded-full">
                  <span className="text-xs font-medium">SY</span>
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                Trusted by{' '}
                <span className="text-foreground font-medium">10,000+</span>{' '}
                shoppers worldwide
              </div>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center lg:justify-end">
            <div className="border-muted bg-background relative h-[500px] w-screen rounded-[40px] border-[8px] p-2 shadow-xl md:h-[600px] md:max-w-[560px]">
              <div className="from-primary/20 via-primary/5 to-background absolute inset-0 rounded-[32px] bg-gradient-to-br">
                <Image
                  src={Yuki_1}
                  width={320}
                  height={600}
                  alt="Yuki app screenshot"
                  className="h-full w-full rounded-[32px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="from-primary/20 to-primary/5 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="from-primary/30 to-primary/5 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
}
