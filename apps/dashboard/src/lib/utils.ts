import { env } from '@/env'

export const getAppUrl = () => {
  if (env.WEB_URL) return `https://${env.WEB_URL}`
  return 'http://localhost:3000'
}
