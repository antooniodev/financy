"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const custom_error_1 = require("../../shared/errors/custom-error");
const user_repository_1 = require("./user-repository");
const repository = new user_repository_1.UserRepository();
class UserService {
    async findById(id) {
        const user = await repository.getOneById(id);
        if (!user)
            throw new custom_error_1.CustomError(404, 'Usuário não encontrado.');
        return user;
    }
    async create(dto) {
        const user = await repository.post(dto);
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map