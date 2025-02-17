import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { Mail, MapPin, Phone } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { ContactForm } from './page.client'

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
          <ContactForm />
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
