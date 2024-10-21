import type { NextPage } from 'next'
import Link from 'next/link'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@yuki/ui/accordion'
import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@yuki/ui/card'
import { CreditCard, HelpCircle, RotateCcw, ShoppingCart, Truck } from '@yuki/ui/icons'

import { seo } from '@/lib/seo'

const Page: NextPage = () => (
  <main className="container py-6">
    {/* Hero Section with Search */}
    <section className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mb-6 text-xl text-muted-foreground">
        Find answers to common questions about our products and services.
      </p>
    </section>

    <div className="flex flex-col gap-8 md:flex-row">
      {/* Sidebar with Quick Links */}
      <aside className="md:w-1/4">
        <Card>
          <CardHeader>
            <CardTitle>FAQ Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {faqCategories.map((category, index) => (
                <li key={index}>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href={`#${category.title.toLowerCase().replace(/\s/g, '-')}`}>
                      <category.icon className="mr-2 h-4 w-4" />
                      {category.title}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>

      {/* Main FAQ Content */}
      <div className="overflow-y-auto rounded-lg border p-6 md:max-h-[500px] md:w-3/4">
        {faqCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="mb-8">
            <h2
              id={category.title.toLowerCase().replace(/\s/g, '-')}
              className="mb-4 flex items-center text-2xl font-semibold"
            >
              <category.icon className="mr-2 h-6 w-6" />
              {category.title}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </div>
    </div>

    {/* Contact Section */}
    <section className="mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-6 w-6" />
            Need More Help?
          </CardTitle>
          <CardDescription>
            If you couldn't find the answer you were looking for, our support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" asChild>
            <a href="https://youtu.be/2Qwr87VX9t4" target="_blank" rel="noopener noreferrer">
              Contact Support
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  </main>
)

export default Page

export const metadata = seo({
  title: 'FAQs',
  description: 'Find answers to common questions about our products and services.',
  images: [
    '/api/og?title=FAQs&description=Find%20answers%20to%20common%20questions%20about%20our%20products%20and%20services.',
  ],
  url: '/home/faqs',
})

const faqCategories = [
  {
    title: 'Orders',
    icon: ShoppingCart,
    questions: [
      {
        question: 'How do I place an order?',
        answer:
          'To place an order, simply browse our products, add items to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information.',
      },
      {
        question: 'Can I modify or cancel my order?',
        answer:
          'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer support team for assistance.',
      },
      {
        question: 'How can I track my order?',
        answer:
          "Once your order is shipped, you'll receive a tracking number via email. You can use this number on our website or the carrier's site to track your package.",
      },
    ],
  },
  {
    title: 'Shipping',
    icon: Truck,
    questions: [
      {
        question: 'What are your shipping options?',
        answer:
          'We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to over 100 countries. International shipping times and fees vary depending on the destination.',
      },
      {
        question: 'Is shipping free?',
        answer:
          'We offer free standard shipping on orders over $50. Express and international shipping fees are calculated at checkout.',
      },
    ],
  },
  {
    title: 'Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
      },
      {
        question: 'Is it safe to use my credit card on your website?',
        answer:
          'Yes, our website uses SSL encryption to protect your personal and payment information. We are PCI DSS compliant for maximum security.',
      },
      {
        question: 'Can I pay using multiple payment methods?',
        answer:
          'Currently, we only support one payment method per transaction. If you need to split your payment, please place separate orders.',
      },
    ],
  },
  {
    title: 'Returns',
    icon: RotateCcw,
    questions: [
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some exceptions apply for hygiene products.',
      },
      {
        question: 'How do I initiate a return?',
        answer:
          "To initiate a return, log into your account, go to your orders, and select the 'Return' option for the relevant item. Follow the prompts to complete the process.",
      },
      {
        question: 'Do I have to pay for return shipping?',
        answer:
          "For standard returns, customers are responsible for return shipping costs. If the item is defective or we made an error, we'll provide a prepaid return label.",
      },
    ],
  },
]
