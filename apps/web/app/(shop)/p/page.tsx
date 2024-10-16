import type { NextPage } from 'next'

import type { Query } from '@yuki/api'

import { seo } from '@/lib/seo'
import { SearchForm } from './_search-form'
import { PageClient } from './page.client'

const Page: NextPage<{ searchParams: Query }> = ({ searchParams }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    <SearchForm searchParams={searchParams} />
    <PageClient searchParams={searchParams} />
  </div>
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
