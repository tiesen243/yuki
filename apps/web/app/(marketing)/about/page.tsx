import Image from 'next/image'

import { Card, CardContent, CardHeader } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

import { seo } from '@/lib/seo'

const Page: React.FC = () => (
  <main className="container py-12">
    <Typography level="h1" className="mb-8 text-center">
      About Yuki
    </Typography>

    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="text-pretty">
        <Typography level="h2">Our Story</Typography>
        <Typography color="muted">
          Founded in 2024, Yuki began with a simple mission: to bring high-quality, stylish products
          to fashion-conscious individuals around the world. Our journey started in a small garage
          in SaiGon, Vietnam, with just a handful of products and a big dream.
        </Typography>
        <Typography color="muted">
          Today, we've grown into a global brand, serving customers across Asia, Europe, and North
          America. Despite our growth, we've never lost sight of our core values: quality,
          affordability, and customer satisfaction.
        </Typography>
      </div>
      <div className="relative h-64 md:h-auto">
        <Image
          src="/assets/logo.svg"
          alt="Yuki store front"
          className="object-contain dark:invert"
          fill
        />
      </div>
    </div>

    <Card className="mb-12">
      <CardHeader>
        <Typography level="h2">Our Mission</Typography>
        <Typography color="muted">Empowering individuals through fashion and lifestyle</Typography>
      </CardHeader>
      <CardContent className="text-pretty">
        <Typography color="muted">
          At Yuki, we believe that fashion is more than just clothing—it's a form of
          self-expression. Our mission is to empower individuals to express themselves confidently
          through our carefully curated collection of fashion and lifestyle products. We strive to
          offer trendy, high-quality items at accessible prices, ensuring that everyone can
          participate in the joy of fashion.
        </Typography>
      </CardContent>
    </Card>

    <Typography level="h2" className="border-none">
      Meet Our Team
    </Typography>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {team.map((member) => (
        <Card key={member.name}>
          <CardContent className="pt-6 text-center">
            <div className="mb-4 h-48">
              <Image
                src={member.image}
                alt={member.name}
                className="rounded object-cover object-top"
                fill
              />
            </div>
            <Typography level="h3">{member.name}</Typography>
            <Typography color="muted">{member.role}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="mt-12">
      <CardHeader>
        <Typography level="h2">Our Commitment to Sustainability</Typography>
      </CardHeader>
      <CardContent className="text-pretty">
        <Typography color="muted">
          At Yuki, we're committed to reducing our environmental impact. We're constantly working on
          improving our production processes, using eco-friendly materials, and minimizing waste.
          Our goal is to create beautiful products that not only make you look good but also feel
          good about your purchase.
        </Typography>
        <Typography color="muted">
          We believe that small changes can make a big difference. That's why we've implemented
          recycling programs in our offices and warehouses, and we're exploring ways to make our
          packaging more sustainable. We're on a journey towards sustainability, and we invite our
          customers to join us in this important mission.
        </Typography>
      </CardContent>
    </Card>
  </main>
)

export default Page

export const metadata = seo({
  title: 'About Yuki',
  description:
    'Learn more about Yuki, a global brand that offers high-quality, stylish products to fashion-conscious individuals around the world.',
  url: '/about',
})

const team = [
  {
    name: 'Tran Tien',
    role: 'Founder & CEO',
    image: 'https://avatars.githubusercontent.com/u/101703006',
  },
  {
    name: 'Tien Tran',
    role: 'Head of Design',
    image: 'https://avatars.githubusercontent.com/u/101703006',
  },
  {
    name: 'Trafan Tiesen',
    role: 'Customer Experience Manager',
    image: 'https://avatars.githubusercontent.com/u/101703006',
  },
]
