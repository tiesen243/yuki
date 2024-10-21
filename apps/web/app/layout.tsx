import '@yuki/ui/tailwind.css'

import { cn, ThemeProvider } from '@yuki/ui'

import { geistSans } from '@/lib/fonts'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn('min-h-dvh font-sans antialiased', geistSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
