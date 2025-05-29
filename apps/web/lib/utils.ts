import { env } from '@yuki/env'

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getDashboardUrl = () => {
  if (env.NEXT_PUBLIC_DASHBOARD_URL)
    return `https://${env.NEXT_PUBLIC_DASHBOARD_URL}`
  return 'http://localhost:3001'
}

export const slugify = (text: string) => {
  return (
    text
      .toLowerCase()
      // Replace Vietnamese accented characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      // Remove special characters
      .replace(/[^a-z0-9\s-]/g, '')
      // Replace whitespace and hyphens with single hyphen
      .replace(/[\s-]+/g, '-')
      // Trim hyphens from start and end
      .replace(/^-+|-+$/g, '')
  )
}
