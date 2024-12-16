"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = exports.categorySchema = exports.userSchema = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userSchema = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    firstName: (0, pg_core_1.text)('first_name').notNull(),
    lastName: (0, pg_core_1.text)('last_name').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    password: (0, pg_core_1.text)('password').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.categorySchema = (0, pg_core_1.pgTable)('categories', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_1.text)('title').notNull().unique(),
    color: (0, pg_core_1.text)('color').notNull(),
    icon: (0, pg_core_1.text)('icon').notNull(),
    type: (0, pg_core_1.boolean)('type').notNull(),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.userSchema.id),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
exports.transactionSchema = (0, pg_core_1.pgTable)('transactions', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(() => (0, cuid2_1.createId)()),
    title: (0, pg_core_1.text)('title').notNull(),
    userId: (0, pg_core_1.text)('user_id')
        .notNull()
        .references(() => exports.userSchema.id),
    categoryId: (0, pg_core_1.text)('category_id')
        .references(() => exports.categorySchema.id)
        .notNull(),
    value: (0, pg_core_1.real)('value').notNull(),
    type: (0, pg_core_1.boolean)('type').notNull(),
    date: (0, pg_core_1.timestamp)('date', { withTimezone: true }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
//# sourceMappingURL=schema.js.map