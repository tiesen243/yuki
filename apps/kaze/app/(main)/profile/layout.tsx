import { Suspense } from 'react'

import { Navigation } from './layout.client'

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="container flex min-h-[calc(100vh-30rem)] flex-col gap-4 py-4 md:flex-row">
      <h1 className="sr-only">Profile page</h1>

      <Suspense fallback={<></>}>
        <Navigation />
      </Suspense>
      {children}
    </main>
  )
}
