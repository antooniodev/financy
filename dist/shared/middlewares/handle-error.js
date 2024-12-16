"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const custom_error_1 = require("../errors/custom-error");
const extractDuplicateKeyDetails = (message) => {
    const match = message.match(/unique constraint "(.*?)"/);
    if (match) {
        const constraintName = match[1];
        if (constraintName.includes('categories_title_unique')) {
            return 'Já existe uma categoria com este nome.';
        }
        if (constraintName.includes('users_email_unique')) {
            return 'Já existe uma conta vinculada a este email.';
        }
        return `Erro de duplicidade no campo relacionado à constraint "${constraintName}".`;
    }
    return null;
};
const postgresErrorMessages = {
    '23505': 'Valor duplicado para um campo único.',
};
const handleError = (error, request, response, _) => {
    if (error.code && postgresErrorMessages[error.code]) {
        const customMessage = extractDuplicateKeyDetails(error.message || postgresErrorMessages[error.code]);
        return response.status(409).json({
            error: customMessage,
        });
    }
    if (error instanceof custom_error_1.CustomError) {
        return response.status(error.statusCode).json({ error: error.message });
    }
    if (error instanceof yup_1.ValidationError) {
        return response.status(400).json({ error: error.message });
    }
    console.log('UNMAPPED ERROR', error.message);
    return response
        .status(500)
        .json({ error: 'Ocorreu um erro ao fazer a requisição.' });
};
exports.default = handleError;
//# sourceMappingURL=handle-error.js.map