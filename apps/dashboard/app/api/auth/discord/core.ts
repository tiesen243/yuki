import { Discord } from '@yuki/auth/lucia'

import { env } from '@/env'
import { getBaseUrl } from '@/lib/utils'

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  `${getBaseUrl()}/api/auth/discord/callback`,
)
