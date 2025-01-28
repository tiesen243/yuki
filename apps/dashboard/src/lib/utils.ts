import { env } from '@/env'

export const getAppUrl = () => {
  if (env.NODE_ENV === 'production') return 'https://yuki.vercel.app'
  return 'http://localhost:3000'
}
