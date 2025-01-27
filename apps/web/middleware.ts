import type { NextRequest } from 'next/server'

import { auth } from '@yuki/auth'

export async function middleware(request: NextRequest) {
  const _nextUrl = new URL(request.nextUrl)
  const _session = await auth()
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
