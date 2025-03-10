"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user-service");
const user_validator_1 = __importDefault(require("./user-validator"));
const service = new user_service_1.UserService();
class UserController {
    async register(req, res, next) {
        try {
            await user_validator_1.default.register.validate(req.body);
            const userId = await service.create(req.body);
            res.status(201).json({ id: userId });
        }
        catch (error) {
            next(error);
        }
    }
    async listById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await service.findById(id);
            res.status(200).json({ user });
        }
        catch (error) {
            next(error);
        }
    }
    async updateMonthlyGoal(req, res, next) {
        try {
            const { userId, monthlyGoal } = await user_validator_1.default.updateMonthlyGoal.validate({
                userId: req.headers.userId,
                monthlyGoal: req.body.monthlyGoal,
            });
            await service.updateMonthlyGoal(userId, monthlyGoal);
            res.status(204).json({});
        }
        catch (error) {
            next(error);
        }
    }
    async getMonthlyGoal(req, res, next) {
        try {
            const { userId } = await user_validator_1.default.findMonthlyGoal.validate({
                userId: req.headers.userId,
            });
            const monthlyGoal = await service.getMonthlyGoal(userId);
            res.status(200).json(monthlyGoal);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map