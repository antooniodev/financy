"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateController = void 0;
const authenticate_service_1 = require("./authenticate-service");
const authenticate_validator_1 = __importDefault(require("../../shared/validators/authenticate-validator"));
const service = new authenticate_service_1.AuthenticateService();
class AuthenticateController {
    async createSession(req, res, next) {
        try {
            const { email, password } = await authenticate_validator_1.default.body.validate(req.body);
            const userAuthenticated = await service.createSession(email, password);
            res.status(200).json(userAuthenticated);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthenticateController = AuthenticateController;
//# sourceMappingURL=authenticate-controller.js.map