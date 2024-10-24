import '@yuki/ui/tailwind.css'

import { cn, ThemeProvider } from '@yuki/ui'

import { geistSans } from '@/lib/fonts'
import { seo } from '@/lib/seo'
import { TRPCReactProvider } from '@/lib/trpc/react'
import { Footer } from './_components/footer'

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <html lang="en" className="scroll-smooth" suppressHydrationWarning>
    <body className={cn('flex min-h-dvh flex-col font-sans', geistSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <TRPCReactProvider>
          {children}
          <Footer />
        </TRPCReactProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout

export const metadata = seo({})
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(240 10% 3.9%)' },
  ],
}
