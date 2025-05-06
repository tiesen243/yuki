import '@/app/globals.css'

import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { SessionProvider } from '@yuki/auth/react'
import { Toaster } from '@yuki/ui/sonner'
import { cn, ThemeProvider } from '@yuki/ui/utils'

import { createMetadata } from '@/lib/metadata'
import { TRPCReactProvider } from '@/lib/trpc/react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-dvh font-sans antialiased', geistSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <TRPCReactProvider>
              <SessionProvider>{children}</SessionProvider>
            </TRPCReactProvider>
          </NuqsAdapter>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata()
