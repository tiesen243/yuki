import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  XFormerTwitterIcon,
} from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MailIcon className="text-primary mt-0.5 h-5 w-5" />
          <div>
            <Typography variant="h6" className="mb-1">
              Email
            </Typography>
            <Typography variant="p" color="muted">
              <a href="mailto:support@yuki.com" className="hover:text-primary">
                support@yuki.com
              </a>
            </Typography>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <PhoneIcon className="text-primary mt-0.5 h-5 w-5" />
          <div>
            <Typography variant="h6" className="mb-1">
              Phone
            </Typography>
            <Typography variant="p" color="muted">
              <a href="tel:+18005551234" className="hover:text-primary">
                +1 (800) 555-1234
              </a>
            </Typography>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPinIcon className="text-primary mt-0.5 h-5 w-5" />
          <div>
            <Typography variant="h6" className="mb-1">
              Address
            </Typography>
            <Typography variant="p" color="muted">
              123 Skibidi Street
              <br />
              Tokyo, Japan 100-0001
            </Typography>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <ClockIcon className="text-primary mt-0.5 h-5 w-5" />
          <div>
            <Typography variant="h6" className="mb-1">
              Business Hours
            </Typography>
            <Typography variant="p" color="muted">
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday: 10:00 AM - 4:00 PM
              <br />
              Sunday: Closed
            </Typography>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <Typography variant="h6" className="mb-3">
          Connect with us
        </Typography>
        <div className="flex space-x-4">
          {[
            {
              href: 'https://facebook.com/tiesen243.nanoda',
              icon: FacebookIcon,
            },
            {
              href: 'https://instagram.com/tiesen243.nanoda',
              icon: InstagramIcon,
            },
            { href: 'https://x.com/tiesen243', icon: XFormerTwitterIcon },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-2.5 transition-colors"
              aria-label={link.href}
            >
              <link.icon className="size-6" />
              <span className="sr-only">Link to {link.href}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
