import { Discord } from 'arctic'

import { env } from '@yuki/env'

import { BaseProvider } from './base'

export class DiscordProvider extends BaseProvider {
  private readonly DISCORD_API_URL = 'https://discord.com/api/users/@me'
  private readonly DISCORD_CDN_URL = 'https://cdn.discordapp.com/avatars'
  private readonly DEFAULT_SCOPES = ['identify', 'email']
  protected provider: Discord

  constructor() {
    super()
    this.provider = new Discord(
      env.DISCORD_CLIENT_ID,
      env.DISCORD_CLIENT_SECRET,
      this.createCallbackUrl('discord'),
    )
  }

  /**
   * Creates an authorization URL for Discord OAuth
   */
  public createAuthorizationURL(state: string, codeVerifier: string | null) {
    return this.provider.createAuthorizationURL(
      state,
      codeVerifier,
      this.DEFAULT_SCOPES,
    )
  }

  /**
   * Fetches user data from Discord API using the provided authorization code
   * @see https://discord.com/developers/docs/topics/oauth2#client-credentials-flow
   */
  public async fetchUserData(
    code: string,
    codeVerifier: string | null,
  ): Promise<{
    providerAccountId: string
    name: string
    email: string
    image: string
  }> {
    const tokens = await this.provider.validateAuthorizationCode(
      code,
      codeVerifier,
    )
    const accessToken = tokens.accessToken()

    const response = await fetch(this.DISCORD_API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Discord API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as DiscordUserResponse

    // Generate avatar URL or use default if avatar is null
    const avatarUrl = user.avatar
      ? `${this.DISCORD_CDN_URL}/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`

    return {
      providerAccountId: user.id,
      name: user.username,
      email: user.email,
      image: avatarUrl,
    }
  }
}

interface DiscordUserResponse {
  id: string
  username: string
  email: string
  avatar: string | null
}
