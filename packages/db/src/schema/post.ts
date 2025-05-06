import { relations } from 'drizzle-orm'
import { pgTable } from 'drizzle-orm/pg-core'

import { users } from './auth'

export const posts = pgTable('post', (t) => ({
  id: t.uuid().primaryKey().defaultRandom().notNull(),
  title: t.varchar({ length: 255 }).notNull(),
  content: t.text().notNull(),
  authorId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: t.timestamp().defaultNow().notNull(),
}))

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}))
