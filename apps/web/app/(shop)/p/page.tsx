import type { NextPage } from 'next'

import type { Query } from '@yuki/api'

import { seo } from '@/lib/seo'
import { PageClient } from './page.client'

const Page: NextPage<{ searchParams: Query }> = ({ searchParams }) => (
  <main className="container flex-1 py-4">
    <PageClient searchParams={searchParams} />
  </main>
)

export default Page

export const metadata = seo({
  title: 'Products',
  description: 'All products available in the store',
  images: [
    '/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store&image=/api/og?title=Products&description=All products available in the store',
  ],
  url: '/p',
})
