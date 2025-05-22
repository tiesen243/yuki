export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container grid grow grid-cols-12">
      <aside className="col-span-3"></aside>
      <main className="col-span-9 py-4">{children}</main>
    </div>
  )
}
