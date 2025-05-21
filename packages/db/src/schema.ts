import { relations } from 'drizzle-orm'
import { pgTable, primaryKey } from 'drizzle-orm/pg-core'

export const users = pgTable('user', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  image: t.varchar({ length: 255 }).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  orders: many(orders),
}))

export const accounts = pgTable(
  'account',
  (t) => ({
    provider: t.varchar({ length: 255 }).notNull(),
    accountId: t.varchar({ length: 255 }).notNull(),
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    password: t.varchar({ length: 255 }),
  }),
  (account) => [primaryKey({ columns: [account.provider, account.accountId] })],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable('session', (t) => ({
  token: t.varchar({ length: 255 }).primaryKey().notNull(),
  expires: t.timestamp({ mode: 'date', withTimezone: true }).notNull(),
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const categories = pgTable('category', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  image: t.varchar({ length: 255 }).notNull(),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const products = pgTable('product', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  description: t.text().notNull(),
  image: t.varchar({ length: 255 }).notNull(),
  stock: t.integer().notNull(),
  price: t.integer().notNull(),
  categoryId: t
    .uuid()
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}))

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: one(orderItems, {
    fields: [products.id],
    references: [orderItems.productId],
  }),
}))

export const orderItems = pgTable(
  'order_item',
  (t) => ({
    orderId: t
      .uuid()
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: t
      .uuid()
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    quantity: t.integer().notNull(),
  }),
  (orderItem) => [
    primaryKey({ columns: [orderItem.orderId, orderItem.productId] }),
  ],
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))

export const orders = pgTable('order', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}))
