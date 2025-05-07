import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@yuki/ui/accordion'
import { Alert, AlertDescription } from '@yuki/ui/alert'
import { HelpCircleIcon } from '@yuki/ui/icons'
import { Typography } from '@yuki/ui/typography'

export function ShippingFAQ() {
  return (
    <div className="space-y-8">
      <Typography variant="h3" className="mb-4">
        Frequently Asked Questions
      </Typography>
      <Typography variant="p">
        Find answers to the most common questions about shipping, delivery, and
        returns.
      </Typography>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How long will it take to receive my order?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Delivery times depend on your location and chosen shipping method.
              Standard shipping typically takes 3-5 business days, Express
              shipping takes 2 business days, and Next Day delivery orders
              placed before 2 PM local time will arrive the following business
              day. These estimates apply after your order has been processed,
              which usually takes 1-2 business days. International shipments
              take 7-21 business days depending on the destination.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>When will my order ship?</AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Orders are typically processed within 1-2 business days after
              they&apos;re placed. Orders placed before 2 PM local time on
              business days may begin processing the same day. Once your order
              ships, you&apos;ll receive a shipping confirmation email with
              tracking information. Pre-order items and custom products may have
              different processing timeframes, which will be indicated on the
              product page.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Can I change my shipping address after placing an order?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              You can change your shipping address within 1 hour of placing your
              order, provided it hasn&apos;t entered the processing stage. To
              change your address, go to your Order History, select the relevant
              order, and use the &quot;Update Shipping Address&quot; option if
              available. If this option isn&apos;t available, please contact our
              customer service team immediately. We cannot guarantee address
              changes once an order has begun processing.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Yes, we offer free standard shipping on all orders over $50 within
              the continental United States. Orders under $50 have a flat rate
              shipping fee of $5.95. Free shipping does not apply to expedited
              shipping methods or international orders. Occasionally, we run
              promotions with free expedited shipping or international shipping
              offers, which will be announced on our website and through our
              newsletter.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            What should I do if my package is lost or damaged?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              If your package is lost, damaged, or hasn&apos;t arrived within
              the expected timeframe, please contact us within 48 hours of the
              expected delivery date. You can report the issue through your
              account by going to Order History, selecting the affected order,
              and clicking &quot;Report a Problem.&quot; Select &quot;Lost
              Package&quot; or &quot;Damaged Package&quot; and provide any
              relevant details. We&apos;ll investigate and work with the
              shipping carrier to resolve the issue, typically within 3-5
              business days.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            How do I return an item and how much does return shipping cost?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              To return an item, go to your Order History within 30 days of
              delivery, select the order containing the item(s) you wish to
              return, and click &quot;Start a Return.&quot; Follow the prompts
              to generate a return shipping label. For standard returns, a flat
              return shipping fee of $5.95 will be deducted from your refund.
              This fee is waived for exchanges and returns due to our error
              (damaged, defective, or incorrect items). Premium members receive
              free returns. International return shipping costs vary and are the
              customer&apos;s responsibility.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            Do you ship to P.O. boxes or APO/FPO addresses?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              We currently do not ship to P.O. boxes or APO/FPO addresses with
              any shipping method. All orders require a physical street address
              for delivery. This restriction exists because our primary shipping
              carriers (UPS, FedEx) do not deliver to P.O. boxes, and we cannot
              guarantee delivery timeframes or tracking for APO/FPO addresses.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>
            What happens if I&apos;m not home when my package arrives?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Delivery procedures for absent recipients vary by carrier. Most
              packages will be left at your door if no signature is required.
              For orders requiring a signature, the carrier will leave a notice
              and attempt delivery again on the next business day, usually up to
              three attempts. After the final attempt, the package will be held
              at a local facility for pickup, typically for 5-7 days before
              being returned to us. You can often use your tracking number to
              authorize release without signature or schedule a convenient
              delivery time through the carrier&apos;s website.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>
            Can I expedite shipping for a previously placed order?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Once an order has been placed, the shipping method cannot be
              changed or expedited. If you need your items more quickly, we
              recommend contacting our customer service team immediately after
              placing your order. In some cases, we may be able to cancel the
              original order (if it hasn&apos;t been processed) so you can place
              a new order with expedited shipping. Please note that this is not
              guaranteed and depends on the order&apos;s processing status.
            </Typography>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>
            How do you handle orders with multiple items?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Orders with multiple items may ship in separate packages to ensure
              the fastest delivery, especially if items have different
              availability. You&apos;ll only be charged shipping once per order,
              not per package. If items ship separately, you&apos;ll receive
              tracking information for each package. We try to consolidate items
              when possible to reduce environmental impact, but our priority is
              getting your items to you as quickly as possible.
            </Typography>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Alert className="bg-muted/30 mt-8">
        <HelpCircleIcon className="h-4 w-4" />
        <AlertDescription>
          Can&apos;t find the answer you&apos;re looking for? Visit our{' '}
          <a href="/contact" className="text-primary hover:underline">
            Contact Page
          </a>{' '}
          for more ways to reach our customer service team.
        </AlertDescription>
      </Alert>
    </div>
  )
}
