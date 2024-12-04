import '@yuki/ui/tailwind.css'

import { cn, ThemeProvider } from '@yuki/ui'
import { geistMono, geistSans } from '@yuki/ui/fonts'
import { Toaster } from '@yuki/ui/toaster'

import { TRPCReactProvider } from '@/lib/trpc/react'

export default ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('min-h-dvh font-sans antialiased', geistSans.variable, geistMono.variable)}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
)
