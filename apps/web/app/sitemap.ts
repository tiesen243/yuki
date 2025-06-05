import type { MetadataRoute } from 'next'

import { db } from '@yuki/db'

import { getBaseUrl, slugify } from '@/lib/utils'

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()
  const products = await db.query.products.findMany({
    columns: { id: true, name: true, updatedAt: true },
  })

  return [
    {
      url: url('/'),
      changeFrequency: 'yearly',
      priority: 1,
      lastModified: new Date('2004-06-22'),
    },
    ...products.map((product) => ({
      url: url(`${slugify(product.name)}-${product.id}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      lastModified: new Date(product.updatedAt),
    })),
  ]
}
