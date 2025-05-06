import { Facebook } from 'arctic'

import { env } from '@yuki/env'

import { BaseProvider } from './base'

export class FacebookProvider extends BaseProvider {
  private readonly FACEBOOK_USER_INFO_URL = 'https://graph.facebook.com/me'
  private readonly DEFAULT_SCOPES = ['email', 'public_profile']
  private provider: Facebook

  constructor() {
    super()
    this.provider = new Facebook(
      env.FACEBOOK_CLIENT_ID,
      env.FACEBOOK_CLIENT_SECRET,
      this.createCallbackUrl('facebook'),
    )
  }

  /**
   * Creates an authorization URL for Facebook OAuth
   */
  public createAuthorizationURL(state: string, _codeVerifier: string | null) {
    return this.provider.createAuthorizationURL(state, this.DEFAULT_SCOPES)
  }

  /**
   * Fetches user data from Facebook API using the provided authorization code
   * @see https://developers.facebook.com/docs/graph-api/reference/user#Reading
   */
  public async fetchUserData(
    code: string,
    _codeVerifier: string | null,
  ): Promise<{
    providerAccountId: string
    name: string
    email: string
    image: string
  }> {
    const tokens = await this.provider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const searchParams = new URLSearchParams()
    searchParams.set('access_token', accessToken)
    searchParams.set('fields', ['id', 'name', 'picture', 'email'].join(','))
    const response = await fetch(
      `${this.FACEBOOK_USER_INFO_URL}?${searchParams.toString()}`,
    )
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Facebook API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as FacebookUserResponse
    console.log(user)

    return {
      providerAccountId: user.id,
      name: user.name,
      email: user.email,
      image: user.picture.data.url,
    }
  }
}

interface FacebookUserResponse {
  id: string
  name: string
  email: string
  picture: { data: { url: string } }
}
