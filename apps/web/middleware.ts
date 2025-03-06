import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth } from '@yuki/auth'

const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/forgot-password/reset',
]

export const middleware = async (req: NextRequest, _event: NextFetchEvent) => {
  const { pathname } = req.nextUrl
  const session = await auth(req)

  if (authRoutes.includes(pathname) && session.user)
    return NextResponse.redirect(new URL('/account/profile', req.url))

  if (pathname.startsWith('/account') && !session.user)
    return NextResponse.redirect(new URL('/sign-in', req.url))

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
