"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userRouter = (0, express_1.Router)();
const controller = new UserController_1.default();
userRouter.post("/user", (req, res) => {
    controller.create(req, res);
});
userRouter.get('/user/:id', (req, res) => {
    controller.listById(req, res);
});
exports.default = userRouter;
