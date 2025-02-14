import { PrismaClient } from '@prisma/client'

import operators from './operators.json' with { type: 'json' }

const db = new PrismaClient()

const categoriesName = [
  'Electronics',
  'Books',
  'Clothing',
  'Sports',
  'Home & Garden',
  'Toys',
  'Automotive',
  'Health',
  'Food',
  'Music',
  'Movies',
  'Child',
  'Beauty',
  'Tools',
  'Gaming',
]

const main = async () => {
  await db.category.deleteMany()
  await db.category.createMany({
    data: categoriesName.map((c) => ({
      name: c,
      image: `https://picsum.photos/seed/${c.toLowerCase()}/300/300`,
    })),
  })

  const adminUser = await db.user.findFirst({ where: { role: 'ADMIN' } })
  if (!adminUser) throw new Error('Admin user not found')
  const categories = await db.category.findMany()

  await db.product.deleteMany()
  await db.product.createMany({
    data: operators.map((op) => ({
      name: op.name.replaceAll('_', ' ').replaceAll('%27', "'"),
      description: op.description,
      image: op.img,
      price: +(Math.random() * (200 - 10 + 1) + 10).toFixed(2),
      stock: Math.floor(Math.random() * (100 - 50 + 1) + 50),
      userId: adminUser.id,
      categoryId: categories.at(Math.floor(Math.random() * categories.length))?.id ?? '',
    })),
  })
}

main()
  .then(() => {
    console.log('Database seeded successfully!')
  })
  .catch((error: unknown) => {
    console.error('Error seeding database:', error)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(() => db.$disconnect())
