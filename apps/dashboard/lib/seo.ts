import type { Metadata } from 'next'

import { getBaseUrl, getClientUrl } from '@/lib/utils'

interface Prams {
  title?: string
  description?: string
  images?: string[]
  url?: string
}

export const seo = (params: Prams): Metadata => {
  const siteName = 'Yuki'
  const title = params.title ? `${params.title} | ${siteName}` : siteName
  const description =
    params.description ??
    'A fullstack e-commerce application built with Turborepo, Next.js, React, Tailwind CSS, Prisma, and tRPC. This project has a features like authentication, database, and UI components.'
  const images = [...(params.images ?? []), `${getClientUrl()}/api/og`]
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl()

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    applicationName: siteName,
    facebook: { appId: '523462826928110' },
    openGraph: { url, images, siteName, type: 'website' },
    twitter: { card: 'summary_large_image', creatorId: '@tiesen243' },
    keywords: ['Turbo', 'Next.js', 'React', 'Tailwind CSS', 'Prisma', 'tRPC', 'E-commerce'],
    icons: {
      icon: `${getClientUrl()}/favicon.ico`,
      shortcut: `${getClientUrl()}/favicon-16x16.png`,
      apple: `${getClientUrl()}/apple-touch-icon.png`,
    },
    alternates: { canonical: url },
  }
}
