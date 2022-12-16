"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const newsletter_1 = require("../../controllers/newsletter");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/newsletter')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, middlewares_1.adminCheck, (0, adapters_1.expressRouterAdapter)(newsletter_1.getNewslettersController))
        .post(middlewares_1.langCheck, (0, adapters_1.expressRouterAdapter)(newsletter_1.postNewsletterController));
    return router;
};
//# sourceMappingURL=newsletter.js.map