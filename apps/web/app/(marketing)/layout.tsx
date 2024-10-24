import { Header } from './_components/header'

const MarketingLayout: React.FC<React.PropsWithChildren> = async ({ children }) => (
  <>
    <Header />
    {children}
  </>
)

export default MarketingLayout
