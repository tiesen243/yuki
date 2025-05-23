import { NavLinks } from './layout.client'

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container grid grow gap-4 py-4 md:grid-cols-12">
      <aside className="bg-sidebar rounded-xl shadow-md md:col-span-3">
        <NavLinks />
      </aside>
      <main className="md:col-span-9">{children}</main>
    </div>
  )
}
