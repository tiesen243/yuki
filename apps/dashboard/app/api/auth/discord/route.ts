import { discord } from '@yuki/auth/oauth'

import { getBaseUrl } from '@/lib/utils'

export const GET = discord(`${getBaseUrl()}/api/auth/discord/callback`)
