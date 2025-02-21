'use client'

import { Toaster } from '@yuki/ui/sonner'
import { ThemeProvider } from '@yuki/ui/utils'

import { SessionProvider } from '@/hooks/use-session'
import { TRPCReactProvider } from '@/lib/trpc/react'

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
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
)
