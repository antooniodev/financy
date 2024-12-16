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
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map