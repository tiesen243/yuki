import { Footer } from '../(main)/_components/layouts/footer'
import { Header } from './_header'

export default function MarketingLayout({
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
