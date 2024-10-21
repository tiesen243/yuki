import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

interface SeoParams {
  title?: string
  description?: string
  images?: string[]
  url?: string
}

/*
 * Generate SEO metadata
 * @returns {Metadata} The SEO metadata
 * @example seo({ title: 'Home', description: 'Welcome to Yuki' }) // { title: 'Home | Yuki', description: 'Welcome to Yuki', ... }
 */
export function seo(params: SeoParams): Metadata {
  const title = params.title ? `${params.title} | Yuki` : 'Yuki'
  const description =
    params.description ??
    'A full-stack e-commerce platform built with Turborepo, Next.js, tRPC, TailwindCSS and Prisma. It is a modern, fast, and secure platform that allows you to create your own e-commerce store with ease. Yuki is built with the latest technologies and best practices to ensure that your store is fast, secure, and scalable.'
  const images = [...(params.images ?? []), '/api/og']
  const url = params.url ? `${getBaseUrl()}${params.url}` : getBaseUrl()

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    creator: 'tiesen243',
    category: 'e-commerce',
    alternates: { canonical: url },
    facebook: { appId: '523462826928110' },
    authors: { name: 'tiesen243', url: 'https://tiesen.id.vn' },
    openGraph: { url, images, siteName: 'Yuki', type: 'website' },
    twitter: { card: 'summary_large_image', creatorId: '@tiesen243' },
    keywords: ['e-commerce', 'turborepo', 'next.js', 'tailwindcss', 'prisma', 'trpc'],
    icons: { icon: '/favicon.ico', shortcut: '/favicon-16x16.png', apple: '/apple-touch-icon.png' },
  }
}
