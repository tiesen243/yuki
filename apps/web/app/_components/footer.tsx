import Image from 'next/image'
import Link from 'next/link'
import { FacebookIcon, GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react'

import { Typography } from '@yuki/ui/typography'

export const Footer: React.FC = () => (
  <footer className="mt-auto bg-muted py-6">
    <div className="container">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/assets/logo.svg"
              alt="Yuki"
              width={32}
              height={32}
              className="dark:invert"
            />
            <Typography level="h3">Yuki</Typography>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your one-stop shop for all things fashion and lifestyle.
          </p>
        </div>

        <div className="space-y-3">
          <Typography level="h3">Quick Links</Typography>
          <ul className="space-y-2">
            {links.map(({ title, href }) => (
              <li key={href}>
                <Link href={href} className="text-sm hover:underline">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col space-y-3 md:items-end">
          <Typography level="h3">Connect With Us</Typography>
          <div className="flex space-x-4">
            {socials.map(({ icon: Icon, href, title }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Icon size={24} />
                <span className="sr-only">{title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-muted-foreground/20 pt-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Yuki. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

const links = [
  {
    title: 'Home',
    href: '/home',
  },
  {
    title: 'Products',
    href: '/p',
  },
  {
    title: 'About Us',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
]

const socials = [
  {
    icon: GlobeIcon,
    href: 'https://tiesen.id.vn',
    title: 'Portfolio',
  },
  {
    icon: FacebookIcon,
    href: 'https://facebook.com/tiesen243.tsx',
    title: 'Facebook',
  },
  {
    icon: GithubIcon,
    href: 'https://github.com/tiesen243',
    title: 'Github',
  },
  {
    icon: TwitterIcon,
    href: 'https://twitter.com/tiesen243',
    title: 'Twitter',
  },
]
