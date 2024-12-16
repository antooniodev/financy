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
categoryRouter.get('/categories/', verify_token_1.default, controller.list);
categoryRouter.get('/categories/:id', verify_token_1.default, controller.listOne);
categoryRouter.post('/categories', verify_token_1.default, controller.create);
categoryRouter.delete('/categories/:id', verify_token_1.default, controller.delete);
categoryRouter.put('/categories/:id', verify_token_1.default, controller.update);
exports.default = categoryRouter;
//# sourceMappingURL=category-routes.js.map