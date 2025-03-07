"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_controller_1 = require("./authenticate-controller");
const authRouter = (0, express_1.Router)();
const controller = new authenticate_controller_1.AuthenticateController();
authRouter.post('/auth/session', controller.createSession);
exports.default = authRouter;
//# sourceMappingURL=authenticate-routes.js.map