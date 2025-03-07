"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../config/db");
const schema_1 = require("../../config/db/schema");
class UserRepository {
    async post(dto) {
        const data = await db_1.db
            .insert(schema_1.userSchema)
            .values(dto)
            .returning({ id: schema_1.userSchema.id });
        return data[0].id;
    }
    async getOneByEmail(email) {
        const data = await db_1.db
            .select({
            id: schema_1.userSchema.id,
            firstName: schema_1.userSchema.firstName,
            lastName: schema_1.userSchema.lastName,
            email: schema_1.userSchema.email,
        })
            .from(schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.email, email));
        return data[0];
    }
    async getOneById(id) {
        const data = await db_1.db
            .select({
            id: schema_1.userSchema.id,
            firstName: schema_1.userSchema.firstName,
            lastName: schema_1.userSchema.lastName,
            email: schema_1.userSchema.email,
        })
            .from(schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.id, id))
            .limit(1);
        return data[0];
    }
    async getMonthlyGoal(id, startDate, endDate) {
        const monthlyGoalData = await db_1.db
            .select({ monthlyGoal: schema_1.userSchema.monthlyGoal })
            .from(schema_1.userSchema)
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.id, id));
        const monthlyGoal = Number(monthlyGoalData[0].monthlyGoal);
        const expenses = await db_1.db.execute((0, drizzle_orm_1.sql) `
        SELECT SUM(${schema_1.transactionSchema.value}) as total
        FROM ${schema_1.transactionSchema}
        WHERE ${schema_1.transactionSchema.userId} = ${id}
        AND ${schema_1.transactionSchema.type} = false
        AND ${schema_1.transactionSchema.date} BETWEEN ${startDate} AND ${endDate}
      `);
        const totalOfExpenses = Number(expenses[0].total);
        const percentageOfExpenses = (totalOfExpenses / monthlyGoal) * 100;
        return {
            monthlyGoal,
            totalOfExpenses,
            percentageOfExpenses: percentageOfExpenses > 0 ? percentageOfExpenses : 0,
        };
    }
    async updateMonthlyGoal(id, monthlyGoal) {
        await db_1.db
            .update(schema_1.userSchema)
            .set({ monthlyGoal: monthlyGoal.toString() })
            .where((0, drizzle_orm_1.eq)(schema_1.userSchema.id, id));
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map