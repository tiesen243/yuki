export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container grid grow gap-4 md:grid-cols-12">
      <aside className="md:col-span-3"></aside>
      <main className="md:col-span-9 md:py-4">{children}</main>
    </div>
  )
}
