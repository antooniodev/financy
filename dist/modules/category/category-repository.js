"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const index_1 = require("../../config/db/index");
const schema_1 = require("../../config/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class CategoryRepository {
    async getCategoriesToChartByType(userId, type) {
        const totalTransactions = await index_1.db.$count(schema_1.transactionSchema);
        const totalValueOfTransactions = await index_1.db
            .execute((0, drizzle_orm_1.sql) `SELECT SUM(${schema_1.transactionSchema}.value) as total_value FROM ${schema_1.transactionSchema}`)
            .then(result => result[0].total_value);
        let transactionPercentage = (0, drizzle_orm_1.sql) `0`.mapWith(Number);
        if (totalTransactions > 0) {
            transactionPercentage = (0, drizzle_orm_1.sql) `
      (SELECT (COUNT(*) * 100) / ${totalValueOfTransactions} FROM ${schema_1.transactionSchema} WHERE ${schema_1.transactionSchema}.category_id = ${schema_1.categorySchema}.id)
      `.mapWith(Number);
        }
        const totalSpent = (0, drizzle_orm_1.sql) `
    COALESCE((SELECT SUM(${schema_1.transactionSchema}.value) FROM ${schema_1.transactionSchema} WHERE ${schema_1.transactionSchema}.category_id = ${schema_1.categorySchema}.id), 0)`.mapWith(Number);
        const data = index_1.db
            .select({
            id: schema_1.categorySchema.id,
            label: schema_1.categorySchema.title,
            icon: schema_1.categorySchema.icon,
            color: schema_1.categorySchema.color,
            value: transactionPercentage,
            spent: totalSpent,
        })
            .from(schema_1.categorySchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.categorySchema.userId, userId), (0, drizzle_orm_1.eq)(schema_1.categorySchema.type, type)));
        return data;
    }
    async getOne(id, userId) {
        const data = await index_1.db
            .select({
            id: schema_1.categorySchema.id,
            title: schema_1.categorySchema.title,
            icon: schema_1.categorySchema.icon,
            color: schema_1.categorySchema.color,
            type: schema_1.categorySchema.type,
        })
            .from(schema_1.categorySchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.categorySchema.id, id), (0, drizzle_orm_1.eq)(schema_1.categorySchema.userId, userId)));
        const category = data[0];
        return category;
    }
    async postOne(userId, dto) {
        const data = await index_1.db
            .insert(schema_1.categorySchema)
            .values({
            userId: userId,
            title: dto.title,
            icon: dto.icon,
            color: dto.color,
            type: dto.type,
        })
            .returning({ id: schema_1.categorySchema.id });
        const categoryId = data[0].id;
        return categoryId;
    }
    async putOne(id, userId, dto) {
        const data = await index_1.db
            .update(schema_1.categorySchema)
            .set({
            title: dto.title,
            icon: dto.icon,
            color: dto.color,
        })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.categorySchema.id, id), (0, drizzle_orm_1.eq)(schema_1.categorySchema.userId, userId)))
            .returning({ id: schema_1.categorySchema.id });
        const categoryId = data[0].id;
        return categoryId;
    }
    async deleteOne(id, userId) {
        await index_1.db
            .delete(schema_1.categorySchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.categorySchema.id, id), (0, drizzle_orm_1.eq)(schema_1.categorySchema.userId, userId)));
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category-repository.js.map