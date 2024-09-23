import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { CreditCard, RotateCcw, ShoppingCart, Truck } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

import { getBaseUrl, getDashboardUrl } from '@/lib/utils'

const Page: NextPage = () => (
  <main>
    <section className="container flex min-h-dvh max-w-screen-lg flex-col items-center justify-center overflow-x-hidden">
      <div className="pointer-events-none relative flex place-items-center before:absolute before:h-[700px] before:w-[140px] before:translate-x-1 before:translate-y-[-10px] before:rotate-[-32deg] before:rounded-full before:bg-gradient-to-r before:from-[#AB1D1C] before:to-[#E18317] before:opacity-30 before:blur-[100px] before:content-[''] lg:before:h-[700px] lg:before:w-[240px] lg:before:translate-x-[-100px]" />

      <article>
        <Typography
          level="h1"
          className="w-fit bg-[linear-gradient(135deg,#ec4251,69%,#f6991a)] bg-clip-text text-transparent"
        >
          Yuki
        </Typography>

        <Typography level="h2" className="mt-4 border-none brightness-150">
          A full-stack e-commerce app built with{' '}
          <span className="bg-[linear-gradient(135deg,#EF4444,69%,hsl(var(--background)))] bg-clip-text text-transparent">
            Turborepo
          </span>{' '}
          along with{' '}
          <span className="bg-[linear-gradient(135deg,#e18317,69%,hsl(var(--background)))] bg-clip-text text-transparent">
            Next.js
          </span>{' '}
          and{' '}
          <span className="bg-[linear-gradient(135deg,#2596BE,69%,hsl(var(--background)))] bg-clip-text text-transparent">
            tRPC
          </span>
        </Typography>

        <Typography className="text-lg">
          It is a modern, fast, and secure platform that allows you to create your own e-commerce
          store with ease. Yuki is built with the latest technologies and best practices to ensure
          that your store is fast, secure, and scalable.{' '}
        </Typography>
      </article>

      <div className="mt-6 flex items-center gap-8">
        <Button asChild>
          <a href={`${getDashboardUrl()}/sign-in?redirect=${getBaseUrl()}`}>Get Started</a>
        </Button>

        <Button variant="outline" asChild>
          <Link href="/home/about-us">Learn More</Link>
        </Button>
      </div>
    </section>

    <section className="w-full bg-secondary/80 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Our Features
        </h2>

        <div className="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-2 rounded-lg border-gray-200 p-4"
            >
              <feature.icon className="h-10 w-10 text-[#ec4251]" />
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container grid w-full py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
        >
          <source src="https://tiesen.id.vn/assets/yuki.webm" type="video/webm" />
        </video>
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Experience Shopping Like Never Before
            </h2>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our e-commerce platform offers a seamless shopping experience with a user-friendly
              interface, personalized recommendations, and exclusive deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default Page

const features = [
  {
    icon: ShoppingCart,
    title: 'Wide Selection',
    description: 'Thousands of products to choose from',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your items delivered quickly',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Your transactions are always safe',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free return policy',
  },
]
