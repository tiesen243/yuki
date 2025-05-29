import { auth } from '@yuki/auth'

import { createMetadata } from '@/lib/metadata'
import { NavLinks } from './layout.client'

export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await auth()
  if (!user)
    return (
      <div className="container mx-auto p-4">
        <p>Please log in to view your profile.</p>
      </div>
    )

  return (
    <div className="container grid grow gap-4 py-4 md:grid-cols-12">
      <aside className="bg-sidebar max-w-full overflow-x-auto rounded-xl shadow-md md:col-span-3">
        <NavLinks />
      </aside>
      <main className="md:col-span-9">
        <h1 className="sr-only">{user.name}&apos;s Profile</h1>

        {children}
      </main>
    </div>
  )
}

export const generateMetadata = async () => {
  const { user } = await auth()
  if (!user) return createMetadata()

  return createMetadata({
    title: user.name,
    description: `Profile page of ${user.name}`,
    openGraph: {
      images: { url: user.image, alt: `Profile picture of ${user.name}` },
      url: '/profile',
    },
  })
}
