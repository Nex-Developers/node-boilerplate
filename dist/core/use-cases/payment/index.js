"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayment = exports.requestPayment = exports.listPaymentInfos = exports.listPayments = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const helpers_1 = require("../../../utils/helpers");
const payment_1 = require("../../services/payment");
const travel_1 = require("../travel");
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const request_1 = (0, tslib_1.__importDefault)(require("./request"));
const paymentDb = new db_1.PaymentDb();
const listPayments = (0, list_items_1.default)({ paymentDb });
exports.listPayments = listPayments;
const listPaymentInfos = (0, list_item_infos_1.default)({ paymentDb });
exports.listPaymentInfos = listPaymentInfos;
const requestPayment = (0, request_1.default)({ pay: payment_1.pay });
exports.requestPayment = requestPayment;
const validatePayment = (0, confirm_1.default)({ verifyTransaction: helpers_1.FedapayManager.verifyTransaction, getByDoc: helpers_1.FirestoreDb.getByDoc, updateDoc: helpers_1.FirestoreDb.update, confirmTravel: travel_1.confirmPayment });
exports.validatePayment = validatePayment;
//# sourceMappingURL=index.js.map