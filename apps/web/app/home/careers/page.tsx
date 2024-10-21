import type { NextPage } from 'next'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { FormField } from '@yuki/ui/form-field'
import { BriefcaseIcon, BuildingIcon, HeartIcon, StarIcon } from '@yuki/ui/icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@yuki/ui/select'

import { seo } from '@/lib/seo'

const Page: NextPage = () => (
  <main className="container flex-1 py-6">
    <section className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Join Our E-commerce Revolution</h1>
      <p className="mb-6 text-xl text-muted-foreground">
        Help us reshape the future of online shopping. Be part of something big.
      </p>
      <Button size="lg" asChild>
        <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
          View Open Positions
        </a>
      </Button>
    </section>

    {/* Company Culture Section */}
    <section className="mb-12">
      <h2 className="mb-6 text-center text-3xl font-semibold">Why Work With Us?</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: BuildingIcon,
            title: 'Modern Workspace',
            description: 'State-of-the-art offices designed for collaboration and creativity.',
          },
          {
            icon: StarIcon,
            title: 'Growth Opportunities',
            description: 'Continuous learning and career advancement paths for all employees.',
          },
          {
            icon: HeartIcon,
            title: 'Inclusive Culture',
            description: 'A diverse and welcoming environment where every voice matters.',
          },
          {
            icon: BriefcaseIcon,
            title: 'Competitive Benefits',
            description: 'Comprehensive health coverage, retirement plans, and more.',
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <item.icon className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* Current Openings Section */}
    <section className="mb-12">
      <h2 className="mb-6 text-center text-3xl font-semibold">Current Openings</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote' },
          { title: 'UX Designer', department: 'Design', location: 'New York, NY' },
          { title: 'Product Manager', department: 'Product', location: 'San Francisco, CA' },
          { title: 'Data Scientist', department: 'Analytics', location: 'Remote' },
        ].map((job, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.department} · {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="https://youtu.be/qWNQUvIk954" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    {/* Application Form */}
    <section className="mb-12">
      <Card>
        <CardHeader>
          <CardTitle>Interested in Joining Our Team?</CardTitle>
          <CardDescription>Fill out this form and we'll get back to you soon!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField name="first-name" label="Last Name" placeholder="Yuki" />
            <FormField name="last-name" label="First Name" placeholder="Kaze" />
          </div>
          <FormField name="email" label="Email Address" placeholder="yuki@example.com" />
          <FormField name="position" label="Position" asChild>
            <Select>
              <SelectTrigger id="position">
                <SelectValue placeholder="Select a position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Senior Frontend Developer</SelectItem>
                <SelectItem value="ux">UX Designer</SelectItem>
                <SelectItem value="product">Product Manager</SelectItem>
                <SelectItem value="data">Data Scientist</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            name="message"
            label="Why do you want to join our team?"
            placeholder="Tell us about your interest and qualifications..."
          />

          <Button className="w-full" asChild>
            <a href="https://youtu.be/LoZCAEgioDg" target="_blank" rel="noopener noreferrer">
              Submit Application
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>

    {/* Testimonials Section */}
    <section>
      <h2 className="mb-6 text-center text-3xl font-semibold">What Our Team Says</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: 'Alex Johnson',
            role: 'Frontend Developer',
            quote:
              "The collaborative environment here is unmatched. I've grown so much as a developer in just a year!",
          },
          {
            name: 'Samantha Lee',
            role: 'UX Designer',
            quote:
              "I love how my ideas are valued. We're truly shaping the future of e-commerce together.",
          },
          {
            name: 'Michael Chen',
            role: 'Data Scientist',
            quote:
              'The challenges we tackle daily keep me engaged and excited about coming to work every day.',
          },
        ].map((testimonial, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{testimonial.name}</CardTitle>
              <CardDescription>{testimonial.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="italic">"{testimonial.quote}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </main>
)

export default Page

export const metadata = seo({
  title: 'Careers at Yuki',
  description: 'Join our team and help us revolutionize the future of e-commerce.',
  images: [
    '/api/og?title=Careers%20at%20Yuki&description=Join%20our%20team%20and%20help%20us%20revolutionize%20the%20future%20of%20e-commerce.',
  ],
  url: '/home/careers',
})
