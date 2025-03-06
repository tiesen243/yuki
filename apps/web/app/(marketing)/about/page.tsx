import { Password } from '@yuki/auth'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@yuki/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function AboutPage() {
  const gravatarHash = new Password().hashWithoutSalt('ttien56906@gmail.com')

  return (
    <main className="container space-y-12 py-16">
      <div className="space-y-4 text-center">
        <Typography variant="h1">About Yuki</Typography>
        <p className="text-muted-foreground text-xl">
          Our mission is to empower businesses with intuitive software solutions
          that drive growth and innovation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          <p className="mb-4">
            Founded in 2018, Yuki began with a simple vision: to create software
            that feels human. Our founders, experienced developers frustrated by
            overly complex tools, set out to build solutions that combine
            powerful functionality with intuitive design.
          </p>
          <p>
            What started as a small team of three passionate engineers in a
            co-working space has grown into a global company with offices in
            four countries and a team of over 50 dedicated professionals.
            Throughout our journey, we&apos;ve remained committed to our core
            belief that technology should simplify, not complicate, the lives of
            its users.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To empower businesses with intuitive software solutions that drive
              growth and innovation while maintaining the human touch in digital
              experiences.
            </p>
            <p className="text-muted-foreground">
              We believe that technology should be an enabler, not a barrier. By
              creating tools that are both powerful and accessible, we help
              organizations of all sizes achieve their goals and realize their
              full potential.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p className="mb-4">
              We envision a world where technology seamlessly integrates into
              everyday business operations, where complex problems find elegant
              solutions, and where innovation is accessible to everyone.
            </p>
            <p>
              By 2025, we aim to be the leading provider of user-centric
              software solutions across five key industries, known for both
              technical excellence and exceptional user experience.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Typography variant="h2" className="text-center">
          Our Core Values
        </Typography>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Simplicity',
              description:
                'We believe in elegant solutions to complex problems. Our products strip away unnecessary complexity to deliver experiences that are intuitive and efficient.',
            },
            {
              title: 'User-Centric',
              description:
                'Every decision we make starts with our users. We continuously seek feedback, observe behavior, and iterate to ensure our products truly serve the needs of the people who use them.',
            },
            {
              title: 'Innovation',
              description:
                'We push boundaries and challenge conventions. By staying curious and embracing new technologies, we create forward-thinking solutions that anticipate future needs.',
            },
            {
              title: 'Transparency',
              description:
                'We maintain open communication with our team members, customers, and partners. We share our successes, acknowledge our failures, and learn from both.',
            },
            {
              title: 'Quality',
              description:
                'We never compromise on excellence. From code architecture to customer support, we hold ourselves to the highest standards in everything we do.',
            },
            {
              title: 'Community',
              description:
                'We believe in giving back to the communities that support us, both technical and local. We contribute to open source projects and support educational initiatives.',
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
      </div>

      {/* Team Section */}
      <div className="space-y-6">
        <Typography variant="h2" className="text-center">
          Our Leadership Team
        </Typography>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: 'Tran Tien',
              role: 'CEO & Co-founder',
              bio: 'With over 15 years of experience in software development and product management, Alex leads our strategic vision and company culture.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
            {
              name: 'Tiesen',
              role: 'CTO & Co-founder',
              bio: 'A recognized expert in distributed systems and AI, Sarah oversees our technical direction and innovation initiatives.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
            {
              name: 'Yukikaze',
              role: 'Chief Design Officer',
              bio: 'Michael brings his passion for human-centered design to ensure our products are both beautiful and functional.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
            {
              name: 'Pepe',
              role: 'VP of Customer Success',
              bio: 'Priya ensures our customers receive exceptional support and maximize value from our solutions.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
            {
              name: 'Goldenglow',
              role: 'VP of Engineering',
              bio: 'David leads our engineering teams with a focus on code quality, performance, and developer experience.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
            {
              name: 'Mizuki',
              role: 'VP of Marketing',
              bio: 'Emma crafts our brand story and drives our go-to-market strategy with creativity and data-driven insights.',
              image: `https://www.gravatar.com/avatar/${gravatarHash}?d=identicon`,
            },
          ].map((person) => (
            <Card key={person.name}>
              <CardContent className="pt-6 text-center">
                <Avatar className="mx-auto h-24 w-24">
                  <AvatarImage src={person.image} alt={person.name} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <Typography variant="h3" className="mt-4 text-xl font-bold">
                  {person.name}
                </Typography>
                <Typography className="text-muted-foreground font-medium">
                  {person.role}
                </Typography>
                <Typography className="text-muted-foreground mt-2">
                  {person.bio}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6">
        <Typography variant="h2" className="text-center">
          Frequently Asked Questions
        </Typography>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: 'How did Yuki get started?',
              answer:
                'Yuki was founded in 2018 by three software engineers who were frustrated with the overly complex tools available in the market. They set out to create software solutions that prioritize user experience without sacrificing functionality.',
            },
            {
              question: 'What does the name "Yuki" mean?',
              answer:
                'The name Yuki comes from the Japanese word for "snow," symbolizing purity, clarity, and elegance — core principles that guide our product design philosophy.',
            },
            {
              question: 'Are you hiring?',
              answer:
                "Yes! We're always looking for talented individuals who share our values and mission. Check out our careers page for current openings or send your resume to careers@yukisoft.com.",
            },
            {
              question: 'How can I get in touch with your team?',
              answer:
                'You can reach us through our contact page, email us at hello@yukisoft.com, or call our office at +1 (555) 123-4567 during business hours.',
            },
          ].map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Join Our Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            We&apos;re always looking for talented individuals who share our
            passion for creating exceptional software experiences.
          </p>
          <Button size="lg" asChild>
            <a
              href="https://youtu.be/ORV5v-8OU6Y"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Open Positions
            </a>
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
