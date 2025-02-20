import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

export const createMetadata = (
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'Yuki'
  const description =
    'An innovative E-Commerce application built using Turbo repo and Next.js, offering a seamless shopping experience with fast performance and modern design.'

  const url = override.openGraph?.url
    ? `${getBaseUrl()}${override.openGraph.url}`
    : getBaseUrl()
  const images = [
    ...((override.openGraph?.images as [] | null) ?? []),
    `/api/og?title=${encodeURIComponent(override.title ?? siteName)}&description=${encodeURIComponent(override.description ?? description)}`,
  ]

  return {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    manifest: `${getBaseUrl()}/manifest.webmanifest`,
    title: override.title ? `${override.title} | ${siteName}` : siteName,
    keywords: [
      ...(Array.isArray(override.keywords)
        ? override.keywords
        : override.keywords
          ? [override.keywords]
          : []),
      'yuki',
      'tiesen',
      'tiesen243',
      'online shopping',
      'e-commerce',
      'shop online',
      'best deals',
      'digital marketplace',
      'secure shopping',
      'fast delivery',
      'online store',
      'discounts',
      'retail',
      'shopping cart',
      'buy online',
    ],
    description: override.description ?? description,
    applicationName: siteName,
    alternates: { canonical: url },
    twitter: { card: 'summary_large_image' },
    openGraph: {
      url,
      images,
      siteName,
      type: 'website',
      ...override.openGraph,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  }
}
