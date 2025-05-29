import type { Metadata as NextMetadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

type Metadata = Omit<NextMetadata, 'title' | 'keywords'> & {
  title: string
  keywords: string[]
}

export const createMetadata = (override: Partial<Metadata> = {}): Metadata => {
  const siteName = 'Yukinu'
  const title = override.title ? `${override.title} | ${siteName}` : siteName
  const description =
    override.description ??
    'Yukinu - Your complete e-commerce destination for shopping online with a wide selection of products, easy checkout, and secure payments.'

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
      'yukinu',
      'yuki',
      'e-commerce',
      'shopping',
      'online shopping',
      'tiesen243',
    ],
    openGraph: {
      url,
      title,
      description,
      siteName,
      type: 'website',
      images: [
        ...(Array.isArray(ogImages) ? ogImages : ogImages ? [ogImages] : []),
        { url: '/api/og', alt: 'Yukinu' },
      ],
      ...restOpenGraph,
    },
    twitter: {
      card: 'summary_large_image',
      ...override.twitter,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: url,
      ...override.alternates,
    },
    assets: '/assets',
    ...restOverride,
  }
}
