import { Footer } from '@/app/_components/footer'
import { Header } from '@/app/_components/header'

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
