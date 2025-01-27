import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

export const createMetadata = (
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'Create Yuki Turbo'
  const description =
    'Clean and typesafe starter monorepo using Turborepo along with Next.js and tRPC '

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
    title: override.title ? `${siteName} | ${override.title}` : siteName,
    description: override.description ?? description,
    applicationName: siteName,
    alternates: { canonical: url },
    twitter: { card: 'summary_large_image' },
    openGraph: { url, images, siteName, type: 'website', ...override.openGraph },
    icons: {
      // Replace with your own icons
      icon: 'https://tiesen.id.vn/favicon.ico',
      shortcut: 'https://tiesen.id.vn/favicon-16x16.png',
      apple: 'https://tiesen.id.vn/apple-touch-icon.png',
    },
  }
}
