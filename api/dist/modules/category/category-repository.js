"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const index_1 = require("../../config/db/index");
const schema_1 = require("../../config/db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class CategoryRepository {
    async getCategoriesByPeriodAndType(userId, type, startDate, endDate) {
        const totalValueOfTransactions = await index_1.db.execute((0, drizzle_orm_1.sql) `SELECT COALESCE(SUM(${schema_1.transactionSchema}.value), 0) as total_value_of_transactions 
      FROM ${schema_1.transactionSchema} 
      WHERE ${schema_1.transactionSchema}.user_id = ${userId} 
      AND ${schema_1.transactionSchema}.type = ${type} 
      AND ${schema_1.transactionSchema.date} BETWEEN ${startDate} AND ${endDate}`);
        const totalValueInCategory = await index_1.db.execute((0, drizzle_orm_1.sql) `
       SELECT 
        ${schema_1.categorySchema}.id, 
        ${schema_1.categorySchema}.title AS label, 
        ${schema_1.categorySchema}.color, 
        ${schema_1.categorySchema}.icon, 
        COALESCE(SUM(${schema_1.transactionSchema}.value), 0) AS total_spent,
        COALESCE((SUM(${schema_1.transactionSchema}.value) / ${totalValueOfTransactions[0].total_value_of_transactions}) * 100, 0) AS value
      FROM 
        ${schema_1.categorySchema}
      LEFT JOIN 
        ${schema_1.transactionSchema} 
      ON 
        ${schema_1.transactionSchema}.category_id = ${schema_1.categorySchema}.id 
        AND ${schema_1.transactionSchema}.user_id = ${userId}
        AND ${schema_1.transactionSchema.date} BETWEEN ${startDate} AND ${endDate}
      WHERE 
        ${schema_1.categorySchema}.type = ${type}
      GROUP BY 
        ${schema_1.categorySchema}.id, ${schema_1.categorySchema}.title
      ORDER BY 
        total_spent DESC
      `);
        const data = totalValueInCategory.map(category => {
            return {
                id: String(category.id),
                label: String(category.label),
                color: String(category.color),
                icon: String(category.icon),
                value: Number(category.value),
                spent_total: Number(category.total_spent) ?? 0,
            };
        });
        return data;
    }
    async getAllCategoriesByType(type) {
        const data = await index_1.db
            .select({
            id: schema_1.categorySchema.id,
            title: schema_1.categorySchema.title,
            type: schema_1.categorySchema.type,
        })
            .from(schema_1.categorySchema)
            .where((0, drizzle_orm_1.eq)(schema_1.categorySchema.type, type));
        return data;
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category-repository.js.map