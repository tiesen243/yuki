import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { uncachedAuth } from '@yuki/auth/uncached'

const publicPaths = ['/sign-in', '/sign-up', '/forgot-password', '/forgot-password/reset']

export const middleware = async (req: NextRequest) => {
  const session = await uncachedAuth()
  const pathName = new URL(req.url).pathname

  if (!session) {
    if (!publicPaths.includes(pathName) && !pathName.startsWith('/api/auth'))
      return NextResponse.redirect(new URL('/sign-in', req.url))
  } else {
    if (publicPaths.includes(pathName) || pathName.startsWith('/api/auth'))
      return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
