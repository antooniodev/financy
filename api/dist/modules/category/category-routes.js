"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("./category-controller"));
const verify_token_1 = __importDefault(require("../../shared/middlewares/verify-token"));
const categoryRouter = (0, express_1.Router)();
const controller = new category_controller_1.default();
categoryRouter.get('/categories/summary/', verify_token_1.default, controller.listSummaryCategories);
categoryRouter.get(/categories/, verify_token_1.default, controller.listAllCategories);
exports.default = categoryRouter;
//# sourceMappingURL=category-routes.js.map