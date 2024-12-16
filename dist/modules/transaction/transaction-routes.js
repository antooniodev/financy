"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction-controller");
const verify_token_1 = __importDefault(require("../../shared/middlewares/verify-token"));
const transactionRouter = (0, express_1.Router)();
const controller = new transaction_controller_1.TransactionController();
transactionRouter.get('/transactions', verify_token_1.default, controller.list);
transactionRouter.get('/transactions/:id', verify_token_1.default, controller.listOne);
transactionRouter.post('/transactions', verify_token_1.default, controller.create);
transactionRouter.put('/transactions/:id', verify_token_1.default, controller.edit);
transactionRouter.delete('/transactions/:id', verify_token_1.default, controller.delete);
exports.default = transactionRouter;
//# sourceMappingURL=transaction-routes.js.map