import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { Mail, MapPin, Phone } from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'
import { Label } from '@yuki/ui/label'
import { Textarea } from '@yuki/ui/textarea'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function ContactPage() {
  return (
    <main className="container grid gap-8 py-16 lg:grid-cols-2">
      <section className="space-y-8">
        <div>
          <Typography level="h1">Get in Touch</Typography>
          <p className="text-muted-foreground mt-2 text-lg">
            We&apos;d love to hear from you. Please fill out this form or contact us
            directly.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="sr-only">Contact Informations Section</h2>
          <Card variant="pressable">
            <CardContent className="flex items-center space-x-4 p-6">
              <Mail className="text-muted-foreground h-6 w-6" />
              <div>
                <CardTitle className="text-base">Email</CardTitle>
                <CardDescription>support@tiesen.id.vn</CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card variant="pressable">
            <CardContent className="flex items-center space-x-4 p-6">
              <Phone className="text-muted-foreground h-6 w-6" />
              <div>
                <CardTitle className="text-base">Phone</CardTitle>
                <CardDescription>+1 (555) 123-4567</CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card variant="pressable">
            <CardContent className="flex items-center space-x-4 p-6">
              <MapPin className="text-muted-foreground h-6 w-6" />
              <div>
                <CardTitle className="text-base">Address</CardTitle>
                <CardDescription>
                  123 Commerce Street
                  <br />
                  City, State 12345
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        </section>
      </section>

      <Card>
        <CardHeader>
          <Typography level="h2">Send us a message</Typography>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help you?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                className="min-h-[150px] resize-none"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Contact us',
  description: 'Get in touch with us.',
  openGraph: {
    images: `/api/og?title=${encodeURIComponent('Contact us')}&description=${encodeURIComponent('Get in touch with us.')}`,
    url: '/contact',
  },
})
