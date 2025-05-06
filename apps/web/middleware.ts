import type { MiddlewareConfig } from 'next/server'
import { NextResponse } from 'next/server'

import { middleware } from '@yuki/auth'

const authRoutes: string[] = ['/login', '/register']
const protectedRoutes: string[] = ['/protected']

export default middleware(({ request, session }) => {
  const { pathname } = new URL(request.url)

  if (request.method === 'GET') {
    if (
      !session.user &&
      protectedRoutes.some((route) => pathname.startsWith(route))
    ) {
      const url = new URL('/login', request.url)
      url.searchParams.set('redirect_to', pathname)
      return NextResponse.redirect(url)
    }

    if (session.user && authRoutes.some((route) => pathname.startsWith(route)))
      return NextResponse.redirect(new URL('/', request.url))

    return NextResponse.next()
  }

  /**
   * CSRF Protection Implementation
   *
   * This middleware implements Cross-Site Request Forgery protection using origin verification:
   *
   * Security approach:
   * - Only requests with matching Origin and Host headers are allowed to proceed
   * - GET requests should be treated as safe (read-only operations)
   * - For non-GET requests, we verify that the request originated from our own domain
   *
   * Security considerations:
   * 1. Modern browsers automatically send Origin headers for cross-origin requests
   * 2. This approach is effective against basic CSRF attacks but should be combined with:
   *    - CSRF tokens for sensitive operations
   *    - SameSite cookie attributes (Strict or Lax)
   *    - Content-Type verification for additional protection
   *
   * Known exceptions:
   * - React Native clients bypass CSRF checks (identified by 'x-trpc-source' header)
   *   WARNING: This creates a security vulnerability and should be addressed by implementing
   *   a proper token-based authentication system for mobile clients before deployment.
   */

  const isReactNative = request.headers.get('x-trpc-source') === 'react-native'
  if (isReactNative) return NextResponse.next()

  const originHeader = request.headers.get('Origin') ?? ''
  const hostHeader =
    request.headers.get('Host') ?? request.headers.get('X-Forwarded-Host') ?? ''
  if (!originHeader || !hostHeader)
    return new NextResponse(null, { status: 403 })

  let originUrl: URL
  try {
    originUrl = new URL(originHeader)
  } catch {
    return new NextResponse(null, { status: 403 })
  }
  if (originUrl.host !== hostHeader)
    return new NextResponse(null, { status: 403 })

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    /*
     * Match all request paths starting with:
     * - api (API routes)
     */
    '/api/(.*)',
  ],
} satisfies MiddlewareConfig
