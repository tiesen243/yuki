/**
 * Cookie management utilities for authentication
 *
 * Implements secure cookie handling for authentication sessions following
 * best practices as recommended by Lucia Auth.
 *
 * @see https://lucia-auth.com/sessions/cookies
 */
import { cookies } from 'next/headers'

import type { AuthOptions } from '../types'

async function getCookie(
  key: string,
  request?: Request,
): Promise<string | undefined> {
  if (request) {
    const cookies = request.headers
      .get('cookie')
      ?.split(';')
      .reduce((acc: Record<string, string>, cookie) => {
        const [key, value] = cookie.trim().split('=')
        if (key && value) acc[key] = decodeURIComponent(value)
        return acc
      }, {})
    return cookies?.[key]
  }
  return (await cookies()).get(key)?.value
}

async function setCookie(
  key: string,
  value: string,
  options: Partial<AuthOptions['cookieOptions']> = {},
  response?: Response,
): Promise<void> {
  delete options.key

  if (response) {
    // Format Date objects to UTC string if present
    if (options.expires instanceof Date)
      options.expires = options.expires.toUTCString() as never

    const cookieString = `${key}=${value}; ${Object.entries(options)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')}`

    response.headers.append('set-cookie', cookieString)
  } else (await cookies()).set(key, value, options)
}

async function deleteCookie(key: string, response?: Response): Promise<void> {
  if (response)
    response.headers.append(
      'set-cookie',
      `${key}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    )
  else (await cookies()).delete(key)
}

export { getCookie, setCookie, deleteCookie }
