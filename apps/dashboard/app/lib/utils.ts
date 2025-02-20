import type { Payment, Status } from '@yuki/db'
import type { Badge } from '@yuki/ui/badge'

import { env } from '@/env'

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin
  if (env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3001}`
}

export const mapStatusBadge: Record<
  Status | Payment,
  React.ComponentProps<typeof Badge>['variant']
> = {
  NEW: 'default',
  PENDING: 'warning',
  CONFIRMED: 'success',
  PROCESSING: 'info',
  DELIVERED: 'success',
  CANCELLED: 'destructive',
  PAID: 'success',
  UNPAID: 'destructive',
  REFUNDED: 'warning',
}
