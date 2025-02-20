import '@/globals.css'

import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import { buttonVariants } from '@yuki/ui/button'
import { Toaster } from '@yuki/ui/sonner'
import { Typography } from '@yuki/ui/typography'
import { ThemeProvider } from '@yuki/ui/utils'

import type { Route } from './+types/root'
import { env } from '@/env'
import { SessionProvider } from '@/hooks/use-session'
import { createLinks, createMetadata } from '@/lib/metadata'
import { TRPCReactProvider } from '@/lib/trpc/react'

export const meta: Route.MetaFunction = createMetadata({
  title: 'Dashboard',
})

export const links: Route.LinksFunction = () => createLinks()

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionProvider>{children}</SessionProvider>
          </TRPCReactProvider>

          <Toaster />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? 'Oops! Page Not Found' : 'Error'
    details =
      error.status === 404
        ? 'Looks like this page got lost in cyberspace!'
        : error.statusText || details
  } else if (
    env.NODE_ENV === 'development' &&
    error &&
    error instanceof Error
  ) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="container flex grow flex-col items-center justify-center py-8">
      <img
        src={`${env.VITE_WEB_URL}/assets/yuki.png`}
        alt="Yuki"
        width={300}
        height={300}
        className="mb-8 object-cover"
      />
      <Typography variant="h1" className="mb-4">
        {message}
      </Typography>
      <Typography className="mb-8">{details}</Typography>

      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}

      <Link
        to="/"
        className={buttonVariants({ variant: 'outline', size: 'lg' })}
      >
        Take me home
      </Link>
    </main>
  )
}
