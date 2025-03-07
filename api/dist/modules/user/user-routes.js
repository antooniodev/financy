"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user-controller"));
const verify_token_1 = __importDefault(require("../../shared/middlewares/verify-token"));
const userRouter = (0, express_1.Router)();
const controller = new user_controller_1.default();
userRouter.post('/user', controller.register);
userRouter.put('/user/monthly-goal', verify_token_1.default, controller.updateMonthlyGoal);
userRouter.get('/user/monthly-goal', verify_token_1.default, controller.getMonthlyGoal);
userRouter.get('/user/:id', verify_token_1.default, controller.listById);
exports.default = userRouter;
//# sourceMappingURL=user-routes.js.map