import { Button } from '@yuki/ui/button'
import { Card, CardHeader } from '@yuki/ui/card'
import { ChevronRightIcon, ShoppingCartIcon, StarIcon } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Typography } from '@yuki/ui/typography'

import { faqs, features, reviews, techStacks } from '@/app/(marketing)/_data/home'
import { getDashboardUrl } from '@/lib/utils'

const Page: React.FC = () => (
  <main className="scroll-smooth">
    <section
      id="hero"
      className="flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden text-balance text-center"
    >
      <div className="pointer-events-none relative flex place-items-center before:absolute before:h-[700px] before:w-[140px] before:translate-x-1 before:translate-y-[-10px] before:rotate-[-32deg] before:rounded-full before:bg-gradient-to-r before:from-[#AB1D1C] before:to-[#E18317] before:opacity-30 before:blur-[100px] before:content-[''] lg:before:h-[700px] lg:before:w-[240px] lg:before:translate-x-[-100px]" />

      <Typography level="h1" className="text-6xl md:text-7xl lg:text-8xl">
        Price Cheaper, Quality Better!
      </Typography>
      <Typography className="max-w-screen-xl text-xl lg:text-3xl">
        We are a team of passionate people whose goal is to improve everyone's life through
        disruptive products. We build great products to solve your business problems.
      </Typography>

      <div className="mt-6 flex items-center justify-center gap-6">
        <Button asChild>
          <a href={`${getDashboardUrl()}/sign-up`}>
            Get Started for Free <ChevronRightIcon size={16} />
          </a>
        </Button>

        <Button variant="outline" asChild>
          <a href="/">
            Shop Now <ShoppingCartIcon size={16} />
          </a>
        </Button>
      </div>
    </section>

    <section id="features" className="container py-20">
      <Typography level="h2" className="border-none">
        Features
      </Typography>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <Card key={idx}>
            <CardHeader>
              <Typography level="h3" className="flex items-center gap-4">
                <feature.icon /> {feature.title}
              </Typography>
              <Typography>{feature.description}</Typography>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>

    <section id="tech-stack" className="container py-20">
      <Typography level="h2" className="border-none">
        Tech Stack
      </Typography>

      <div className="grid gap-4 md:grid-cols-3">
        {techStacks.map((tech, idx) => (
          <a
            key={idx}
            href={tech.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <CardHeader>
              <Typography level="h3" className="flex items-center gap-4">
                <tech.Icon /> {tech.title}
              </Typography>
              <Typography>{tech.description}</Typography>
            </CardHeader>
          </a>
        ))}
      </div>
    </section>

    <section id="reviews" className="container py-20">
      <Typography level="h2" className="border-none">
        Reviews
      </Typography>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex gap-4">
                <Typography level="h3">{review.name}</Typography>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <StarIcon key={idx} size={20} />
                  ))}
                </div>
              </div>
              <Typography>{review.review}</Typography>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>

    <section id="faq" className="container py-20">
      <Typography level="h2" className="border-none">
        FAQ
      </Typography>

      <div className="grid gap-4">
        {faqs.map((faq, idx) => (
          <Card key={idx}>
            <CardHeader>
              <Typography level="h3">{faq.question}</Typography>
              <Typography>{faq.answer}</Typography>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>

    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Yuki Today</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sign up for our newsletter to receive updates and special offers.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
)

export default Page
