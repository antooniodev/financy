"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRelations = exports.transactionSchema = exports.categoryRelations = exports.categorySchema = exports.userRelations = exports.userSchema = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.userSchema = (0, pg_core_2.pgTable)('users', {
    id: (0, pg_core_2.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    firstName: (0, pg_core_2.text)('first_name').notNull(),
    lastName: (0, pg_core_2.text)('last_name').notNull(),
    email: (0, pg_core_2.text)('email').notNull().unique(),
    password: (0, pg_core_2.text)('password').notNull(),
    monthlyGoal: (0, pg_core_1.numeric)('monthly_goal', { precision: 15, scale: 2 }).notNull(),
    createdAt: (0, pg_core_2.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.userSchema, ({ many }) => ({
    transactions: many(exports.transactionSchema),
}));
exports.categorySchema = (0, pg_core_2.pgTable)('categories', {
    id: (0, pg_core_2.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_2.text)('title').notNull().unique(),
    color: (0, pg_core_2.text)('color').notNull(),
    icon: (0, pg_core_2.text)('icon').notNull(),
    type: (0, pg_core_2.boolean)('type').notNull(),
    createdAt: (0, pg_core_2.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.categorySchema, ({ many }) => ({
    transactions: many(exports.transactionSchema),
}));
exports.transactionSchema = (0, pg_core_2.pgTable)('transactions', {
    id: (0, pg_core_2.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_2.text)('title').notNull(),
    userId: (0, pg_core_2.text)('user_id').notNull(),
    categoryId: (0, pg_core_2.text)('category_id').notNull(),
    value: (0, pg_core_1.numeric)('value', { precision: 15, scale: 2 }).notNull(),
    type: (0, pg_core_2.boolean)('type').notNull(),
    date: (0, pg_core_2.timestamp)('date', { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_2.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.transactionsRelations = (0, drizzle_orm_1.relations)(exports.transactionSchema, ({ one }) => ({
    category: one(exports.categorySchema, {
        fields: [exports.transactionSchema.categoryId],
        references: [exports.categorySchema.id],
    }),
    user: one(exports.userSchema, {
        fields: [exports.transactionSchema.userId],
        references: [exports.userSchema.id],
    }),
}));
//# sourceMappingURL=schema.js.map