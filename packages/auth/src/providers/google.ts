import { Google } from 'arctic'

import { env } from '@yuki/env'

import { BaseProvider } from './base'

export class GoogleProvider extends BaseProvider {
  private readonly GOOGLE_USER_INFO_URL =
    'https://openidconnect.googleapis.com/v1/userinfo'
  private readonly DEFAULT_SCOPES = ['openid', 'profile', 'email']
  private provider: Google

  constructor() {
    super()
    this.provider = new Google(
      env.GOOGLE_CLIENT_ID,
      env.GOOGLE_CLIENT_SECRET,
      this.createCallbackUrl('google'),
    )
  }

  /**
   * Creates an authorization URL for Google OAuth
   */
  public createAuthorizationURL(state: string, codeVerifier: string | null) {
    return this.provider.createAuthorizationURL(
      state,
      codeVerifier ?? '',
      this.DEFAULT_SCOPES,
    )
  }

  /**
   * Fetches user data from Google API using the provided authorization code
   * @see https://developers.google.com/identity/protocols/oauth2/openid-connect#obtainuserinfo
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
      codeVerifier ?? '',
    )
    const accessToken = tokens.accessToken()

    const response = await fetch(this.GOOGLE_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Google API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as GoogleUserResponse

    return {
      providerAccountId: user.sub,
      name: user.name,
      email: user.email,
      image: user.picture,
    }
  }
}

interface GoogleUserResponse {
  sub: string
  email: string
  name: string
  picture: string
}
