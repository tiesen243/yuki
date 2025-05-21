import { Facebook } from 'arctic'

import type { ProviderUserData } from './base'
import { BaseProvider } from './base'

interface FacebookUserResponse {
  id: string
  email: string
  name: string
  picture: { data: { url: string } }
}

export class FacebookProvider extends BaseProvider {
  protected provider = new Facebook(
    process.env.FACEBOOK_CLIENT_ID ?? '',
    process.env.FACEBOOK_CLIENT_SECRET ?? '',
    this.createCallbackUrl('facebook'),
  )

  protected readonly API_URL = 'https://graph.facebook.com/me'
  protected readonly SCOPES = ['email', 'public_profile']

  public createAuthorizationURL(
    state: string,
    _codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(state, this.SCOPES)
  }

  public async fetchUserData(
    code: string,
    _codeVerifier: string | null,
  ): Promise<ProviderUserData> {
    const tokens = await this.provider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const searchParams = new URLSearchParams()
    searchParams.set('access_token', accessToken)
    searchParams.set('fields', ['id', 'name', 'picture', 'email'].join(','))
    const response = await fetch(`${this.API_URL}?${searchParams.toString()}`)
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Facebook API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as FacebookUserResponse

    return {
      accountId: user.id,
      email: user.email,
      name: user.name,
      image: user.picture.data.url,
    }
  }
}
