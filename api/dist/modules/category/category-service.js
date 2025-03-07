"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repository_1 = require("./category-repository");
const repository = new category_repository_1.CategoryRepository();
class CategoryService {
    async getSummaryOfCategoriesByPeriod(userId, type, starrtDate, endDate) {
        return await repository.getCategoriesByPeriodAndType(userId, type, starrtDate, endDate);
    }
    async findAllCategoriesByType(type) {
        return await repository.getAllCategoriesByType(type);
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map