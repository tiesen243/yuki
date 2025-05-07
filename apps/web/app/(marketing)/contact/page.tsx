import { Typography } from '@yuki/ui/typography'

import { createMetadata } from '@/lib/metadata'
import { ContactForm } from './_components/contact-form'
import { ContactInfo } from './_components/contact-info'
import { MapSection } from './_components/map-section'

export default function ContactPage() {
  return (
    <main className="container py-8">
      <div className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Contact Us
        </Typography>
        <Typography variant="p" color="muted" className="mx-auto max-w-2xl">
          Have questions about Yuki? We&apos;re here to help. Fill out the form
          below and our team will get back to you as soon as possible.
        </Typography>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <Typography variant="h3" className="mb-6">
            Send us a message
          </Typography>
          <ContactForm />
        </div>
        <div>
          <Typography variant="h3" className="mb-6">
            Contact information
          </Typography>
          <ContactInfo />
          <div className="mt-10">
            <Typography variant="h4" className="mb-4">
              Our location
            </Typography>
            <MapSection />
          </div>
        </div>
      </div>

      <div className="mt-16 border-t pt-10">
        <Typography variant="h3" className="mb-6 text-center">
          Frequently Asked Questions
        </Typography>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              question: 'How can I track my order?',
              answer:
                'You can track your order by logging into your account and visiting the "Orders" section. Alternatively, you can use the tracking link sent to your email after purchase.',
            },
            {
              question: 'What payment methods do you accept?',
              answer:
                'We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.',
            },
            {
              question: 'How do I return an item?',
              answer:
                'To return an item, go to your order history, select the order containing the item you wish to return, and follow the return instructions. Returns must be initiated within 30 days of purchase.',
            },
            {
              question: 'Is my personal information secure?',
              answer:
                'Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your consent.',
            },
          ].map((faq, index) => (
            <div key={index} className="rounded-lg border p-6">
              <Typography variant="h5" className="mb-2">
                {faq.question}
              </Typography>
              <Typography variant="p" color="muted">
                {faq.answer}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export const metadata = createMetadata({
  title: 'Contact Us | Yuki',
  description:
    'Get in touch with the Yuki team for support, feedback, or partnership inquiries.',
  openGraph: { url: '/contact' },
})
