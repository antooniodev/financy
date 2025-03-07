"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const custom_error_1 = require("../../shared/errors/custom-error");
const category_repository_1 = require("./category-repository");
const repository = new category_repository_1.CategoryRepository();
class CategoryService {
    async getSummaryOfCategoriesByPeriod(userId, type, starrtDate, endDate) {
        return await repository.getCategoriesByPeriodAndType(userId, type, starrtDate, endDate);
    }
    async findAllCategoriesByType(type) {
        return await repository.getAllCategoriesByType(type);
    }
    async findOne(id) {
        return await repository.getOne(id);
    }
    async create(dto) {
        return await repository.postOne(dto);
    }
    async update(id, dto) {
        const categoryExist = await repository.getOne(id);
        if (!categoryExist)
            throw new custom_error_1.CustomError(400, 'Essa categoria não existe.');
        return await repository.putOne(id, dto);
    }
    async delete(id) {
        const categoryExist = await repository.getOne(id);
        if (!categoryExist)
            throw new custom_error_1.CustomError(400, 'Essa categoria não existe.');
        await repository.deleteOne(id);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map