import type { MiddlewareConfig, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { verifyRequestOrigin } from '@yukinu/auth/csrf'

export function middleware(request: NextRequest) {
  const isValidOrigin = verifyRequestOrigin(request)
  if (!isValidOrigin) return new NextResponse(null, { status: 403 })
  return NextResponse.next()
}

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
