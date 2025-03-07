"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("./transaction-service");
const transaction_validator_1 = __importDefault(require("./transaction-validator"));
const service = new transaction_service_1.TransactionService();
class TransactionController {
    async list(req, res, next) {
        try {
            const { userId, startDate, endDate, page, limit, orderBy } = await transaction_validator_1.default.findMany.validate({
                userId: req.headers.userId,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
                page: req.query.page,
                limit: req.query.limit,
                orderBy: req.query.orderBy,
            });
            const transactions = await service.findMany(userId, startDate, endDate, page, limit, orderBy);
            res.status(200).json(transactions);
        }
        catch (error) {
            next(error);
        }
    }
    async listOne(req, res, next) {
        try {
            const { userId, id } = await transaction_validator_1.default.findOne.validate({
                userId: req.headers.userId,
                id: req.params.id,
            });
            const transaction = await service.findOne(id, userId);
            res.status(200).json(transaction);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const { userId } = await transaction_validator_1.default.create.validate({
                title: req.body.title,
                value: req.body.value,
                type: req.body.type,
                date: req.body.date,
                categoryId: req.body.categoryId,
                userId: req.headers.userId,
            });
            const transaction = await service.create(userId, req.body);
            res.status(201).json({ id: transaction });
        }
        catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
        try {
            const { userId, id } = await transaction_validator_1.default.edit.validate({
                title: req.body.title,
                value: req.body.value,
                type: req.body.type,
                date: req.body.date,
                categoryId: req.body.categoryId,
                userId: req.headers.userId,
                id: req.params.id,
            });
            const transaction = await service.update(id, userId, req.body);
            res.status(201).json({ id: transaction });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId, id } = await transaction_validator_1.default.remove.validate({
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
    async listMetrics(req, res, next) {
        try {
            const { userId, startDate, endDate } = await transaction_validator_1.default.findMetrics.validate({
                userId: req.headers.userId,
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            });
            const metrics = await service.getMetrics(userId, startDate, endDate);
            res.status(200).json(metrics);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction-controller.js.map