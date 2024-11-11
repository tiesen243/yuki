import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { uncachedAuth } from '@yuki/auth/uncached'

const publicPaths = ['/sign-in', '/sign-up', '/forgot-password', '/forgot-password/reset']

export const middleware = async (req: NextRequest) => {
  const session = await uncachedAuth()
  const pathName = new URL(req.url).pathname

  if (!session && !publicPaths.includes(pathName))
    return NextResponse.redirect(new URL('/sign-in', req.url))
  if (session && publicPaths.includes(pathName)) return NextResponse.redirect(new URL('/', req.url))

  if (pathName.startsWith('/admin') && session?.user.role !== 'ADMIN')
    return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
