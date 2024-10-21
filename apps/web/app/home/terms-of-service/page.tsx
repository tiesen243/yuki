import type { NextPage } from 'next'

import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'

import { seo } from '@/lib/seo'
import { terms } from './_data'

const Page: NextPage = () => (
  <main className="container py-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">Terms of Service</CardTitle>
      </CardHeader>

      <CardContent className="prose max-w-none">
        <p className="mb-6 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <p>
          Welcome to Yuki. These Terms of Service (&quot;Terms&quot;) govern your use of our
          website, mobile application, and services (collectively, the &quot;Service&quot;) operated
          by Yuki (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;). By accessing or using the
          Service, you agree to be bound by these Terms. If you disagree with any part of the Terms,
          you may not access the Service.
        </p>

        {terms.map((term, idx) => (
          <>
            <h2 key={`title-${idx}`} className="mb-4 mt-8 text-2xl font-semibold">
              {term.title}
            </h2>
            <p key={`desc-${idx}`}>{term.content}</p>
          </>
        ))}

        <div>
          <h2 className="mb-4 mt-8 text-2xl font-semibold">15. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            <strong>Yuki</strong>
            <br />
            Website:{' '}
            <a
              href="https://tiesen.id.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              tiesen.id.vn
            </a>
            <br />
            Email:{' '}
            <a href="mailto:support@tiesen.id.vn" className="hover:underline">
              support@tiesen.id.vn
            </a>
            <br />
            Phone:{' '}
            <a href="tel:+11234567890" className="hover:underline">
              +1 (123) 456-7890
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  </main>
)

export default Page

export const metadata = seo({
  title: 'Terms of Service',
  description: 'Read the terms of service for Yuki, your ultimate e-commerce platform.',
  images: [
    '/api/og?title=Terms%20of%20Service&description=Read%20the%20terms%20of%20service%20for%20Yuki%2C%20your%20ultimate%20e-commerce%20platform.',
  ],
  url: '/home/terms-of-service',
})
