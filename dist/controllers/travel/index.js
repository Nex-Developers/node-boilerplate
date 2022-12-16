"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotifyController = exports.deleteTravelController = exports.patchTravelController = exports.postTravelController = exports.getTravelController = exports.getTravelsController = void 0;
const tslib_1 = require("tslib");
const travel_1 = require("../../core/use-cases/travel");
const delete_1 = tslib_1.__importDefault(require("./delete"));
const get_item_1 = tslib_1.__importDefault(require("./get-item"));
const get_items_1 = tslib_1.__importDefault(require("./get-items"));
const patch_1 = tslib_1.__importDefault(require("./patch"));
const post_1 = tslib_1.__importDefault(require("./post"));
const post_notify_1 = tslib_1.__importDefault(require("./post-notify"));
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
//# sourceMappingURL=index.js.map