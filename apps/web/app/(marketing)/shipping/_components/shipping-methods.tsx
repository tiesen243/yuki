import { Badge } from '@yuki/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import {
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  TruckIcon,
  ZapIcon,
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

export function ShippingMethods() {
  return (
    <div className="space-y-8">
      <Typography variant="h3" className="mb-4">
        Shipping Methods & Delivery Times
      </Typography>
      <Typography variant="p">
        We offer several shipping options to meet your needs. Delivery times are
        estimates and begin from when your order is shipped, not when it&apos;s
        placed. Processing typically takes 1-2 business days.
      </Typography>

      {/* Highlighted offer */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Free Standard Shipping
          </CardTitle>
          <CardDescription>For all orders over $50</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="p" className="text-sm">
            Enjoy free standard shipping on all eligible orders over $50 within
            the continental US. Orders under $50 have a flat rate shipping fee
            of $5.95.
          </Typography>
        </CardContent>
      </Card>

      {/* Shipping methods table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Shipping Method</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <TruckIcon className="text-primary h-4 w-4" />
                  <span>Standard Shipping</span>
                </div>
              </TableCell>
              <TableCell>3-5 business days</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>$5.95</div>
                  <Badge variant="outline" className="text-xs">
                    Free over $50
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                Economical shipping option for non-urgent items. Delivered by
                USPS or regional carriers.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <ZapIcon className="text-primary h-4 w-4" />
                  <span>Express Shipping</span>
                </div>
              </TableCell>
              <TableCell>2 business days</TableCell>
              <TableCell>$12.95</TableCell>
              <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                Faster delivery option. Order by 2 PM local time for processing
                same day. Delivered by FedEx or UPS.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <ClockIcon className="text-primary h-4 w-4" />
                  <span>Next Day Delivery</span>
                </div>
              </TableCell>
              <TableCell>Next business day</TableCell>
              <TableCell>$24.95</TableCell>
              <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                Fastest shipping option. Order by 12 PM local time for delivery
                next business day. Not available for all locations.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <GlobeIcon className="text-primary h-4 w-4" />
                  <span>International</span>
                </div>
              </TableCell>
              <TableCell>7-21 business days</TableCell>
              <TableCell>Varies by location</TableCell>
              <TableCell className="text-muted-foreground hidden text-sm md:table-cell">
                Available to over 40 countries. Customs fees and duties not
                included in shipping cost. See International tab for details.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Additional information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <CalendarIcon className="text-primary h-5 w-5" />
              Business Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              Business days are Monday through Friday, excluding federal
              holidays. Orders placed after 2 PM local time or on weekends will
              begin processing the next business day.
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <TruckIcon className="text-primary h-5 w-5" />
              Multiple Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography variant="p" className="text-sm">
              Orders with multiple items may ship in separate packages to ensure
              the fastest delivery. You&apos;ll only be charged shipping once
              per order, not per package.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
