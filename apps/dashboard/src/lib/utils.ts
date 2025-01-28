import { env } from '@/env'

export const getWebUrl = () => {
  if (env.VITE_WEB_URL) return `https://${env.VITE_WEB_URL}`
  return 'http://localhost:3000'
}
