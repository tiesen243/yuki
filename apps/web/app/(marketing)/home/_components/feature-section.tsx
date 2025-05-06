import {
  CreditCardIcon,
  HeartIcon,
  MessageSquareIcon,
  SearchIcon,
  ShoppingBagIcon,
  TruckIcon,
} from '@yuki/ui/icons'

export function FeatureSection() {
  return (
    <section id="features" className="bg-muted/40 py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Designed for the modern shopper
          </h2>
          <p className="text-muted-foreground max-w-[85%] md:text-xl/relaxed">
            Yuki offers a comprehensive suite of features designed to make
            online shopping effortless and enjoyable.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pt-16 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <ShoppingBagIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Intuitive Shopping</h3>
            <p className="text-muted-foreground text-sm">
              Browse and shop with ease using our clean, user-friendly interface
              designed for speed and simplicity.
            </p>
          </div>
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <HeartIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Personalized Recommendations</h3>
            <p className="text-muted-foreground text-sm">
              Discover products you&apos;ll love with AI-powered recommendations
              based on your preferences and browsing history.
            </p>
          </div>
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Seamless Checkout</h3>
            <p className="text-muted-foreground text-sm">
              Complete your purchase in seconds with our streamlined checkout
              process and multiple payment options.
            </p>
          </div>
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <SearchIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Smart Search</h3>
            <p className="text-muted-foreground text-sm">
              Find exactly what you&apos;re looking for with our powerful search
              and filtering capabilities.
            </p>
          </div>
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <TruckIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Order Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Stay updated on your purchase with real-time order tracking and
              delivery notifications.
            </p>
          </div>
          <div className="bg-background flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm">
            <div className="bg-primary/10 text-primary rounded-full p-2">
              <MessageSquareIcon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">24/7 Support</h3>
            <p className="text-muted-foreground text-sm">
              Get help whenever you need it with our dedicated customer support
              team and in-app chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
