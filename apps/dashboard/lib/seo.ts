import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

interface Prams {
  title?: string
  description?: string
  images?: string[]
  url?: string
}

export const seo = (params: Prams): Metadata => {
  const siteName = 'Create Yuki Turbo'
  const title = params.title ? `${params.title} | Create Yuki Turbo` : 'Create Yuki Turbo'
  const description =
    params.description ?? 'Clean and typesafe starter monorepo using Turborepo along with Next.js'
  const images = [...(params.images ?? []), '/api/og']
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl()

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: siteName,
    twitter: { card: 'summary_large_image' },
    openGraph: { url, images, siteName, type: 'website' },
    icons: { icon: 'https://tiesen.id.vn/favicon.ico' },
    alternates: { canonical: url },
  }
}
