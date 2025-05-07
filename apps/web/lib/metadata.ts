import type { Metadata as NextMetadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

type Metadata = Omit<NextMetadata, 'title' | 'keywords'> & {
  title: string
  keywords: string[]
}

export const createMetadata = (override: Partial<Metadata> = {}): Metadata => {
  const siteName = 'Yuki'
  const title = override.title ? `${override.title} | ${siteName}` : siteName
  const description =
    override.description ??
    'Shop the latest products with fast shipping and secure checkout. Discover our wide selection of quality merchandise at competitive prices.'

  const {
    title: _,
    description: __,
    keywords = [],
    openGraph,
    ...restOverride
  } = override
  const { images: ogImages, url: ogUrl, ...restOpenGraph } = openGraph ?? {}
  const url = `${getBaseUrl()}${ogUrl ?? ''}`

  return {
    metadataBase: new URL(getBaseUrl()),
    applicationName: siteName,
    title,
    description,
    keywords: [
      ...keywords,
      'yuki',
      'ecommerce',
      'shop',
      'online shop',
      'shopping',
    ],
    openGraph: {
      url,
      title,
      description,
      siteName,
      type: 'website',
      images: [
        { url: '/api/og', alt: 'Yuki' },
        ...(Array.isArray(ogImages) ? ogImages : ogImages ? [ogImages] : []),
      ],
      ...restOpenGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...override.twitter,
    },
    icons: {
      icon: 'https://tiesen.id.vn/favicon.ico',
      shortcut: 'https://tiesen.id.vn/favicon-16x16.png',
      apple: 'https://tiesen.id.vn/apple-touch-icon.png',
    },
    alternates: {
      canonical: url,
      ...override.alternates,
    },
    assets: '/assets',
    ...restOverride,
  }
}
