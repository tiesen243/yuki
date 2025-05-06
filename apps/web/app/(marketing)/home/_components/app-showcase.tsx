import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import {
  ArrowRightIcon,
  CreditCardIcon,
  HeartIcon,
  SearchIcon,
  ShoppingBagIcon,
} from '@yuki/ui/icons'

import Yuki_2 from '@/public/assets/yuki-2.png'
import Yuki_3 from '@/public/assets/yuki-3.png'

export function AppShowcase() {
  return (
    <section id="showcase" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience shopping reimagined
          </h2>
          <p className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            See how Yuki transforms the way you discover and purchase products
            online.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                <ShoppingBagIcon className="mr-1 h-3.5 w-3.5" />
                <span>Discover</span>
              </div>
              <h3 className="text-2xl font-bold">Curated Collections</h3>
              <p className="text-muted-foreground">
                Browse thoughtfully curated collections based on trends,
                seasons, and your personal style preferences.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                <HeartIcon className="mr-1 h-3.5 w-3.5" />
                <span>Personalize</span>
              </div>
              <h3 className="text-2xl font-bold">Tailored For You</h3>
              <p className="text-muted-foreground">
                The more you shop, the better we understand your preferences,
                creating a shopping experience that&apos;s uniquely yours.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild>
                <Link href="/" className="flex items-center gap-1">
                  <span>Try it yourself</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto flex items-center justify-center">
            <div className="border-muted bg-background relative h-[500px] w-screen rounded-[40px] border-[8px] p-2 shadow-xl md:h-[600px] md:max-w-[660px]">
              <div className="from-primary/20 via-primary/5 to-background absolute inset-0 rounded-[32px] bg-gradient-to-br">
                <Image
                  src={Yuki_2}
                  width={320}
                  height={600}
                  alt="Yuki app browse screen"
                  className="h-full w-full rounded-[32px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2">
          <div className="relative order-2 mx-auto flex items-center justify-center md:order-1">
            <div className="border-muted bg-background relative h-[500px] w-screen rounded-[40px] border-[8px] p-2 shadow-xl md:h-[600px] md:max-w-[660px]">
              <div className="from-primary/20 via-primary/5 to-background absolute inset-0 rounded-[32px] bg-gradient-to-br">
                <Image
                  src={Yuki_3}
                  width={320}
                  height={600}
                  alt="Yuki app checkout screen"
                  className="h-full w-full rounded-[32px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-col justify-center space-y-4 md:order-2">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                <SearchIcon className="mr-1 h-3.5 w-3.5" />
                <span>Find</span>
              </div>
              <h3 className="text-2xl font-bold">Intelligent Search</h3>
              <p className="text-muted-foreground">
                Our advanced search understands what you&apos;re looking for,
                even when you&apos;re not sure how to describe it.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold">
                <CreditCardIcon className="mr-1 h-3.5 w-3.5" />
                <span>Purchase</span>
              </div>
              <h3 className="text-2xl font-bold">One-Tap Checkout</h3>
              <p className="text-muted-foreground">
                Save your payment and shipping details for lightning-fast
                checkout with just a single tap.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild>
                <a href="#download" className="flex items-center gap-1">
                  <span>Download now</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
