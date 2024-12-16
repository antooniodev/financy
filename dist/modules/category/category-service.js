"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const custom_error_1 = require("../../shared/errors/custom-error");
const category_repository_1 = require("./category-repository");
const repository = new category_repository_1.CategoryRepository();
class CategoryService {
    async findMany(userId, type) {
        return await repository.getCategoriesToChartByType(userId, type);
    }
    async findOne(id, userId) {
        return await repository.getOne(id, userId);
    }
    async create(userId, dto) {
        return await repository.postOne(userId, dto);
    }
    async update(id, userId, dto) {
        const categoryExist = await repository.getOne(id, userId);
        if (!categoryExist)
            throw new custom_error_1.CustomError(400, 'Essa categoria não existe.');
        return await repository.putOne(id, userId, dto);
    }
    async delete(id, userId) {
        const categoryExist = await repository.getOne(id, userId);
        if (!categoryExist)
            throw new custom_error_1.CustomError(400, 'Essa categoria não existe.');
        await repository.deleteOne(id, userId);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map