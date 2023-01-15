"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTrip = exports.removeTrip = exports.listTripInfos = exports.listTrips = exports.editTrip = exports.finishTrip = exports.startTrip = exports.addTrip = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const map_1 = require("../../services/map");
const notifications_1 = require("../../services/notifications");
const payment_1 = require("../../services/payment");
const task_1 = require("../../services/task");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const confirm_1 = (0, tslib_1.__importDefault)(require("./confirm"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const start_1 = (0, tslib_1.__importDefault)(require("./start"));
const finish_1 = (0, tslib_1.__importDefault)(require("./finish"));
const firebase_1 = require("../../services/firebase");
const tripDb = new db_1.TripDb();
const vehicleDb = new db_1.VehicleDb();
const pricingDb = new db_1.PricingDb();
const addTrip = (0, add_1.default)({ saveProfile: firebase_1.saveProfile, tripDb, vehicleDb, pricingDb, calculMatrix: map_1.calculMatrix, calculPrice: payment_1.calculPrice, notifyDevice: notifications_1.notifyDevice, addTask: task_1.addTask });
exports.addTrip = addTrip;
const startTrip = (0, start_1.default)({ notifyDevice: notifications_1.notifyDevice, addTask: task_1.addTask });
exports.startTrip = startTrip;
const finishTrip = (0, finish_1.default)({ notifyDevice: notifications_1.notifyDevice });
exports.finishTrip = finishTrip;
const listTrips = (0, list_items_1.default)({ tripDb });
exports.listTrips = listTrips;
const listTripInfos = (0, list_item_infos_1.default)({ tripDb });
exports.listTripInfos = listTripInfos;
const removeTrip = (0, remove_1.default)({ tripDb, notifyDevice: notifications_1.notifyDevice });
exports.removeTrip = removeTrip;
const editTrip = (0, edit_1.default)({ tripDb });
exports.editTrip = editTrip;
const confirmTrip = (0, confirm_1.default)({ tripDb });
exports.confirmTrip = confirmTrip;
//# sourceMappingURL=index.js.map