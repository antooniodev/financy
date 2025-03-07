"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("./category-service");
const category_validator_1 = __importDefault(require("./category-validator"));
const service = new category_service_1.CategoryService();
class CategoryController {
    async listSummaryCategories(req, res, next) {
        try {
            const { userId, type, startDate, endDate } = await category_validator_1.default.getSummary.validate({
                userId: req.headers.userId,
                type: req.query.type,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            });
            const summary = await service.getSummaryOfCategoriesByPeriod(userId, type, startDate, endDate);
            res.status(200).json(summary);
        }
        catch (error) {
            next(error);
        }
    }
    async listAllCategories(req, res, next) {
        try {
            const { type } = await category_validator_1.default.findAll.validate({
                type: req.query.type,
                userId: req.headers.userId,
            });
            const categories = await service.findAllCategoriesByType(type);
            res.status(200).json(categories);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category-controller.js.map