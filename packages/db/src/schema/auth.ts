import { relations } from 'drizzle-orm'
import { pgTable, primaryKey } from 'drizzle-orm/pg-core'

import { posts } from './post'

export const users = pgTable('user', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  password: t.varchar({ length: 255 }),
  image: t.varchar({ length: 255 }).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: 'date', withTimezone: true })
    .$onUpdateFn(() => new Date()),
}))

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  posts: many(posts),
}))

export const accounts = pgTable(
  'account',
  (t) => ({
    provider: t.varchar({ length: 255 }).notNull(),
    providerAccountId: t.varchar({ length: 255 }).notNull(),
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
  }),
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ],
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = pgTable('session', (t) => ({
  sessionToken: t.varchar({ length: 255 }).primaryKey().notNull(),
  expires: t.timestamp({ mode: 'date', withTimezone: true }).notNull(),
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
}))

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))
