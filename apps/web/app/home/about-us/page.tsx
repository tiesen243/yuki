import type { NextPage } from 'next'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'

import { seo } from '@/lib/seo'
import { techStacks } from './_data'
import { TechCard } from './_tech-card'

const Page: NextPage = () => (
  <main className="container py-8">
    <h1 className="mb-8 text-center text-4xl font-bold">About Yuki</h1>

    <div className="mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Yuki</CardTitle>
          <CardDescription>Your Ultimate E-Commerce Experience</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Yuki is a cutting-edge, full-stack e-commerce platform designed to provide a seamless
            shopping experience. Built with the latest technologies, Yuki offers robust features,
            lightning-fast performance, and top-notch security.
          </p>
        </CardContent>
      </Card>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Our Tech Stack</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {techStacks.map((tech) => (
          <TechCard key={tech.title} {...tech} />
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Join the Yuki Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            We&apos;re always looking to improve and expand Yuki. Whether you&apos;re a shopper,
            seller, or developer, we&apos;d love to hear from you!
          </p>
          <Button asChild>
            <a href="https://tiesen.id.vn" target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  </main>
)

export default Page

export const metadata = seo({
  title: 'About Us',
  description: 'Learn more about Yuki, the ultimate e-commerce platform.',
  images: [
    '/api/og?title=About%20Us&description=Learn%20more%20about%20Yuki%2C%20the%20ultimate%20e-commerce%20platform.',
  ],
  url: '/home/about-us',
})
