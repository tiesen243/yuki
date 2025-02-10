import type { MetadataRoute } from 'next'

import { db } from '@yuki/db'

import { getBaseUrl, slugify } from '@/lib/utils'

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()

  const marketingPages = ['/about', '/contact', '/privacy', '/terms']
  const categories = await db.category.findMany()
  const products = await db.product.findMany()

  return [
    {
      url: url('/'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...marketingPages.map(
      (p) =>
        ({
          url: url(p),
          changeFrequency: 'yearly',
          priority: 0.8,
        }) as MetadataRoute.Sitemap[number],
    ),
    {
      url: url('/shop'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...categories.map(
      (c) =>
        ({
          url: url(`/shop/${slugify(c.name)}-${c.id}`),
          changeFrequency: 'monthly',
          priority: 0.7,
        }) as MetadataRoute.Sitemap[number],
    ),
    ...products.map(
      (p) =>
        ({
          url: url(`/${slugify(p.name)}-${p.id}`),
          changeFrequency: 'monthly',
          priority: 0.7,
        }) as MetadataRoute.Sitemap[number],
    ),
  ]
}
