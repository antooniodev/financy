"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const custom_error_1 = require("../../shared/errors/custom-error");
const user_repository_1 = require("./user-repository");
const dayjs_1 = __importDefault(require("dayjs"));
const repository = new user_repository_1.UserRepository();
class UserService {
    async findById(id) {
        const user = await repository.getOneById(id);
        if (!user)
            throw new custom_error_1.CustomError(404, 'Usuário não encontrado.');
        return user;
    }
    async create(dto) {
        const user = await repository.post({ ...dto, monthlyGoal: '0' });
        return user;
    }
    async updateMonthlyGoal(id, monthlyGoal) {
        await repository.updateMonthlyGoal(id, monthlyGoal);
    }
    async getMonthlyGoal(id) {
        const startDate = (0, dayjs_1.default)().startOf('month').toString();
        const endDate = (0, dayjs_1.default)().endOf('month').toString();
        return repository.getMonthlyGoal(id, startDate, endDate);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map