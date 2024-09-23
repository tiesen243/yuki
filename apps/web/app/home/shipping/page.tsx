import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@yuki/ui/accordion'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@yuki/ui/card'
import { Clock, DollarSign, RotateCcw, Truck } from '@yuki/ui/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@yuki/ui/tabs'

import { seo } from '@/lib/seo'

export default function ShippingReturns() {
  return (
    <main className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Shipping & Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="shipping" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">We offer various shipping options to meet your needs:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Truck className="mr-2 h-4 w-4" />
                      Standard Shipping (3-5 business days)
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Express Shipping (1-2 business days)
                    </li>
                    <li className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Free shipping on orders over $50
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="returns">
              <Card>
                <CardHeader>
                  <CardTitle>Returns Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    We want you to be completely satisfied with your purchase. If you're not, you
                    can return most items within 30 days of delivery for a full refund.
                  </p>
                  <div className="mb-4 flex items-center">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    30-day return policy
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="shipping-faq">
              <AccordionTrigger>Shipping FAQ</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">How long will it take to receive my order?</h3>
                    <p>
                      Delivery times depend on your location and chosen shipping method. Standard
                      shipping typically takes 3-5 business days, while express shipping takes 1-2
                      business days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Do you ship internationally?</h3>
                    <p>
                      Yes, we ship to many countries worldwide. International shipping rates and
                      delivery times vary by location.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">How can I track my order?</h3>
                    <p>
                      Once your order ships, you'll receive a tracking number via email. You can use
                      this number to track your package on our website or the carrier's site.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns-faq">
              <AccordionTrigger>Returns FAQ</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">How do I initiate a return?</h3>
                    <p>
                      To start a return, log into your account, go to your order history, and select
                      the item you wish to return. Follow the prompts to generate a return label.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">What items are eligible for return?</h3>
                    <p>
                      Most items are eligible for return within 30 days of delivery. Items must be
                      unused and in their original packaging. Some exceptions apply to personal
                      items and sale merchandise.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">How long does it take to process a refund?</h3>
                    <p>
                      Once we receive your return, it typically takes 3-5 business days to process.
                      Refunds are issued to the original payment method.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        <CardFooter className="flex-col">
          <p className="mb-4">Still have questions about shipping or returns?</p>
          <Button asChild>
            <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              Contact Customer Support
            </a>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export const metadata = seo({
  title: 'Shipping & Returns',
  description: 'Learn more about our shipping and returns policies.',
  images: [
    '/api/og?title=Shipping%20%26%20Returns&description=Learn%20more%20about%20our%20shipping%20and%20returns%20policies.',
  ],
  url: '/home/shipping-returns',
})
