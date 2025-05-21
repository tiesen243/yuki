import { db } from '@yuki/db'
import { categories, products } from '@yuki/db/schema'

const seedCategories = [
  'Electronics',
  'Books',
  'Clothing',
  'Toys',
  'Sports',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Grocery',
  'Automotive',
  'Office Supplies',
]

// Base products for each category
const productTemplates = {
  Electronics: [
    'Laptop',
    'Smartphone',
    'Headphones',
    'Tablet',
    'Smart Watch',
    'Camera',
    'Drone',
    'Speaker',
    'Monitor',
    'Keyboard',
  ],
  Books: [
    'Novel',
    'Cookbook',
    'Biography',
    'Self-Help Book',
    'Science Fiction',
    'History Book',
    "Children's Book",
    'Poetry',
    'Textbook',
    'Comic Book',
  ],
  Clothing: [
    'T-shirt',
    'Jeans',
    'Dress',
    'Sweater',
    'Jacket',
    'Socks',
    'Hat',
    'Scarf',
    'Shoes',
    'Gloves',
  ],
  Toys: [
    'Action Figure',
    'Doll',
    'Board Game',
    'Puzzle',
    'Remote Control Car',
    'Building Blocks',
    'Plush Toy',
    'Art Set',
    'Science Kit',
    'Toy Instrument',
  ],
  Sports: [
    'Basketball',
    'Tennis Racket',
    'Soccer Ball',
    'Yoga Mat',
    'Dumbbells',
    'Bicycle',
    'Golf Clubs',
    'Swimming Goggles',
    'Running Shoes',
    'Fishing Rod',
  ],
  'Home & Kitchen': [
    'Blender',
    'Coffee Maker',
    'Toaster',
    'Cookware Set',
    'Knife Set',
    'Food Storage',
    'Bedding',
    'Towels',
    'Curtains',
    'Vacuum Cleaner',
  ],
  'Beauty & Personal Care': [
    'Shampoo',
    'Face Cream',
    'Perfume',
    'Hair Dryer',
    'Makeup Kit',
    'Razor',
    'Toothbrush',
    'Lotion',
    'Nail Polish',
    'Sunscreen',
  ],
  Grocery: [
    'Coffee',
    'Tea',
    'Cereal',
    'Pasta',
    'Snacks',
    'Spices',
    'Canned Goods',
    'Juice',
    'Chocolate',
    'Nuts',
  ],
  Automotive: [
    'Car Freshener',
    'Windshield Wipers',
    'Floor Mats',
    'Car Cover',
    'Tire Inflator',
    'Car Wax',
    'Dash Cam',
    'Car Charger',
    'Jump Starter',
    'Tool Kit',
  ],
  'Office Supplies': [
    'Stapler',
    'Notebook',
    'Pen Set',
    'Desk Organizer',
    'Printer Paper',
    'Binder',
    'Calculator',
    'Desk Lamp',
    'Filing Cabinet',
    'Whiteboard',
  ],
}

function generateProducts() {
  const products: { name: string; description: string; category: string }[] = []

  Object.entries(productTemplates).forEach(([category, items]) => {
    items.forEach((item) => {
      // Create several variants of each product
      const variants = Math.floor(Math.random() * 3) + 1 // 1-3 variants per product
      for (let i = 0; i < variants; i++) {
        const suffix =
          variants > 1
            ? ` ${['Pro', 'Plus', 'Deluxe', 'Basic', 'Premium'][i % 5] ?? i + 1}`
            : ''
        products.push({
          name: `${item}${suffix}`,
          description: `A high-quality ${item.toLowerCase()} for everyday use.`,
          category: category,
        })
      }
    })
  })

  // Shuffle and limit to 100 products
  return products.sort(() => 0.5 - Math.random()).slice(0, 100)
}

const seedProducts = generateProducts()

async function main() {
  await db.delete(products)
  await db.delete(categories)

  const cs = await db
    .insert(categories)
    .values(seedCategories.map((name) => ({ name, image: '/assets/logo.svg' })))
    .returning()

  // Create a map of category names to IDs
  const categoryMap = new Map(cs.map((c) => [c.name, c.id]))

  const ps = await db
    .insert(products)
    .values(
      seedProducts.map((product) => ({
        name: product.name,
        description: product.description,
        stock: Math.floor(Math.random() * 100) + 1,
        price: parseFloat((Math.random() * (1000 - 50) + 50).toFixed(2)),
        image: '/assets/logo.svg',
        categoryId: categoryMap.get(product.category) ?? cs[0]?.id ?? '',
      })),
    )
    .returning()

  console.log('Categories seeded:', cs.length)
  console.log('Products seeded:', ps.length)
}

main()
  .then(() => {
    console.log('Seeding completed.')
  })
  .catch((error: unknown) => {
    console.error('Error seeding data:', error)
  })
  .finally(() => {
    process.exit(0)
  })
