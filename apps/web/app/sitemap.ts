import type { MetadataRoute } from 'next'

import { db } from '@yuki/db'

import { getBaseUrl, slugify } from '@/lib/utils'

interface Route {
  url: string
  lastModified: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch static routes
  const routesMap: Route[] = [''].map((route) => ({
    url: `${getBaseUrl()}/${route}`,
    lastModified: new Date().toISOString(),
  }))

  const userRoutes = await Promise.all(
    await db.user
      .findMany({
        select: { id: true, name: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      })
      .then((users) =>
        users.map((user) => ({
          url: `${getBaseUrl()}/u/${slugify(user.name, user.id)}`,
          lastModified: new Date(user.createdAt).toISOString(),
        })),
      ),
  )

  const productRoutes = await Promise.all(
    await db.product
      .findMany({
        select: { id: true, name: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      })
      .then((products) =>
        products.map((product) => ({
          url: `${getBaseUrl()}/p/${slugify(product.name, product.id)}`,
          lastModified: new Date(product.createdAt).toISOString(),
        })),
      ),
  )

  // Fetch dynamic routes
  let fetchedRoutes: Route[] = []
  try {
    fetchedRoutes = (await Promise.all([userRoutes, productRoutes])).flat()
  } catch (error) {
    if (error instanceof Error) throw new Error(`Error fetching dynamic routes: ${error.message}`)
  }
  return [...routesMap, ...fetchedRoutes]
}
