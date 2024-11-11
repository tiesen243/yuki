import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { uncachedAuth } from '@yuki/auth/uncached'

export const middleware = async (req: NextRequest) => {
  const session = await uncachedAuth()
  const pathName = new URL(req.url).pathname

  if (pathName.startsWith('/admin') && session?.user.role !== 'ADMIN')
    return NextResponse.redirect(new URL('/', req.url))

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
