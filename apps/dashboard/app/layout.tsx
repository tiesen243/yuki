import '@yuki/ui/tailwind.css'

import { auth } from '@yuki/auth'
import { SessionProvider } from '@yuki/auth/react'
import { cn, geistSans, ThemeProvider } from '@yuki/ui'
import { Toaster } from '@yuki/ui/sonner'

import { seo } from '@/lib/seo'
import { TRPCReactProvider } from '@/lib/tprc/react'

const RootLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-dvh font-sans antialiased', geistSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <SessionProvider session={session}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout

export const metadata = seo({
  title: 'Dashboard',
})
