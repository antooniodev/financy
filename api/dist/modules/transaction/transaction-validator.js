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
const create = yup.object().shape({
    title: yup.string().required("O campo 'title' é obrigatório"),
    value: yup.number().required("O campo 'value' é obrigatório"),
    type: yup.string().required("O campo 'type' é obrigatório"),
    date: yup.date().required("O campo 'date' é obrigatório"),
    categoryId: yup.string().required("O campo 'categoryId' é obrigatório"),
    userId: yup.string().required("O campo 'userId' é obrigatório"),
});
const edit = yup.object().shape({
    title: yup.string().required("O campo 'title' é obrigatório"),
    value: yup.number().required("O campo 'value' é obrigatório"),
    type: yup.string().required("O campo 'type' é obrigatório"),
    date: yup.date().required("O campo 'date' é obrigatório"),
    categoryId: yup.string().required("O campo 'categoryId' é obrigatório"),
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    id: yup.string().required("O campo 'id' é obrigatório"),
});
const remove = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    id: yup.string().required("O campo 'id' é obrigatório"),
});
const findMany = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    page: yup.number().required("O campo 'page' é obrigatório"),
    limit: yup.number().required("O campo 'limit' é obrigatório"),
    startDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required("O campo 'startDate' é obrigatório"),
    endDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required("O campo 'endDate' é obrigatório"),
    orderBy: yup.string().required("O campo 'orderBy' é obrigatório"),
});
const findOne = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    id: yup.string().required("O campo 'id' é obrigatório"),
});
const findMetrics = yup.object().shape({
    userId: yup.string().required("O campo 'userId' é obrigatório"),
    startDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required("O campo 'startDate' é obrigatório"),
    endDate: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .required("O campo 'endDate' é obrigatório"),
});
exports.default = {
    create,
    edit,
    remove,
    findMany,
    findOne,
    findMetrics,
};
//# sourceMappingURL=transaction-validator.js.map