import '@/app/globals.css'

import { Geist } from 'next/font/google'

import { cn } from '@yuki/ui/utils'
import { NextSSRPlugin, routerConfig } from '@yuki/uploader'

import { createMetadata } from '@/lib/metadata'
import { Footer } from './_components/footer'
import { Header } from './_components/header'
import { Providers } from './providers'

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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

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
