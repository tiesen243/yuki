import { ClockIcon, ShieldIcon, SparklesIcon, ZapIcon } from '@yuki/ui/icons'

export function UniqueSellingPoints() {
  return (
    <section className="bg-muted/40 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why choose Yuki?
          </h2>
          <p className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            Discover what sets Yuki apart from other e-commerce applications.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="bg-background rounded-lg border p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">
                  AI-Powered Personalization
                </h3>
                <p className="text-muted-foreground">
                  Our advanced AI learns your preferences and style to create a
                  truly personalized shopping experience. Unlike other apps that
                  simply show popular items, Yuki understands your unique taste.
                </p>
                <ul className="mt-2 grid gap-1">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>
                      Style profile that evolves with your preferences
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>
                      Recommendations that improve with each interaction
                    </span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Discover new brands that match your taste</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <ZapIcon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Lightning-Fast Checkout</h3>
                <p className="text-muted-foreground">
                  Complete your purchase in seconds with our streamlined
                  checkout process. We&apos;ve eliminated unnecessary steps and
                  friction points that slow you down.
                </p>
                <ul className="mt-2 grid gap-1">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>One-tap purchase with saved payment methods</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Smart address verification and auto-completion</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Order confirmation in under 3 seconds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Enhanced Security</h3>
                <p className="text-muted-foreground">
                  Shop with confidence knowing your personal and payment
                  information is protected by industry-leading security
                  measures.
                </p>
                <ul className="mt-2 grid gap-1">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>End-to-end encryption for all transactions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Biometric authentication options</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Fraud detection and prevention systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-lg border p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-full p-3">
                <ClockIcon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Real-Time Inventory</h3>
                <p className="text-muted-foreground">
                  Never experience the disappointment of out-of-stock items.
                  Yuki provides real-time inventory updates and smart
                  alternatives for unavailable products.
                </p>
                <ul className="mt-2 grid gap-1">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Live stock updates across all stores</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>Back-in-stock notifications for wishlist items</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="bg-primary h-1.5 w-1.5 rounded-full"></div>
                    <span>
                      Similar product suggestions for unavailable items
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
