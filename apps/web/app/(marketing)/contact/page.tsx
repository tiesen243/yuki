import { Mail, MapPin, Phone } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

import { seo } from '@/lib/seo'
import { ContactForm } from './_form'

const Page: React.FC = () => (
  <div className="container mx-auto py-12">
    <Typography level="h1" className="mb-8 text-center">
      Contact Us
    </Typography>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <Typography level="h2" className="border-none">
            Send Us a Message
          </Typography>
          <Typography color="muted">
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as
            possible.
          </Typography>
        </CardHeader>

        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>

      <div>
        <Card className="mb-14">
          <CardHeader>
            <Typography level="h2" className="border-none">
              Contact Information
            </Typography>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-muted-foreground" />
              <span>69 Xi Street, SaiGon, Vietnam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>+84 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-muted-foreground" />
              <span>support@tiesen.id.vn</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Location</CardTitle>
          </CardHeader>
          <CardContent>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501727.2848471474!2d106.07206649948108!3d10.754170738359505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1729782022630!5m2!1svi!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full rounded"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

export default Page

export const metadata = seo({
  title: 'Contact Us',
  description:
    'Get in touch with the Yuki team. We are here to help you with any questions or concerns you may have.',
  url: '/contact',
})
