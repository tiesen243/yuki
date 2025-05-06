import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  XFormerTwitterIcon,
  YoutubeIcon,
} from '@yuki/ui/icons'
import { Input } from '@yuki/ui/input'

export const Footer = () => (
  <footer className="bg-sidebar border-t">
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand and About */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <h2 className="text-2xl font-bold">Yuki</h2>
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm">
            Discover timeless elegance and contemporary fashion at Yuki. We
            bring you curated collections that blend style, comfort, and
            quality.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <XFormerTwitterIcon className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <YoutubeIcon className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>

        {/* Shop Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-wider uppercase">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/collections/women"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/collections/men"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/collections/kids"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                href="/collections/accessories"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/collections/new-arrivals"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/collections/sale"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-wider uppercase">
            Customer Service
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/returns"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link
                href="/size-guide"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Size Guide
              </Link>
            </li>
            <li>
              <Link
                href="/track-order"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-wider uppercase">
            Stay Updated
          </h3>
          <p className="text-muted-foreground text-sm">
            Subscribe to our newsletter for exclusive offers and updates.
          </p>
          <form className="flex space-x-2">
            <Input
              type="email"
              placeholder="Your email"
              className="max-w-[220px]"
              aria-label="Email for newsletter"
            />
            <Button type="submit" size="sm">
              Subscribe
            </Button>
          </form>
          <div className="space-y-2 pt-2">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPinIcon className="h-4 w-4" />
              <span>123 Fashion Street, Tokyo, Japan</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MailIcon className="h-4 w-4" />
              <span>support@yukifashion.com</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <PhoneIcon className="h-4 w-4" />
              <span>+1 (234) 567-8900</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8" />

      {/* Bottom Footer */}
      <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Yuki Fashion. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
)
