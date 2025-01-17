"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const adapters_1 = require("../../configs/adapters");
const middlewares_1 = require("../../configs/middlewares");
const notification_1 = require("../../controllers/notification");
exports.default = () => {
    const router = express_1.default.Router();
    router.route('/notification')
        .get(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(notification_1.getNotificationsController))
        .post(middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(notification_1.postNotificationController));
    router.patch('/notification-seen', middlewares_1.langCheck, middlewares_1.authCheck, (0, adapters_1.expressRouterAdapter)(notification_1.patchNotificationController));
    return router;
};
//# sourceMappingURL=notification.js.map