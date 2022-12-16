"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const userlogs_1 = require("../../controllers/userlogs");
exports.default = () => {
    const router = express_1.default.Router();
    router.get('/logs', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(userlogs_1.getLogsController));
    router.get('/logs/:id', middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(userlogs_1.getUserLogsController));
    return router;
};
//# sourceMappingURL=logs.js.map