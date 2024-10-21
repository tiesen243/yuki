import { env } from '@/env'

/*
 * Get the base URL of the current environment
 * @returns {string} The base URL
 * @example getBaseUrl() // 'http://localhost:3000'
 * @example getBaseUrl() // 'https://yuki.tiesen.id.vn'
 */
export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`
}

/*
 * Get the website URL of the current app
 * @returns {string} The website URL
 * @example getDashboardUrl() // 'http://localhost:3000'
 * @example getDashboardUrl() // 'https://yuki.tiesen.id.vn'
 */
export function getWebsiteUrl() {
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return getBaseUrl().replace('dashboard.', '')
  return 'http://localhost:3000'
}

/*
 * Slugify a string
 * @returns {string} The slugified string
 * @example slugify('Hello World') // 'hello-world'
 * @example slugify('Hello World', '123') // 'hello-world-123'
 */
export function slugify(str: string, id?: string): string {
  str = str
    // Lower case everything
    .toLowerCase()
    // Handle Vietnamese
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    // Remove special characters
    .replace(/([^0-9a-z-\s])/g, '')
    // Replace spaces with -
    .replace(/\s+/g, '-')
    // Remove all dashes
    .replace(/-+/g, '-')
    // Remove all dashes at the beginning and the end
    .replace(/^-+|-+$/g, '')

  if (id) return `${str}-${id}`
  return str
}

/*
 * Get the ID from a slug
 * @returns {string} The ID
 * @example getIdFromSlug('hello-world-123') // '123'
 */
export function getIdFromSlug(slug: string): string {
  return slug.split('-').pop() ?? ''
}
