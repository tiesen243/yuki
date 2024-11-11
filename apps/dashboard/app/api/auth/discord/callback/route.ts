import { discordCallback } from '@yuki/auth/oauth'

import { getBaseUrl } from '@/lib/utils'

export const runtime = 'edge'

export const GET = discordCallback(`${getBaseUrl()}/api/auth/discord/callback`)
