import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function AboutPage() {
  return (
    <main className="container space-y-12 py-16">
      {/* Hero Section */}
      <div className="space-y-4 text-center">
        <Typography level="h1">About Yuki</Typography>
        <p className="text-muted-foreground text-xl">
          Bringing quality products to your doorstep since {new Date().getFullYear()}.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          At Yuki, we&apos;re committed to providing exceptional shopping experiences
          through carefully curated products, outstanding customer service, and seamless
          delivery. Our goal is to make quality products accessible to everyone.
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Quality First',
            description:
              'We carefully select each product to ensure the highest quality standards.',
          },
          {
            title: 'Customer Focus',
            description:
              'Your satisfaction is our top priority, with 24/7 customer support.',
          },
          {
            title: 'Sustainability',
            description:
              "We're committed to eco-friendly practices and sustainable packaging.",
          },
        ].map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <CardTitle className="text-xl">{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Typography level="h2">Our Team</Typography>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              image:
                'https://gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?s=96',
              title: 'Tiesen',
              position: 'Founder & CEO',
            },
            {
              image:
                'https://gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?s=96',
              title: 'Tran Tien',
              position: 'Lead Developer',
            },
            {
              image:
                'https://gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?s=96',
              title: 'Your mom',
              position: 'Accountant',
            },
            {
              image:
                'https://gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?s=96',
              title: "Tiesen's junior",
              position: 'Marketing',
            },
          ].map((member) => (
            <Card key={member.title}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.image} alt={member.title} />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center">
                    <h3 className="font-medium">{member.title}</h3>
                    <p className="text-muted-foreground text-sm">{member.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'About us',
  description: 'Learn more about Yuki.',
  openGraph: {
    images: `/api/og?title=${encodeURIComponent('About us')}&description=${encodeURIComponent('Learn more about Yuki.')}`,
    url: '/about',
  },
})
