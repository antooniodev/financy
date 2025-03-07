import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { numeric } from 'drizzle-orm/pg-core'
import { boolean, pgTable, real, text, timestamp } from 'drizzle-orm/pg-core'

export const userSchema = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  monthlyGoal: numeric('monthly_goal', { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const userRelations = relations(userSchema, ({ many }) => ({
  transactions: many(transactionSchema),
}))

export const categorySchema = pgTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull().unique(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
  type: boolean('type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const categoryRelations = relations(categorySchema, ({ many }) => ({
  transactions: many(transactionSchema),
}))

export const transactionSchema = pgTable('transactions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
  userId: text('user_id').notNull(),
  categoryId: text('category_id').notNull(),
  value: numeric('value', { precision: 15, scale: 2 }).notNull(),
  type: boolean('type').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const transactionsRelations = relations(
  transactionSchema,
  ({ one }) => ({
    category: one(categorySchema, {
      fields: [transactionSchema.categoryId],
      references: [categorySchema.id],
    }),
    user: one(userSchema, {
      fields: [transactionSchema.userId],
      references: [userSchema.id],
    }),
  })
)
