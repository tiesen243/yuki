import type { NextPage } from 'next'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@yuki/ui/card'

import { seo } from '@/lib/seo'
import { policies } from './policies'

const Page: NextPage = () => (
  <main className="container py-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <p className="mb-6 text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {policies.map((policy, idx) => (
          <>
            <h2 key={`title-${idx}`} className="mb-4 mt-6 text-2xl font-semibold">
              {policy.title}
            </h2>

            <p key={`desc-${idx}`}>{policy.description}</p>
            {policy.list && (
              <ul className="mt-2 list-disc pl-5">
                {policy.list.map((item, idx) => (
                  <li key={`item-${idx}`}>{item}</li>
                ))}
              </ul>
            )}
          </>
        ))}

        <address className="mt-2 not-italic">
          Yuki
          <br />
          1234 Main St, City, State, Zip
          <br />
          yuki@tiesen.id.vn
          <br />
          123-456-7890
        </address>

        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href="/home">Return to Home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </main>
)

export default Page

export const metadata = seo({
  title: 'Privacy Policy',
  description: 'Learn more about how we collect, use, and protect your personal information.',
  images: [
    '/api/og?title=Privacy%20Policy&description=Learn%20more%20about%20how%20we%20collect%2C%20use%2C%20and%20protect%20your%20personal%20information.',
  ],
  url: '/home/privacy-policy',
})
