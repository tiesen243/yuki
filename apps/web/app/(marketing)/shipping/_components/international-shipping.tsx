import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@yuki/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@yuki/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import {
  AlertCircleIcon,
  ClockIcon,
  FileTextIcon,
  MapPinIcon,
} from '@yuki/ui/icons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@yuki/ui/table'
import { Typography } from '@yuki/ui/typography'

export function InternationalShipping() {
  return (
    <div className="space-y-8">
      <Typography variant="h3" className="mb-4">
        International Shipping
      </Typography>
      <Typography variant="p">
        Yuki ships to over 40 countries worldwide. International shipping times
        and costs vary by destination, package weight, and selected shipping
        method.
      </Typography>

      {/* Important notice */}
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          The recipient is responsible for all customs fees, import taxes, and
          duties. These are not included in the shipping cost and will be
          collected by the delivery carrier upon delivery.
        </AlertDescription>
      </Alert>

      {/* Regional shipping estimates */}
      <Typography variant="h4" className="mt-8 mb-4">
        Estimated Delivery Times & Costs
      </Typography>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Region</TableHead>
              <TableHead>Standard Delivery</TableHead>
              <TableHead>Express Delivery</TableHead>
              <TableHead>Starting Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Canada</TableCell>
              <TableCell>7-10 business days</TableCell>
              <TableCell>3-5 business days</TableCell>
              <TableCell>$14.95</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Europe</TableCell>
              <TableCell>10-15 business days</TableCell>
              <TableCell>5-7 business days</TableCell>
              <TableCell>$24.95</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Australia & New Zealand
              </TableCell>
              <TableCell>12-18 business days</TableCell>
              <TableCell>7-10 business days</TableCell>
              <TableCell>$29.95</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Asia</TableCell>
              <TableCell>10-16 business days</TableCell>
              <TableCell>6-8 business days</TableCell>
              <TableCell>$24.95</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Rest of World</TableCell>
              <TableCell>14-21 business days</TableCell>
              <TableCell>7-12 business days</TableCell>
              <TableCell>$34.95</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Typography variant="p" color="muted" className="text-sm">
        Note: Actual shipping costs are calculated at checkout based on
        destination, package weight, and selected shipping method. Free shipping
        promotions do not apply to international orders.
      </Typography>

      {/* Additional information cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <FileTextIcon className="text-primary h-5 w-5" />
              Customs Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              All international shipments include appropriate customs
              documentation. The package will be declared with the actual
              purchase value. We cannot mark packages as gifts or with a lower
              value than the actual purchase price.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <ClockIcon className="text-primary h-5 w-5" />
              Delivery Delays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              International shipments may occasionally experience delays due to
              customs processing, local holidays, or other factors beyond our
              control. The delivery estimates provided do not guarantee delivery
              by a specific date.
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Frequently asked questions */}
      <Typography variant="h4" className="mt-8 mb-4">
        International Shipping FAQs
      </Typography>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What countries do you ship to?</AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              We currently ship to over 40 countries including Canada, Mexico,
              most European countries, Australia, New Zealand, Japan, South
              Korea, Singapore, and select countries in South America and the
              Middle East. To check if we ship to your country, enter your
              address at checkout or contact our customer service team.
            </Typography>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How are customs fees and taxes calculated?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Customs fees, import taxes, and duties are determined by your
              country&apos;s customs authority based on the value of your order,
              the type of items, and your country&apos;s import regulations.
              These fees are not included in our shipping charges and will be
              collected by the delivery carrier upon delivery or before the
              package is released to you.
            </Typography>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Are there any product restrictions for international shipping?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              Yes, certain products may be prohibited from import in specific
              countries due to local regulations. These may include products
              containing specific materials, electronics with lithium batteries,
              liquids, and fragrances. Additionally, some countries have
              restrictions on the import of clothing and accessories. If you
              attempt to purchase an item that cannot be shipped to your
              location, you will be notified during checkout.
            </Typography>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How do I return an international order?
          </AccordionTrigger>
          <AccordionContent>
            <Typography variant="p" className="mt-2 text-sm">
              International orders can be returned within 30 days of delivery.
              You will need to arrange and pay for return shipping to our
              warehouse. Once we receive and process your return, we will issue
              a refund for the purchase price. Please note that original
              shipping charges, customs fees, taxes, and duties are
              non-refundable. Contact our customer service team for detailed
              return instructions.
            </Typography>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Supported countries visual */}
      <div className="mt-8">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
          <MapPinIcon className="text-primary h-5 w-5" />
          Supported Countries
        </Typography>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Australia
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Austria
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Belgium
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Canada
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Denmark
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Finland
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            France
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Germany
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Hong Kong
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Ireland
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Italy
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Japan
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Netherlands
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            New Zealand
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Norway
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Singapore
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            South Korea
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Spain
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Sweden
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            Switzerland
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            United Kingdom
          </div>
          <div className="text-muted-foreground rounded border p-2 text-sm">
            And 20+ more...
          </div>
        </div>
      </div>
    </div>
  )
}
