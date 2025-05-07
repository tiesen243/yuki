import { Alert, AlertDescription, AlertTitle } from '@yuki/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import {
  AlertCircle,
  MailOpenIcon,
  SearchIcon,
  SmartphoneIcon,
} from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

import { Step, Steps } from './steps'

export function OrderTracking() {
  return (
    <div className="space-y-8">
      <Typography variant="h3" className="mb-4">
        Order Tracking
      </Typography>
      <Typography variant="p">
        Stay informed about your order&apos;s journey from our warehouse to your
        doorstep. We provide detailed tracking information for all orders.
      </Typography>

      {/* How to track */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <MailOpenIcon className="text-primary h-5 w-5" />
              Email Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              You&apos;ll receive an email with tracking information once your
              order ships. This email includes a tracking number and a direct
              link to monitor your package&apos;s progress.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <SearchIcon className="text-primary h-5 w-5" />
              Order History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              Log in to your Yuki account and visit the &quot;Orders&quot;
              section to view your complete order history. Select any order to
              access detailed tracking information and shipment status.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <SmartphoneIcon className="text-primary h-5 w-5" />
              Mobile App
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              The Yuki mobile app provides real-time push notifications about
              your order status. Enable notifications to receive updates when
              your order is processed, shipped, and delivered.
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Order progress visualization */}
      <div className="mt-12">
        <Typography variant="h4" className="mb-6">
          Understanding Your Order Status
        </Typography>
        <Steps>
          <Step
            title="Order Placed"
            description="We've received your order and payment confirmation"
            completed
          />
          <Step
            title="Processing"
            description="Your order is being prepared in our warehouse"
            completed
          />
          <Step
            title="Shipped"
            description="Your package is on its way to you"
            active
          />
          <Step
            title="Out for Delivery"
            description="Your package is with the local carrier for delivery"
          />
          <Step
            title="Delivered"
            description="Your package has arrived at its destination"
          />
        </Steps>
      </div>

      {/* Tracking number information */}
      <div className="mt-8">
        <Card className="bg-muted/20">
          <CardHeader>
            <CardTitle>Tracking Number Details</CardTitle>
            <CardDescription>
              What your tracking number tells you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Typography variant="p" className="text-sm">
              Your tracking number provides access to the following information:
            </Typography>
            <ul className="list-disc space-y-2 pl-6">
              <li className="text-sm">Estimated delivery date</li>
              <li className="text-sm">Current package location</li>
              <li className="text-sm">
                Shipping milestones (picked up, in transit, out for delivery)
              </li>
              <li className="text-sm">Delivery confirmation</li>
              <li className="text-sm">Any delivery exceptions or delays</li>
            </ul>
            <Typography variant="p" className="mt-4 text-sm">
              Tracking information is typically updated once daily, though
              updates may be more frequent as the package nears its destination.
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Tracking delays notice */}
      <Alert
        variant="warning"
        className="bg-warning/10 text-warning border-warning/30"
      >
        <AlertCircle className="text-warning h-4 w-4" />
        <AlertTitle>Tracking Updates</AlertTitle>
        <AlertDescription>
          Tracking information may occasionally experience delays of 24-48 hours
          during peak shipping periods or extreme weather conditions. If your
          tracking hasn&apos;t updated in 3+ days, please contact our customer
          service team.
        </AlertDescription>
      </Alert>

      {/* Lost packages information */}
      <div className="mt-8">
        <Typography variant="h4" className="mb-4">
          Lost or Missing Packages
        </Typography>
        <Typography variant="p">
          If your tracking information shows that your package was delivered but
          you haven&apos;t received it, or if there has been no tracking update
          for several days:
        </Typography>
        <ol className="mt-4 list-decimal space-y-2 pl-6">
          <li className="text-sm">
            <strong>
              Check with neighbors or your building&apos;s package room
            </strong>{' '}
            to ensure the package wasn&apos;t delivered to them or stored in a
            communal area.
          </li>
          <li className="text-sm">
            <strong>Contact the shipping carrier directly</strong> using the
            tracking number provided in your shipping confirmation email.
          </li>
          <li className="text-sm">
            <strong>Report the issue to Yuki</strong> through your
            account&apos;s Order History section by selecting the order and
            clicking &quot;Report a Problem&quot; or by contacting our customer
            service team.
          </li>
        </ol>
        <Typography variant="p" className="mt-4">
          We&apos;ll investigate all lost package claims within 24-48 hours and
          work with the shipping carrier to locate your package or process a
          replacement/refund according to our policies.
        </Typography>
      </div>
    </div>
  )
}
