import { relations } from 'drizzle-orm'
import { index, pgEnum, pgTable, primaryKey } from 'drizzle-orm/pg-core'

/*
 * ============================================================================
 * ENUMS
 * ============================================================================
 */
export const userRolesEnum = pgEnum('user_role', ['admin', 'user'])
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'completed',
  'cancelled',
  'refunded',
])

/*
 * ============================================================================
 * USER MANAGEMENT
 * ============================================================================
 */
export const users = pgTable(
  'user',
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    email: t.varchar({ length: 255 }).unique().notNull(),
    image: t.varchar({ length: 255 }).notNull(),
    role: userRolesEnum().default('user').notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  }),
  (user) => [index().on(user.email), index().on(user.role)],
)

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  addresses: many(addresses),
  orders: many(orders),
}))

/*
 * ============================================================================
 * AUTHENTICATION
 * ============================================================================
 */
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
  (account) => [
    primaryKey({ columns: [account.provider, account.accountId] }),
    index().on(account.userId),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable(
  'session',
  (t) => ({
    token: t.varchar({ length: 255 }).primaryKey().notNull(),
    expires: t.timestamp({ mode: 'date', withTimezone: true }).notNull(),
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  }),
  (session) => [index().on(session.userId), index().on(session.expires)],
)

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

/*
 * ============================================================================
 * USER ADDRESSES
 * ============================================================================
 */
export const addresses = pgTable(
  'address',
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: t.varchar({ length: 255 }).notNull(),
    phone: t.varchar({ length: 50 }).notNull(),
    address: t.varchar({ length: 255 }).notNull(),
    city: t.varchar({ length: 100 }).notNull(),
    state: t.varchar({ length: 100 }).notNull(),
    country: t.varchar({ length: 100 }).notNull(),
    zipCode: t.varchar({ length: 20 }).notNull(),
    isDefault: t.boolean().default(false).notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (address) => [
    index().on(address.userId),
    index().on(address.userId, address.isDefault),
  ],
)

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
}))

/*
 * ============================================================================
 * PRODUCT CATALOG
 * ============================================================================
 */
export const categories = pgTable(
  'category',
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    description: t.varchar({ length: 255 }).notNull(),
    image: t.varchar({ length: 255 }).notNull(),
    createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (category) => [index().on(category.name)],
)

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const products = pgTable(
  'product',
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    description: t.text().notNull(),
    image: t.varchar({ length: 255 }).notNull(),
    price: t.real().notNull(),
    stock: t.integer().default(0).notNull(),
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
  }),
  (product) => [
    index().on(product.categoryId),
    index().on(product.price),
    index().on(product.stock),
    index().on(product.name),
  ],
)

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}))

/*
 * ============================================================================
 * ORDERS
 * ============================================================================
 */
export const orders = pgTable(
  'order',
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom().notNull(),
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    total: t.real().notNull(),
    status: orderStatusEnum().default('pending').notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
    updatedAt: t
      .timestamp({ withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  }),
  (order) => [
    index().on(order.userId),
    index().on(order.status),
    index().on(order.createdAt),
  ],
)

export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems),
  user: one(users, { fields: [orders.userId], references: [users.id] }),
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
    index().on(orderItem.orderId),
    index().on(orderItem.productId),
  ],
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))
