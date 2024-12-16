"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("./category-service");
const category_validator_1 = __importDefault(require("../../shared/validators/category-validator"));
const params_validator_1 = __importDefault(require("../../shared/validators/params-validator"));
const service = new category_service_1.CategoryService();
class CategoryController {
    async list(req, res, next) {
        try {
            const { userId, type } = await category_validator_1.default.findParams.validate({
                userId: req.headers.userId,
                type: req.query.type,
            });
            const categories = await service.findMany(userId, type);
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
            const category = await service.findOne(id, userId);
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
            const categoryId = await service.create(userId, req.body);
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
            const categoryId = await service.update(id, userId, req.body);
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
            await service.delete(id, userId);
            res.status(200).json({});
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category-controller.js.map