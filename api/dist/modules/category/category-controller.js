"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("./category-service");
const category_validator_1 = __importDefault(require("./category-validator"));
const params_validator_1 = __importDefault(require("../../shared/validators/params-validator"));
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
            const { type } = await category_validator_1.default.findAllParams.validate({
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
    async listOne(req, res, next) {
        try {
            const { userId, id } = await params_validator_1.default.index.validate({
                userId: req.headers.userId,
                id: req.params.id,
            });
            const category = await service.findOne(id);
            res.status(200).json(category);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            await category_validator_1.default.bodyPost.validate(req.body);
            const userId = await params_validator_1.default.userId.validate(req.headers.userId);
            const categoryId = await service.create(req.body);
            res.status(201).json({ id: categoryId });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const { id, userId } = await params_validator_1.default.index.validate({
                userId: req.headers.userId,
                id: req.params.id,
            });
            await category_validator_1.default.bodyPut.validate(req.body);
            const categoryId = await service.update(id, req.body);
            res.status(200).json({ data: categoryId });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id, userId } = await params_validator_1.default.index.validate({
                userId: req.headers.userId,
                id: req.params.id,
            });
            await service.delete(id);
            res.status(200).json({});
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category-controller.js.map