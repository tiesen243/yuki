import type { Metadata } from 'next'

import { env } from '@/env'
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
    `${env.WEB_URL}/api/og?title=${encodeURIComponent(override.title ?? siteName)}&description=${encodeURIComponent(override.description ?? description)}`,
  ]

  return {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    manifest: `${env.WEB_URL}/manifest.webmanifest`,
    title: override.title ? `${override.title} | ${siteName}` : siteName,
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
      icon: `${env.WEB_URL}/favicon.ico`,
      shortcut: `${env.WEB_URL}/favicon-16x16.png`,
      apple: `${env.WEB_URL}/apple-touch-icon.png`,
    },
  }
}
