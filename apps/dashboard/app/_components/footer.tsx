import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { FacebookIcon, GithubIcon, XformerlyTwitterIcon } from '@yuki/ui/icons'

import { env } from '@/env'

export const Footer: React.FC = () => (
  <footer className="bg-background border-t">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {[
              { title: 'Contact Us', href: '/contact' },
              {
                title: 'Shipping Information',
                href: 'https://youtu.be/4ikryZx-URA',
              },
              {
                title: 'Returns & Exchanges',
                href: 'https://youtu.be/JsMK2yZc3fE',
              },
              { title: 'FAQ', href: 'https://youtu.be/ORV5v-8OU6Y' },
            ].map(({ title, href }) => (
              <li
                key={href}
                className="hover:text-foreground transition-colors"
              >
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Company</h3>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {[
              { title: 'About Us', href: `${env.WEB_URL}/about` },
              { title: 'Privacy Policy', href: `${env.WEB_URL}/privacy` },
              { title: 'Terms & Conditions', href: `${env.WEB_URL}/terms` },
            ].map(({ title, href }) => (
              <li
                key={href}
                className="hover:text-foreground transition-colors"
              >
                <Link href={href}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Connect</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">Github</span>
            </Button>
            <Button variant="ghost" size="icon">
              <FacebookIcon className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="ghost" size="icon">
              <XformerlyTwitterIcon className="h-4 w-4" />
              <span className="sr-only">X</span>
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Subscribe to get special offers and updates
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Yuki Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)
