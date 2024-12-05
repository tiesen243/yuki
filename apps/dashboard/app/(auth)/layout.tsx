import { Card } from '@yuki/ui/card'

import { seo } from '@/lib/seo'

export default ({ children }: { children: React.ReactNode }) => (
  <main className="grid min-h-dvh place-items-center">
    <Card className="w-full max-w-screen-md border-background md:border-border">{children}</Card>
  </main>
)

export const metadata = seo({
  title: 'Authenfication',
})
