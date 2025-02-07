import '@/app/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@yuki/ui/toast'
import { cn } from '@yuki/ui/utils'

import { SessionProvider } from '@/hooks/use-session'
import { createMetadata } from '@/lib/metadata'
import { TRPCReactProvider } from '@/lib/trpc/react'
import { Footer } from './_components/footer'
import { Header } from './_components/header'

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <TRPCReactProvider>
            <SessionProvider>
              <Header />
              {children}
              <Footer />
            </SessionProvider>
          </TRPCReactProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata({})
