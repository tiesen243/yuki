import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seoPages = [
    'home',
    'home/contact-us',
    'home/shipping',
    'home/faqs',
    'home/size-guide',
    'home/about-us',
    'home/our-story',
    'home/careers',
    'home/sustainability',
    'home/privacy-policy',
    'home/terms-of-service',
  ]

  return seoPages.map((route) => ({
    url: `${getBaseUrl()}/${route}`,
    lastModified: new Date().toISOString(),
  }))
}
