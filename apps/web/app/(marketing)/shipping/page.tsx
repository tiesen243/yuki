import Link from 'next/link'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yuki/ui/tabs'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { InternationalShipping } from './_components/international-shipping'
import { OrderTracking } from './_components/order-tracking'
import { ShippingFAQ } from './_components/shipping-faq'
import { ShippingMethods } from './_components/shipping-methods'
import { ShippingRestrictions } from './_components/shipping-restrictions'

export default function ShippingPage() {
  return (
    <main className="container py-4">
      {/* Header */}
      <div className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Shipping & Delivery
        </Typography>
        <Typography variant="p" color="muted" className="mx-auto max-w-2xl">
          At Yuki, we&apos;re committed to delivering your items safely and
          promptly. Here you&apos;ll find all the information about our shipping
          methods, delivery times, and policies.
        </Typography>
      </div>

      {/* Tabbed content for better organization */}
      <Tabs defaultValue="methods" className="mb-12">
        <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-5">
          {[
            {
              value: 'methods',
              label: 'Shipping Methods',
              Component: ShippingMethods,
            },
            {
              value: 'international',
              label: 'International',
              Component: InternationalShipping,
            },
            {
              value: 'tracking',
              label: 'Order Tracking',
              Component: OrderTracking,
            },
            {
              value: 'restrictions',
              label: 'Restrictions',
              Component: ShippingRestrictions,
            },
            { value: 'faq', label: 'FAQs', Component: ShippingFAQ },
          ].map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {[
          {
            value: 'methods',
            label: 'Shipping Methods',
            Component: ShippingMethods,
          },
          {
            value: 'international',
            label: 'International',
            Component: InternationalShipping,
          },
          {
            value: 'tracking',
            label: 'Order Tracking',
            Component: OrderTracking,
          },
          {
            value: 'restrictions',
            label: 'Restrictions',
            Component: ShippingRestrictions,
          },
          { value: 'faq', label: 'FAQs', Component: ShippingFAQ },
        ].map(({ value, Component }) => (
          <TabsContent key={value} value={value}>
            <Component />
          </TabsContent>
        ))}
      </Tabs>

      {/* Help information */}
      <div className="bg-muted/20 mt-16 rounded-lg border p-8 text-center">
        <Typography variant="h3" className="mb-4">
          Need assistance with your shipment?
        </Typography>
        <Typography
          variant="p"
          color="muted"
          className="mx-auto mb-8 max-w-2xl"
        >
          Our customer service team is ready to help with any shipping or
          delivery questions.
        </Typography>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Contact Support
          </Link>
          <Link
            href="/faq"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-8 py-3 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Shipping & Delivery',
  description:
    'Information about shipping methods, delivery times, costs, and policies for Yuki e-commerce.',
  openGraph: { url: '/shipping' },
})
