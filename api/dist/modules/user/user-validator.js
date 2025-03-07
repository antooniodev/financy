"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const register = yup.object().shape({
    firstName: yup.string().required("O campo 'firstName' é obrigatório"),
    lastName: yup.string().required("O campo 'lastName' é obrigatório"),
    email: yup
        .string()
        .email("O campo 'email' deve ser um email válido")
        .required("O campo 'email' é obrigatório"),
    password: yup.string().required("O campo 'password' é obrigatório"),
});
const updateMonthlyGoal = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    monthlyGoal: yup.number().required("O campo 'monthlyGoal' é obrigatório"),
});
const findMonthlyGoal = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
});
exports.default = {
    register,
    updateMonthlyGoal,
    findMonthlyGoal,
};
//# sourceMappingURL=user-validator.js.map