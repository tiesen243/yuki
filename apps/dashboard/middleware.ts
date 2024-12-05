import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth } from '@yuki/auth'

const publicPath = ['/sign-in', '/sign-up', '/forgot-password', '/forgot-password/reset']

export default async (req: NextRequest) => {
  const pathname = new URL(req.nextUrl).pathname
  const session = await auth()

  if (!session && !publicPath.includes(pathname))
    return NextResponse.redirect(new URL('/sign-in', req.url))

  if (pathname.startsWith('/admin') && session?.user.role !== 'ADMIN')
    return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  unstable_allowDynamic: ['@yuki/auth', '@yuki/db'],
}
