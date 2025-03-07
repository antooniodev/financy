"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const handle_error_1 = __importDefault(require("../shared/middlewares/handle-error"));
const db_1 = require("../config/db");
const app = (0, express_1.default)();
const PORT = 3333;
app.use((0, cors_1.default)({ origin: '*' }));
app.use('/api/v1', routes_1.default);
app.use((error, request, response, next) => {
    (0, handle_error_1.default)(error, request, response, next);
});
app.listen(PORT, () => {
    console.log(`(Server) running on port ${PORT}`);
    (0, db_1.testConnection)();
});
//# sourceMappingURL=server.js.map