import Image from 'next/image'

import { StarIcon } from '@yuki/ui/icons'

export function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What our users are saying
          </h2>
          <p className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            Hear from shoppers who have transformed their online shopping
            experience with Yuki.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pt-16 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <div className="text-primary flex gap-0.5">
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                &quot;Yuki has completely changed how I shop online. The
                personalized recommendations are spot on, and I&apos;ve
                discovered so many brands I now love. The checkout process is
                incredibly fast too!&quot;
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-muted rounded-full p-1">
                <Image
                  src="https://github.com/tiesen243.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="size-8 rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Aiko Tanaka</p>
                <p className="text-muted-foreground text-xs">Tokyo, Japan</p>
              </div>
            </div>
          </div>
          <div className="bg-background flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <div className="text-primary flex gap-0.5">
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                &quot;The one-tap checkout has saved me so much time. I used to
                abandon carts because the checkout process was too tedious, but
                with Yuki, I can complete my purchase in seconds.&quot;
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-muted rounded-full p-1">
                <Image
                  src="https://github.com/tiesen243.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="size-8 rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">David Chen</p>
                <p className="text-muted-foreground text-xs">
                  San Francisco, USA
                </p>
              </div>
            </div>
          </div>
          <div className="bg-background flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <div className="text-primary flex gap-0.5">
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
                <StarIcon className="size-5 fill-current" />
              </div>
              <p className="text-muted-foreground">
                &quot;The search functionality is incredible. I can find exactly
                what I&apos;m looking for even when I don&apos;t know the exact
                terms. It&apos;s like the app reads my mind!&quot;
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-muted rounded-full p-1">
                <Image
                  src="https://github.com/tiesen243.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="size-8 rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Sophie Martin</p>
                <p className="text-muted-foreground text-xs">Paris, France</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="bg-background rounded-lg border p-8 shadow-sm">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <div className="grid gap-1">
                <h3 className="text-2xl font-bold">
                  Trusted by leading brands
                </h3>
                <p className="text-muted-foreground">
                  Join hundreds of retailers already using Yuki to enhance their
                  customer experience
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
                <div className="bg-muted/30 h-8 w-24" />
                <div className="bg-muted/30 h-8 w-24" />
                <div className="bg-muted/30 h-8 w-24" />
                <div className="bg-muted/30 h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
