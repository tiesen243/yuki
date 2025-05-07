import type { LucideIcon } from '@yuki/ui/icons'
import {
  CreditCardIcon,
  HeartIcon,
  MessageSquareIcon,
  SearchIcon,
  ShoppingBagIcon,
  TruckIcon,
} from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export function FeatureSection() {
  return (
    <section id="features" className="bg-muted/40 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <Typography variant="h2">Designed for the modern shopper</Typography>
          <Typography className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            Yuki offers a comprehensive suite of features designed to make
            online shopping effortless and enjoyable.
          </Typography>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary/10 text-primary rounded-full p-2">
                <feature.icon className="h-5 w-5" />
              </div>
              <Typography variant="h4" as="h3">
                {feature.title}
              </Typography>
              <Typography className="text-muted-foreground text-sm">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: ShoppingBagIcon,
    title: 'Intuitive Shopping',
    description:
      'Browse and shop with ease using our clean, user-friendly interface designed for speed and simplicity.',
  },
  {
    icon: HeartIcon,
    title: 'Personalized Recommendations',
    description:
      "Discover products you'll love with AI-powered recommendations based on your preferences and browsing history.",
  },
  {
    icon: CreditCardIcon,
    title: 'Seamless Checkout',
    description:
      'Complete your purchase in seconds with our streamlined checkout process and multiple payment options.',
  },
  {
    icon: SearchIcon,
    title: 'Smart Search',
    description:
      "Find exactly what you're looking for with our powerful search and filtering capabilities.",
  },
  {
    icon: TruckIcon,
    title: 'Order Tracking',
    description:
      'Stay updated on your purchase with real-time order tracking and delivery notifications.',
  },
  {
    icon: MessageSquareIcon,
    title: '24/7 Support',
    description:
      'Get help whenever you need it with our dedicated customer support team and in-app chat.',
  },
]
