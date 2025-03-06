import Link from 'next/link'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@yuki/ui/accordion'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'
import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'

export default function FAQPage() {
  return (
    <main className="container space-y-12 py-16">
      <div className="space-y-4 text-center">
        <Typography variant="h1">Frequently Asked Questions</Typography>
        <p className="text-muted-foreground text-xl">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Our FAQ</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground leading-relaxed">
          We&apos;ve compiled a list of frequently asked questions to help you
          find the information you need quickly. If you can&apos;t find the
          answer to your question, please feel free to contact our customer
          support team.
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Typography variant="h2">General Questions</Typography>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: 'How do I create an account?',
              answer:
                'To create an account, click on the "Sign Up" button in the top right corner of our website. You\'ll need to provide your email address and create a password. You can also sign up using your Google or GitHub account for quicker access.',
            },
            {
              question: 'What payment methods do you accept?',
              answer:
                'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and various digital wallets including Apple Pay and Google Pay. For certain regions, we also support local payment options.',
            },
            {
              question: 'How can I track my order?',
              answer:
                "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can also check the status of your order by logging into your account and viewing your order history.",
            },
            {
              question: 'What is your return policy?',
              answer:
                'We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging. Some items, such as personalized products or intimate goods, cannot be returned for hygiene reasons.',
            },
          ].map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="space-y-8">
        <Typography variant="h2">Product Questions</Typography>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: 'Are your products eco-friendly?',
              answer:
                'Many of our products are designed with sustainability in mind. We clearly label all eco-friendly products in their descriptions with our "Green Choice" badge. We\'re continuously working to expand our range of environmentally friendly options.',
            },
            {
              question: 'Do you offer international shipping?',
              answer:
                'Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location. You can see estimated shipping costs by adding items to your cart and entering your shipping address before checkout.',
            },
            {
              question: 'How can I find the right size?',
              answer:
                "Each product page includes a detailed size guide. For clothing items, we provide measurements in both inches and centimeters. If you're still unsure, our customer service team can assist with specific sizing questions.",
            },
            {
              question: 'Are product warranties included?',
              answer:
                "Most electronics and appliances come with a manufacturer's warranty. The warranty period varies by product and is specified on the product page. Extended warranties are available for select items at an additional cost.",
            },
          ].map((item, index) => (
            <AccordionItem key={index} value={`product-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Shipping Information',
            description:
              'Find details about our shipping methods, timeframes, and tracking.',
          },
          {
            title: 'Returns & Exchanges',
            description:
              'Learn about our hassle-free return process and exchange policies.',
          },
          {
            title: 'Payment & Security',
            description:
              'Understand our secure payment process and data protection measures.',
          },
        ].map((value) => (
          <Card key={value.title}>
            <CardHeader>
              <CardTitle className="text-xl">{value.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="text-center">
        <CardHeader>
          <CardTitle>Still Have Questions?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Our customer support team is always ready to help with any questions
            or concerns you might have about our products or services.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'FAQ',
  description: 'Answers to frequently asked questions about Yuki.',
  openGraph: {
    images: `/api/og?title=${encodeURIComponent('FAQ')}&description=${encodeURIComponent('Answers to frequently asked questions about Yuki.')}`,
    url: '/faq',
  },
})
