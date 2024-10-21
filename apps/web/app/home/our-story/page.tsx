import type { NextPage } from 'next'
import Image from 'next/image'

import { cn } from '@yuki/ui'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { BookOpenIcon, HeartIcon, LightbulbIcon, RocketIcon, UsersIcon } from '@yuki/ui/icons'

import { seo } from '@/lib/seo'

const Page: NextPage = () => (
  <main className="container flex-1 py-6">
    {/* Hero Section */}
    <section className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Our Journey in Revolutionizing E-commerce</h1>
      <p className="mb-6 text-xl text-muted-foreground">
        From a small startup to a global platform, discover the story behind our success.
      </p>
    </section>

    {/* Timeline Section */}
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-semibold">Our Journey</h2>
      <div>
        {[
          {
            year: '2010',
            title: 'The Beginning',
            description: 'Founded in a small garage with a big dream.',
          },
          {
            year: '2013',
            title: 'First Major Milestone',
            description: 'Reached 100,000 active users on our platform.',
          },
          {
            year: '2016',
            title: 'Going Global',
            description: 'Expanded operations to 10 countries worldwide.',
          },
          {
            year: '2019',
            title: 'Innovation Award',
            description: 'Recognized for our AI-powered recommendation engine.',
          },
          {
            year: '2022',
            title: 'Sustainability Initiative',
            description: 'Launched our eco-friendly packaging program.',
          },
        ].map((event, index) => (
          <div key={index} className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {index + 1}
              </div>
              {index < 4 && <div className="h-full w-px bg-border" />}
            </div>
            <Card className={cn('w-full', index < 4 && 'mb-8')}>
              <CardHeader>
                <CardTitle>
                  {event.year}: {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>

    {/* Mission and Values Section */}
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-semibold">Our Mission & Values</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: RocketIcon,
            title: 'Innovation',
            description: "Constantly pushing the boundaries of what's possible in e-commerce.",
          },
          {
            icon: UsersIcon,
            title: 'Customer-Centric',
            description: 'Putting our customers first in everything we do.',
          },
          {
            icon: HeartIcon,
            title: 'Integrity',
            description: 'Operating with honesty and transparency in all our dealings.',
          },
          {
            icon: LightbulbIcon,
            title: 'Creativity',
            description: 'Encouraging fresh ideas and unique solutions.',
          },
          {
            icon: BookOpenIcon,
            title: 'Continuous Learning',
            description: 'Always striving to improve and adapt to new challenges.',
          },
        ].map((value, index) => (
          <Card key={index}>
            <CardHeader>
              <value.icon className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* Team Section */}
    <section className="mb-16">
      <h2 className="mb-8 text-center text-3xl font-semibold">Meet Our Leadership</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Tiesen', role: 'CEO & Founder' },
          { name: 'Tran Tien', role: 'CTO' },
          { name: 'Tien Tran', role: 'COO' },
          { name: 'Yukikaze', role: 'CMO' },
        ].map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <Image
                src="https://avatars.githubusercontent.com/u/101703006"
                alt={member.name}
                width={200}
                height={200}
                className="mx-auto mb-4 rounded-full"
              />
              <CardTitle className="text-center">{member.name}</CardTitle>
              <CardDescription className="text-center">{member.role}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="mb-12 text-center">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Join Us in Shaping the Future of E-commerce</CardTitle>
          <CardDescription>
            Be part of our exciting journey and help us revolutionize online shopping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" asChild>
            <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              View Career Opportunities
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  </main>
)

export default Page

export const metadata = seo({
  title: 'Our Story',
  description:
    'Discover the journey behind our success and learn more about our mission and values.',
  images: [
    '/api/og?title=Our%20Story&description=Discover%20the%20journey%20behind%20our%20success%20and%20learn%20more%20about%20our%20mission%20and%20values.',
  ],
  url: '/home/our-story',
})
