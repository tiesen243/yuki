export interface CartItem {
  productId: string
  quantity: number
  productName: string
  productImage: string
  productPrice: number
}

export interface Cart {
  items: CartItem[]
  total: number
  createdAt: number
}
