import { createId } from '@paralleldrive/cuid2'
import { boolean, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core'

export const userSchema = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const categorySchema = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull().unique(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
  type: boolean('type').notNull(),
  userId: text('user_id').references(() => userSchema.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const transactionSchema = pgTable('transactions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userSchema.id),
  categoryId: text('category_id').references(() => categorySchema.id),
  value: real('value').notNull(),
  type: boolean('type').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
