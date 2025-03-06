import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { Session } from '@yuki/auth'

export const middleware = async (req: NextRequest, _event: NextFetchEvent) => {
  const { pathname } = req.nextUrl
  const session = await new Session().validateSessionToken(
    req.cookies.get('auth_token')?.value ??
      req.headers.get('Authorization')?.replace('Bearer ', '') ??
      '',
  )

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
