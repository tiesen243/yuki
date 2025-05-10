import { Alert, AlertDescription, AlertTitle } from '@yuki/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import {
  AlertCircleIcon,
  BanIcon,
  CircleDashedIcon,
  PackageIcon,
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

export function ShippingRestrictions() {
  return (
    <div className="space-y-8">
      <Typography variant="h3" className="mb-4">
        Shipping Restrictions
      </Typography>
      <Typography variant="p">
        While we strive to ship to as many locations as possible, there are some
        restrictions based on location, product type, and other factors. Please
        review this information before placing your order.
      </Typography>

      {/* Geographic restrictions */}
      <div className="mt-8">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
          <BanIcon className="text-primary h-5 w-5" />
          Geographic Restrictions
        </Typography>
        <Alert className="mb-6">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            We currently do not ship to P.O. boxes, APO/FPO addresses, or
            certain remote locations. International shipping is not available to
            all countries.
          </AlertDescription>
        </Alert>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              U.S. Shipping Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li className="text-sm">
                <strong>Alaska and Hawaii:</strong> Some shipping methods may
                not be available. Additional shipping fees may apply.
              </li>
              <li className="text-sm">
                <strong>U.S. Territories:</strong> Limited shipping options
                available to Puerto Rico, U.S. Virgin Islands, Guam, and other
                U.S. territories. Not all products can be shipped to these
                locations.
              </li>
              <li className="text-sm">
                <strong>P.O. Boxes:</strong> We do not ship to P.O. boxes with
                any shipping method.
              </li>
              <li className="text-sm">
                <strong>APO/FPO Addresses:</strong> We currently do not ship to
                Army Post Office (APO) or Fleet Post Office (FPO) addresses.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Product restrictions */}
      <div className="mt-8">
        <Typography variant="h4" className="mb-4 flex items-center gap-2">
          <PackageIcon className="text-primary h-5 w-5" />
          Product Restrictions
        </Typography>
        <Typography variant="p" className="mb-4">
          Some products have shipping restrictions due to their nature, size, or
          regulatory requirements. These restrictions may apply both
          domestically and internationally.
        </Typography>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Category</TableHead>
                <TableHead>Restriction Type</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Fragrances & Perfumes
                </TableCell>
                <TableCell>International restrictions</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Cannot be shipped internationally due to transport regulations
                  for flammable materials.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Electronics with Batteries
                </TableCell>
                <TableCell>Limited international shipping</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Items with lithium batteries may have restrictions to certain
                  countries or require special handling.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Oversized Items</TableCell>
                <TableCell>Limited delivery areas</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  Items exceeding certain dimensions may not be eligible for all
                  shipping methods or destinations.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  High-Value Items ($1000+)
                </TableCell>
                <TableCell>Special shipping requirements</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  May require signature confirmation and additional insurance.
                  Not available for all international destinations.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Additional restrictions */}
      <Alert className="mt-8">
        <CircleDashedIcon className="h-4 w-4" />
        <AlertTitle>Special Circumstances</AlertTitle>
        <AlertDescription>
          During peak seasons (like holidays), severe weather events, or other
          exceptional circumstances, additional temporary shipping restrictions
          may apply. We&apos;ll notify you at checkout if your order is
          affected.
        </AlertDescription>
      </Alert>

      {/* How to check eligibility */}
      <div className="bg-muted/20 mt-8 rounded-lg border p-6">
        <Typography variant="h4" className="mb-4">
          How to Check Shipping Eligibility
        </Typography>
        <Typography variant="p" className="mb-4">
          To check if we ship to your location or if a specific product has
          shipping restrictions:
        </Typography>
        <ol className="list-decimal space-y-2 pl-6">
          <li className="text-sm">
            Add the item to your cart and proceed to checkout
          </li>
          <li className="text-sm">Enter your shipping address</li>
          <li className="text-sm">
            Available shipping methods and any restrictions will be displayed
            before payment
          </li>
        </ol>
        <Typography variant="p" className="text-muted-foreground mt-4 text-sm">
          If you have questions about shipping eligibility for a specific
          location or product, please contact our customer service team for
          assistance.
        </Typography>
      </div>
    </div>
  )
}
