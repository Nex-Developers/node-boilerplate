"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNotificationController = exports.getNotificationsController = exports.postNotificationController = void 0;
const tslib_1 = require("tslib");
const notification_1 = require("../../core/use-cases/notification");
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_1 = (0, tslib_1.__importDefault)(require("./patch"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const postNotificationController = (0, post_1.default)({ publishNotifications: notification_1.publishNotifications });
exports.postNotificationController = postNotificationController;
const getNotificationsController = (0, get_items_1.default)({ listNotifications: notification_1.listNotifications });
exports.getNotificationsController = getNotificationsController;
const patchNotificationController = (0, patch_1.default)({ setAsSeen: notification_1.setAsSeen });
exports.patchNotificationController = patchNotificationController;
//# sourceMappingURL=index.js.map