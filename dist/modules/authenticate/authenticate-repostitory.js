"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../../config/db");
const schema_1 = require("../../config/db/schema");
class AuthenticateRepository {
    async getUserByEmail({ email, password, }) {
        const data = await db_1.db
            .select({
            userId: schema_1.userSchema.id,
            firstName: schema_1.userSchema.firstName,
        })
            .from(schema_1.userSchema)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userSchema.email, email), (0, drizzle_orm_1.eq)(schema_1.userSchema.password, password)))
            .catch(error => {
            console.log(error);
            return [];
        });
        const user = data[0];
        return user;
    }
}
exports.AuthenticateRepository = AuthenticateRepository;
//# sourceMappingURL=authenticate-repostitory.js.map