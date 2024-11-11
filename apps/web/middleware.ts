import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const middleware = async (_req: NextRequest) => {
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
