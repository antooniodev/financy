"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transaction_repository_1 = require("./transaction-repository");
const repository = new transaction_repository_1.TransactionRepository();
class TransactionService {
    async findOne(id, userId) {
        return await repository.getOneById(id, userId);
    }
    async findMany(user_id, startDate, endDate) {
        return await repository.getAllInPeriod(user_id, startDate, endDate);
    }
    async create(userId, dto) {
        return await repository.postOne(userId, dto);
    }
    async update(id, userId, dto) {
        return await repository.putOne(id, userId, dto);
    }
    async delete(id, user_id) {
        await repository.deleteOne(id, user_id);
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction-service.js.map