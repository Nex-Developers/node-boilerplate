"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmRefund = exports.addRefund = void 0;
const tslib_1 = require("tslib");
const cinetpay_1 = require("../../services/cinetpay");
const notifications_1 = require("../../services/notifications");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const addRefund = (0, add_1.default)({ addCinetpayContacts: cinetpay_1.addCinetpayContacts, cinetpayTransfert: cinetpay_1.cinetpayTransfert });
exports.addRefund = addRefund;
const confirmRefund = (0, confirm_1.default)({ checkCinetpayTransfert: cinetpay_1.checkCinetpayTransfert, notifyUser: notifications_1.notifyUser });
exports.confirmRefund = confirmRefund;
//# sourceMappingURL=index.js.map