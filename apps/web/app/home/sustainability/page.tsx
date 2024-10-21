import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { Leaf, Recycle, ShoppingBag, TreePine, Truck, Users } from '@yuki/ui/icons'

import { seo } from '@/lib/seo'

const Page: NextPage = () => {
  return (
    <main className="container flex-1 py-6">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Committed to a Sustainable Future</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Discover how we're reducing our environmental impact and promoting sustainable shopping.
        </p>
        <Button size="lg" asChild>
          <a href="https://youtu.be/qWNQUvIk954" target="_blank" rel="noopener noreferrer">
            Learn More About Our Initiatives
          </a>
        </Button>
      </section>

      {/* Key Initiatives Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Our Sustainability Initiatives</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Leaf,
              title: 'Eco-Friendly Packaging',
              description: '100% recyclable and biodegradable packaging materials',
            },
            {
              icon: Recycle,
              title: 'Product Recycling Program',
              description: 'Easy returns for proper recycling of old products',
            },
            {
              icon: Truck,
              title: 'Carbon-Neutral Shipping',
              description: 'Offsetting all shipping-related carbon emissions',
            },
            {
              icon: ShoppingBag,
              title: 'Sustainable Product Lines',
              description: 'Curated selection of eco-friendly and ethically produced items',
            },
            {
              icon: Users,
              title: 'Community Engagement',
              description: 'Local environmental initiatives and education programs',
            },
            {
              icon: TreePine,
              title: 'Reforestation Project',
              description: 'Planting a tree for every 100 orders placed',
            },
          ].map((initiative, index) => (
            <Card key={index}>
              <CardHeader>
                <initiative.icon className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>{initiative.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{initiative.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Our Environmental Impact</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Carbon Footprint Reduction', current: 75, target: 100, unit: 'tons' },
            { title: 'Renewable Energy Usage', current: 60, target: 100, unit: '%' },
            { title: 'Waste Reduction', current: 40, target: 50, unit: 'tons' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={(stat.current / stat.target) * 100} />
                  <p className="text-sm text-muted-foreground">
                    {stat.current} out of {stat.target} {stat.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sustainable Product Categories */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Shop Sustainably</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Eco-Fashion', image: '/tiesen-v1.png' },
            { title: 'Green Home', image: '/goldenglow.png' },
            { title: 'Sustainable Beauty', image: '/lin-yushia.png' },
            { title: 'Ethical Electronics', image: '/tiesen-v2.png' },
          ].map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={`https://tiesen.id.vn/assets/design/${category.image}`}
                alt={category.title}
                width={300}
                height={200}
                className="h-40 w-full object-cover"
              />
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Shop Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Customer Participation Section */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Join Our Sustainability Efforts</CardTitle>
            <CardDescription>
              Small actions can make a big difference. Here's how you can contribute:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>Opt for eco-friendly shipping options at checkout</li>
              <li>Participate in our product recycling program</li>
              <li>Choose products from our sustainable collections</li>
              <li>Reduce packaging waste by selecting minimal packaging options</li>
              <li>Share your sustainability story and inspire others</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Future Goals Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Our Commitments for the Future</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { year: '2025', goal: 'Achieve 100% renewable energy in all operations' },
            { year: '2027', goal: 'Eliminate single-use plastics from our supply chain' },
            { year: '2030', goal: 'Reach carbon neutrality across our entire business' },
            {
              year: '2035',
              goal: 'Ensure 100% of products are recyclable, reusable, or compostable',
            },
          ].map((commitment, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{commitment.year} Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{commitment.goal}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="mb-4 text-3xl font-semibold">Together, We Can Make a Difference</h2>
        <p className="mb-6 text-xl text-muted-foreground">
          Join us in our mission to create a more sustainable future through conscious shopping.
        </p>
        <Button size="lg" asChild>
          <Link href="/">Explore Sustainable Products</Link>
        </Button>
      </section>
    </main>
  )
}

export default Page

export const metadata = seo({
  title: 'Sustainability',
  description:
    "Discover how we're reducing our environmental impact and promoting sustainable shopping.",
  images: [
    '/api/og?title=Sustainability&description=Discover%20how%20we%27re%20reducing%20our%20environmental%20impact%20and%20promoting%20sustainable%20shopping.',
  ],
  url: '/home/sustainability',
})

const Progress = ({ value }: { value: number }) => {
  return (
    <div className="relative h-2 rounded bg-secondary">
      <div
        className="absolute left-0 top-0 h-full rounded bg-primary"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
