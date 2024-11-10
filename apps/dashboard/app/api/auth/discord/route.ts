import { discordAuth } from '@yuki/auth/oauth'

import { getBaseUrl } from '@/lib/utils'

export const GET = discordAuth(`${getBaseUrl()}/api/auth/discord/callback`)
