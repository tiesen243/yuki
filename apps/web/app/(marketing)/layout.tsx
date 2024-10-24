import { Footer } from './_components/footer'
import { Header } from './_components/header'

const MarketingLayout: React.FC<React.PropsWithChildren> = async ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default MarketingLayout
