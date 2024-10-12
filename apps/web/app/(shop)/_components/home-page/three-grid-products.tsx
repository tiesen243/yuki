import { ThreeGridProductsClient } from './three-grid-products.client'

export const ThreeGridProducts: React.FC = async () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
    <ThreeGridProductsClient />
  </div>
)
