import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { Mail, MapPin, Phone } from '@yuki/ui/icons'
import { Textarea } from '@yuki/ui/textarea'
import { Typography } from '@yuki/ui/typography'

import { FormField } from '@/app/_components/form-field'
import { createMetadata } from '@/lib/metadata'

export default function ContactPage() {
  return (
    <main className="container grid gap-8 py-16 lg:grid-cols-2">
      <section className="space-y-8">
        <div>
          <Typography variant="h1">Get in Touch</Typography>
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
          <Typography variant="h2">Send us a message</Typography>
          <CardDescription>
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="firstName"
                label="First name"
                placeholder="Enter your first name"
              />
              <FormField
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
            </div>

            <FormField name="Email" label="Email" placeholder="Enter your email" />

            <FormField
              name="subject"
              label="Subject"
              placeholder="How can we help you?"
            />

            <FormField name="message" asChild>
              <Textarea
                id="message"
                placeholder="Tell us more about your inquiry..."
                className="min-h-[150px] resize-none"
              />
            </FormField>

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
