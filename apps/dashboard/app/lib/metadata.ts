import type { Route } from '../+types/root'
import { env } from '@/env'

interface MetadataOverride {
  title?: string
  description?: string
  openGraph?: {
    url?: string
    images?: string[]
    [key: string]: unknown
  }
}

export const createMetadata = (
  override: MetadataOverride,
): Route.MetaFunction => {
  const siteName = 'Yuki'
  const description =
    'An innovative E-Commerce application built using Turbo repo and Next.js, offering a seamless shopping experience with fast performance and modern design.'
  const title = override.title ? `${override.title} | ${siteName}` : siteName

  return (_: Route.MetaArgs) => [
    { title },
    { name: 'description', content: override.description ?? description },
    { name: 'application-name', content: siteName },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(override.openGraph?.url
      ? [{ property: 'og:url', content: override.openGraph.url }]
      : []),
    ...(override.openGraph?.images
      ? override.openGraph.images.map((image) => ({
          property: 'og:image',
          content: image,
        }))
      : []),
  ]
}

export const createLinks: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
  },
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: `${env.VITE_WEB_URL}/favicon.ico`,
  },
]
