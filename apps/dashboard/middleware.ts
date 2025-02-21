import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth } from '@yuki/auth'

const publicRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/forgot-password/reset',
]

export const middleware = async (req: NextRequest, _event: NextFetchEvent) => {
  const { pathname } = req.nextUrl
  const session = await auth(req)

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) return NextResponse.next()

  // Redirect to sign-in if no session
  if (!session.user) return NextResponse.redirect(new URL('/sign-in', req.url))

  if (session.user.role === 'USER')
    return NextResponse.redirect(new URL('/deny', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
