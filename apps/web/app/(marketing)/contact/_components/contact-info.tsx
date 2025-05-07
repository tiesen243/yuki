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
              <a
                href="mailto:support@yukiapp.com"
                className="hover:text-primary"
              >
                support@yukiapp.com
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
              123 Fashion Street
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
          <a
            href="https://instagram.com/yukiapp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-2.5 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/yukiapp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-2.5 transition-colors"
            aria-label="Twitter"
          >
            <XFormerTwitterIcon className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/yukiapp"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full p-2.5 transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
