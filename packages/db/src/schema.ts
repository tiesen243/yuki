import { relations } from 'drizzle-orm'
import { index, pgEnum, pgTable, primaryKey } from 'drizzle-orm/pg-core'

export const users = pgTable(
  'user',
  (t) => ({
    id: t.varchar({ length: 25 }).primaryKey().$defaultFn(cuid).notNull(),
    name: t.varchar({ length: 255 }).notNull(),
    email: t.varchar({ length: 320 }).unique().notNull(),
    image: t.varchar({ length: 500 }).notNull(),
    createdAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  }),
  (t) => [index('user_email_idx').on(t.email)],
)

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  addresses: many(addresses),
  orders: many(orders),
}))

export const accounts = pgTable(
  'account',
  (t) => ({
    provider: t.varchar({ length: 25 }).notNull(),
    accountId: t.varchar({ length: 128 }).notNull(),
    userId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    password: t.varchar({ length: 255 }),
  }),
  (account) => [
    primaryKey({ columns: [account.provider, account.accountId] }),
    index('account_user_id_idx').on(account.userId),
    index('account_provider_idx').on(account.provider),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable(
  'session',
  (t) => ({
    token: t.varchar({ length: 64 }).primaryKey().notNull(),
    expires: t.timestamp({ mode: 'date', withTimezone: true }).notNull(),
    userId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  }),
  (t) => [index('session_user_id_idx').on(t.userId)],
)

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const addresses = pgTable(
  'address',
  (t) => ({
    id: t.varchar({ length: 25 }).primaryKey().$defaultFn(cuid).notNull(),
    default: t.boolean().default(false).notNull(),
    userId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: t.varchar({ length: 100 }).notNull(),
    phone: t.varchar({ length: 20 }).notNull(),
    address: t.varchar({ length: 255 }).notNull(),
    city: t.varchar({ length: 100 }).notNull(),
    state: t.varchar({ length: 100 }).notNull(),
    postalCode: t.varchar({ length: 20 }).notNull(),
    country: t.varchar({ length: 100 }).notNull(),
  }),
  (t) => [
    index('address_user_id_idx').on(t.userId),
    index('address_default_idx').on(t.default),
  ],
)

export const addressesRelations = relations(addresses, ({ one, many }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
  orders: many(orders),
}))

export const categories = pgTable(
  'category',
  (t) => ({
    id: t.varchar({ length: 25 }).primaryKey().$defaultFn(cuid).notNull(),
    name: t.varchar({ length: 50 }).notNull(),
    createdAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (t) => [index('category_name_idx').on(t.name)],
)

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}))

export const products = pgTable(
  'product',
  (t) => ({
    id: t.varchar({ length: 25 }).primaryKey().$defaultFn(cuid).notNull(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text().notNull(),
    image: t.varchar({ length: 500 }).notNull(),
    stock: t.integer().notNull(),
    price: t.real().notNull(),
    discount: t.real().default(0).notNull(),
    categoryId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
    createdAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  }),
  (t) => [
    index('product_name_idx').on(t.name),
    index('product_category_id_idx').on(t.categoryId),
  ],
)

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}))

export const orderItems = pgTable(
  'order_item',
  (t) => ({
    orderId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    price: t.real().notNull(),
    quantity: t.integer().notNull(),
  }),
  (t) => [
    primaryKey({ columns: [t.orderId, t.productId] }),
    index('order_item_order_id_idx').on(t.orderId),
    index('order_item_product_id_idx').on(t.productId),
  ],
)

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}))

export const orderStatus = pgEnum('order_status', [
  'new',
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])

export const orders = pgTable(
  'order',
  (t) => ({
    id: t.varchar({ length: 25 }).primaryKey().$defaultFn(cuid).notNull(),
    userId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    totalAmount: t.real().default(0).notNull(),
    status: orderStatus().default('new').notNull(),
    addressId: t
      .varchar({ length: 25 })
      .notNull()
      .references(() => addresses.id, { onDelete: 'set null' }),
    createdAt: t
      .timestamp({ mode: 'date', withTimezone: true })
      .defaultNow()
      .notNull(),
  }),
  (t) => [index('order_user_id_idx').on(t.userId)],
)

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  orderItems: many(orderItems),
}))

function cuid(): string {
  const alphabet = 'abcdefghijklmnpqrstuvwxyz0123456789'
  const timestamp = Date.now().toString(36).padStart(8, '0')

  const randomBytes = crypto.getRandomValues(new Uint8Array(16))
  const randomPart = Array.from(
    randomBytes,
    (byte) => alphabet[byte % alphabet.length],
  ).join('')

  return `c${timestamp}${randomPart}`
}
