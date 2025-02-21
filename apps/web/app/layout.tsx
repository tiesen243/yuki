import '@/app/globals.css'

import { Geist } from 'next/font/google'

import { Toaster } from '@yuki/ui/sonner'
import { cn, ThemeProvider } from '@yuki/ui/utils'
import { NextSSRPlugin, routerConfig } from '@yuki/uploader'

import { SessionProvider } from '@/hooks/use-session'
import { createMetadata } from '@/lib/metadata'
import { TRPCReactProvider } from '@/lib/trpc/react'
import { Footer } from './_components/footer'
import { Header } from './_components/header'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <SessionProvider>
              <Header />
              {children}
              <Footer />
            </SessionProvider>
          </TRPCReactProvider>

          <Toaster />
        </ThemeProvider>

        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={routerConfig}
        />
      </body>
    </html>
  )
}

export const metadata = createMetadata({})
