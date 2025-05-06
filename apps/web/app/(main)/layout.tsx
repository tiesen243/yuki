import { Footer } from './_components/layouts/footer'
import { Header } from './_components/layouts/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
