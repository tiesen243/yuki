import type { LucideIcon } from '@yuki/ui/icons'
import { ClockIcon, ShieldIcon, SparklesIcon, ZapIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export function UniqueSellingPoints() {
  return (
    <section className="bg-muted/40 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <Typography variant="h2">Why choose Yuki?</Typography>
          <Typography className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            Discover what sets Yuki apart from other e-commerce applications.
          </Typography>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2">
          {sellingPoints.map((point, index) => (
            <div
              key={index}
              className="bg-background rounded-lg border p-8 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-full p-3">
                  <point.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                  <ul className="mt-2 grid gap-1">
                    {point.bulletPoints.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface SellingPoint {
  icon: LucideIcon
  title: string
  description: string
  bulletPoints: string[]
}

const sellingPoints: SellingPoint[] = [
  {
    icon: SparklesIcon,
    title: 'AI-Powered Personalization',
    description:
      'Our advanced AI learns your preferences and style to create a truly personalized shopping experience. Unlike other apps that simply show popular items, Yuki understands your unique taste.',
    bulletPoints: [
      'Style profile that evolves with your preferences',
      'Recommendations that improve with each interaction',
      'Discover new brands that match your taste',
    ],
  },
  {
    icon: ZapIcon,
    title: 'Lightning-Fast Checkout',
    description:
      "Complete your purchase in seconds with our streamlined checkout process. We've eliminated unnecessary steps and friction points that slow you down.",
    bulletPoints: [
      'One-tap purchase with saved payment methods',
      'Smart address verification and auto-completion',
      'Order confirmation in under 3 seconds',
    ],
  },
  {
    icon: ShieldIcon,
    title: 'Enhanced Security',
    description:
      'Shop with confidence knowing your personal and payment information is protected by industry-leading security measures.',
    bulletPoints: [
      'End-to-end encryption for all transactions',
      'Biometric authentication options',
      'Fraud detection and prevention systems',
    ],
  },
  {
    icon: ClockIcon,
    title: 'Real-Time Inventory',
    description:
      'Never experience the disappointment of out-of-stock items. Yuki provides real-time inventory updates and smart alternatives for unavailable products.',
    bulletPoints: [
      'Live stock updates across all stores',
      'Back-in-stock notifications for wishlist items',
      'Similar product suggestions for unavailable items',
    ],
  },
]
