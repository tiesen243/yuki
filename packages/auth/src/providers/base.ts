import { env } from '@yuki/env'

/**
 * Common user profile data structure returned by all authentication providers
 */
export interface ProviderUserData {
  providerAccountId: string
  name: string
  email: string
  image: string
}

/**
 * Base abstract class for authentication providers
 */
export abstract class BaseProvider {
  /**
   * Creates authorization URL for the OAuth flow
   * @param state CSRF protection state parameter
   * @param codeVerifier PKCE code verifier (if supported by the provider)
   * @returns Complete authorization URL
   */
  abstract createAuthorizationURL(
    state: string,
    codeVerifier: string | null,
  ): URL

  /**
   * Fetches user data from provider API using the authorization code
   * @param code Authorization code from OAuth callback
   * @param codeVerifier PKCE code verifier (if used in authorization request)
   * @returns Standardized user profile data
   */
  abstract fetchUserData(
    code: string,
    codeVerifier: string | null,
  ): Promise<ProviderUserData>

  /**
   * Creates OAuth callback URL for a specific provider
   * @param provider Provider identifier (e.g., 'discord', 'github')
   * @returns Complete callback URL
   */
  protected createCallbackUrl(provider: string) {
    const baseUrl = env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : env.VERCEL_URL
        ? `https://${env.VERCEL_URL}`
        : // eslint-disable-next-line no-restricted-properties
          `http://localhost:${process.env.PORT ?? 3000}`
    return `${baseUrl}/api/auth/${provider}/callback`
  }
}
