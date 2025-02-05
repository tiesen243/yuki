import { env } from '@/env'

export const getBaseUrl = () => {
  if (env.NUXT_PUBLIC_WEB_URL) return `https://${env.NUXT_PUBLIC_WEB_URL}`
  return 'http://localhost:3000'
}
