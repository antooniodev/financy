"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../config/db");
const schema_1 = require("../../config/db/schema");
const yup_1 = require("yup");
class TransactionRepository {
    async getAllInPeriod(userId, startDate, endDate) {
        console.log(userId);
        const data = db_1.db
            .select({
            id: schema_1.transactionSchema.id,
            title: schema_1.transactionSchema.title,
            value: schema_1.transactionSchema.value,
            type: schema_1.transactionSchema.type,
            date: schema_1.transactionSchema.date,
            category: {
                id: schema_1.categorySchema.id,
                title: schema_1.categorySchema.title,
                color: schema_1.categorySchema.color,
            },
        })
            .from(schema_1.transactionSchema)
            .innerJoin(schema_1.categorySchema, (0, drizzle_orm_1.eq)(schema_1.transactionSchema.categoryId, schema_1.categorySchema.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId), (0, drizzle_orm_1.gte)(schema_1.transactionSchema.date, startDate), (0, drizzle_orm_1.lte)(schema_1.transactionSchema.date, endDate)))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.transactionSchema.date));
        return data;
    }
    async getOneById(id, userId) {
        const data = await db_1.db
            .select({
            id: schema_1.transactionSchema.id,
            title: schema_1.transactionSchema.title,
            value: schema_1.transactionSchema.value,
            type: schema_1.transactionSchema.type,
            date: schema_1.transactionSchema.date,
            category: {
                id: schema_1.transactionSchema.categoryId,
            },
        })
            .from(schema_1.transactionSchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.id, id), (0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId)));
        const transaction = data[0];
        return transaction;
    }
    async postOne(userId, dto) {
        const data = await db_1.db
            .insert(schema_1.transactionSchema)
            .values({
            title: dto.title,
            value: dto.value.toString(),
            type: dto.type,
            date: new Date(),
            categoryId: dto.categoryId,
            userId,
        })
            .returning({ id: schema_1.transactionSchema.id });
        const transactionId = data[0].id;
        return transactionId;
    }
    async putOne(id, userId, dto) {
        const data = await db_1.db
            .update(schema_1.transactionSchema)
            .set({
            title: dto.title,
            value: dto.value.toString(),
            date: new Date(dto.date),
            type: dto.type,
            categoryId: dto.categoryId,
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.id, id), (0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId)))
            .returning({ id: schema_1.transactionSchema.id });
        const transactionId = data[0].id;
        return transactionId;
    }
    async deleteOne(id, userId) {
        await db_1.db
            .delete(schema_1.transactionSchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.id, id), (0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId)));
    }
    async selectMetrics(userId) {
        const exepense = (0, drizzle_orm_1.sql) `SELECT COALESCE(SUM(${schema_1.transactionSchema.value}), 0) as expenses FROM ${schema_1.transactionSchema} WHERE ${(0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId), (0, drizzle_orm_1.eq)(schema_1.transactionSchema.type, false))}`.mapWith(yup_1.number);
        const incomes = (0, drizzle_orm_1.sql) `SELECT COALESCE(SUM(${schema_1.transactionSchema.value}), 0) as incomes FROM ${schema_1.transactionSchema} WHERE ${(0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactionSchema.userId, userId), (0, drizzle_orm_1.eq)(schema_1.transactionSchema.type, true))}`.mapWith(yup_1.number);
        const [expenseResult] = await db_1.db.execute(exepense);
        const [incomeResult] = await db_1.db.execute(incomes);
        return { ...expenseResult, ...incomeResult };
    }
}
exports.TransactionRepository = TransactionRepository;
//# sourceMappingURL=transaction-repository.js.map