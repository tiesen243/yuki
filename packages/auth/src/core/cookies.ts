'use server'

/**
 * Cookie management utilities for authentication
 *
 * Implements secure cookie handling for authentication sessions following
 * best practices as recommended by Lucia Auth.
 *
 * @see https://lucia-auth.com/sessions/cookies
 */
import { cookies } from 'next/headers'

/**
 * Default cookie options that will be applied to all cookies
 * unless explicitly overridden
 */
const DEFAULT_COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
}

/**
 * Cookie options type with proper typing for cookie attributes
 */
interface CookieOptions {
  path?: string
  domain?: string
  maxAge?: number
  expires?: number | Date
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  [key: string]: unknown
}

/**
 * Gets a cookie value either from a Request object or from Next.js cookies
 *
 * @param key - The name of the cookie to retrieve
 * @param req - Optional Request object to extract cookies from
 * @returns The cookie value if found, otherwise undefined
 */
async function getCookie(
  key: string,
  req?: Request,
): Promise<string | undefined> {
  if (req) return parseCookies(req)[key]
  return (await cookies()).get(key)?.value
}

/**
 * Sets a cookie with the specified key, value, and options
 *
 * @param key - The name of the cookie to set
 * @param value - The value to store in the cookie
 * @param options - Optional configuration for the cookie
 * @param res - Optional Response object to add the cookie to
 */
async function setCookie(
  key: string,
  value: string,
  options: CookieOptions = {},
  res?: Response,
): Promise<void> {
  const cookieOptions = {
    ...DEFAULT_COOKIE_OPTIONS,
    ...options,
  }

  if (res) {
    // Format Date objects to UTC string if present
    if (cookieOptions.expires instanceof Date)
      cookieOptions.expires = cookieOptions.expires.toUTCString() as never

    const cookieString = formatCookieString(key, value, cookieOptions)
    res.headers.append('set-cookie', cookieString)
  } else (await cookies()).set(key, value, cookieOptions)
}

/**
 * Deletes a cookie by setting its expiration to the past
 *
 * @param key - The name of the cookie to delete
 * @param res - Optional Response object to add the deletion header to
 */
async function deleteCookie(key: string, res?: Response): Promise<void> {
  if (res)
    res.headers.append(
      'set-cookie',
      `${key}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    )
  else (await cookies()).delete(key)
}

/**
 * Formats a cookie string with the provided key, value, and options
 *
 * @param key - The cookie name
 * @param value - The cookie value
 * @param options - The cookie options
 * @returns Formatted cookie string for the Set-Cookie header
 */
const formatCookieString = (
  key: string,
  value: string,
  options: Record<string, unknown>,
): string => {
  return `${key}=${value}; ${Object.entries(options)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ')}`
}

/**
 * Parses cookies from a Request object's headers
 *
 * @param req - The Request object containing cookie headers
 * @returns Object mapping cookie names to their values
 */
const parseCookies = (req: Request): Record<string, string | undefined> => {
  const cookieHeader = req.headers.get('cookie')
  if (!cookieHeader) return {}

  return cookieHeader
    .split(';')
    .reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split('=')
      if (key && value) acc[key] = decodeURIComponent(value)
      return acc
    }, {})
}

export { getCookie, setCookie, deleteCookie }
