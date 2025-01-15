"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateService = void 0;
const custom_error_1 = require("../../shared/errors/custom-error");
const authenticate_repostitory_1 = require("./authenticate-repostitory");
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repository = new authenticate_repostitory_1.AuthenticateRepository();
class AuthenticateService {
    async createSession(email, password) {
        const user = await repository.getUserByEmail({ email, password });
        if (!user) {
            throw new custom_error_1.CustomError(404, 'Email ou senha incorretos.');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.userId, firstName: user.firstName }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '1d' });
        return {
            user: {
                userId: user.userId,
                firstName: user.firstName,
            },
            token,
        };
    }
}
exports.AuthenticateService = AuthenticateService;
//# sourceMappingURL=authenticate-service.js.map