import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { MailIcon, MessageSquareIcon, PhoneIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export function FaqContact() {
  return (
    <div className="bg-card mt-20 rounded-lg border p-8 text-center">
      <Typography variant="h3" className="mb-4">
        Still have questions?
      </Typography>
      <Typography variant="p" color="muted" className="mx-auto mb-8 max-w-2xl">
        If you couldn&apos;t find the answer to your question, our support team
        is here to help. Reach out to us through any of the channels below.
      </Typography>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-background flex flex-col items-center rounded-lg border p-6">
          <MessageSquareIcon className="text-primary mb-4 h-8 w-8" />
          <Typography variant="h5" className="mb-2">
            Live Chat
          </Typography>
          <Typography variant="p" color="muted" className="mb-4 text-sm">
            Chat with our support team in real-time
          </Typography>
          <Button className="mt-auto" variant="outline">
            Start Chat
          </Button>
        </div>
        <div className="bg-background flex flex-col items-center rounded-lg border p-6">
          <MailIcon className="text-primary mb-4 h-8 w-8" />
          <Typography variant="h5" className="mb-2">
            Email Support
          </Typography>
          <Typography variant="p" color="muted" className="mb-4 text-sm">
            Get a response within 24 hours
          </Typography>
          <Button className="mt-auto" variant="outline" asChild>
            <Link href="mailto:support@yukiapp.com">Email Us</Link>
          </Button>
        </div>
        <div className="bg-background flex flex-col items-center rounded-lg border p-6">
          <PhoneIcon className="text-primary mb-4 h-8 w-8" />
          <Typography variant="h5" className="mb-2">
            Phone Support
          </Typography>
          <Typography variant="p" color="muted" className="mb-4 text-sm">
            Available Mon-Fri, 9AM-6PM
          </Typography>
          <Button className="mt-auto" variant="outline" asChild>
            <Link href="tel:+18005551234">Call Us</Link>
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <Typography variant="p" color="muted" className="text-sm">
          You can also visit our{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contact page
          </Link>{' '}
          for more ways to reach us.
        </Typography>
      </div>
    </div>
  )
}
