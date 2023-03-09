"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTravelReportController = exports.postSelfConfirm = exports.postConfirmEnded = exports.postConfirmStarted = exports.postAskToEndController = exports.postAskToStartController = exports.postRatePassengerController = exports.postRateDriverController = exports.postNotifyController = exports.deleteTravelController = exports.patchTravelController = exports.postTravelController = exports.getTravelController = exports.getTravelsController = void 0;
const tslib_1 = require("tslib");
const travel_1 = require("../../core/use-cases/travel");
const delete_1 = (0, tslib_1.__importDefault)(require("./delete"));
const get_item_1 = (0, tslib_1.__importDefault)(require("./get-item"));
const get_items_1 = (0, tslib_1.__importDefault)(require("./get-items"));
const patch_1 = (0, tslib_1.__importDefault)(require("./patch"));
const post_1 = (0, tslib_1.__importDefault)(require("./post"));
const post_ask_to_end_1 = (0, tslib_1.__importDefault)(require("./post-ask-to-end"));
const post_ask_to_start_1 = (0, tslib_1.__importDefault)(require("./post-ask-to-start"));
const post_confirm_ended_1 = (0, tslib_1.__importDefault)(require("./post-confirm-ended"));
const post_confirm_started_1 = (0, tslib_1.__importDefault)(require("./post-confirm-started"));
const post_notify_1 = (0, tslib_1.__importDefault)(require("./post-notify"));
const post_rate_driver_1 = (0, tslib_1.__importDefault)(require("./post-rate-driver"));
const post_rate_passenger_1 = (0, tslib_1.__importDefault)(require("./post-rate-passenger"));
const post_self_confirm_ended_1 = (0, tslib_1.__importDefault)(require("./post-self-confirm-ended"));
const post_travel_report_1 = (0, tslib_1.__importDefault)(require("./post-travel-report"));
const getTravelsController = (0, get_items_1.default)({ listTravels: travel_1.listTravels });
exports.getTravelsController = getTravelsController;
const getTravelController = (0, get_item_1.default)({ listTravelInfos: travel_1.listTravelInfos });
exports.getTravelController = getTravelController;
const postTravelController = (0, post_1.default)({ addTravel: travel_1.addTravel });
exports.postTravelController = postTravelController;
const patchTravelController = (0, patch_1.default)({ editTravel: travel_1.editTravel });
exports.patchTravelController = patchTravelController;
const deleteTravelController = (0, delete_1.default)({ removeTravel: travel_1.removeTravel });
exports.deleteTravelController = deleteTravelController;
const postNotifyController = (0, post_notify_1.default)({ confirmPayment: travel_1.confirmPayment });
exports.postNotifyController = postNotifyController;
const postRateDriverController = (0, post_rate_driver_1.default)({ rateDriver: travel_1.rateDriver });
exports.postRateDriverController = postRateDriverController;
const postRatePassengerController = (0, post_rate_passenger_1.default)({ ratePassenger: travel_1.ratePassenger });
exports.postRatePassengerController = postRatePassengerController;
const postAskToStartController = (0, post_ask_to_start_1.default)({ askToStart: travel_1.askToStart });
exports.postAskToStartController = postAskToStartController;
const postAskToEndController = (0, post_ask_to_end_1.default)({ askToEnd: travel_1.askToEnd });
exports.postAskToEndController = postAskToEndController;
const postConfirmStarted = (0, post_confirm_started_1.default)({ confirmStart: travel_1.confirmStart });
exports.postConfirmStarted = postConfirmStarted;
const postConfirmEnded = (0, post_confirm_ended_1.default)({ confirmEnd: travel_1.confirmEnd });
exports.postConfirmEnded = postConfirmEnded;
const postSelfConfirm = (0, post_self_confirm_ended_1.default)({ selfConfirmEnd: travel_1.selfConfirmEnd });
exports.postSelfConfirm = postSelfConfirm;
const postTravelReportController = (0, post_travel_report_1.default)({ travelReport: travel_1.travelReport });
exports.postTravelReportController = postTravelReportController;
//# sourceMappingURL=index.js.map