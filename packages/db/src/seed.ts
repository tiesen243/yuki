import { db } from '.'
import { categories, products } from './schema'

async function main() {
  const insertedCategories = await db
    .insert(categories)
    .values([
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Garden' },
      { name: 'Sports & Outdoors' },
      { name: 'Beauty & Personal Care' },
      { name: 'Toys & Games' },
      { name: 'Automotive' },
    ])
    .returning()

  const productData = await fetchRandomProducts()
  await db.insert(products).values(
    productData.map((product) => ({
      name: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      stock: Math.floor(Math.random() * (100 - 10 + 1) + 10),
      discount: Math.floor(Math.random() * 101) / 100,
      categoryId:
        insertedCategories[
          Math.floor(Math.random() * insertedCategories.length)
        ]?.id ?? '',
    })),
  )
}

void main()

async function fetchRandomProducts() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`)
    const products = await response.json()
    return products as {
      title: string
      price: number
      description: string
      image: string
    }[]
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`)
  }
}
