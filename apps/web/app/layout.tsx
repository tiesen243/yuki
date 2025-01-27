import '@yuki/ui/tailwind.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@yuki/ui/toaster'
import { cn } from '@yuki/ui/utils'

import { createMetadata } from '@/lib/metadata'
import { SessionProvider } from '@/lib/session'
import { TRPCReactProvider } from '@/lib/trpc/react'

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <TRPCReactProvider>
            <SessionProvider>{children}</SessionProvider>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata({})
