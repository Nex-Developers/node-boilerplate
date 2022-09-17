"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVehicleType = exports.listVehicleTypeInfos = exports.listVehicleTypes = exports.editVehicleType = exports.addVehicleType = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const vehicleTypeDb = new db_1.VehicleTypeDb();
const addVehicleType = (0, add_1.default)({ vehicleTypeDb });
exports.addVehicleType = addVehicleType;
const editVehicleType = (0, edit_1.default)({ vehicleTypeDb });
exports.editVehicleType = editVehicleType;
const listVehicleTypes = (0, list_items_1.default)({ vehicleTypeDb });
exports.listVehicleTypes = listVehicleTypes;
const listVehicleTypeInfos = (0, list_item_infos_1.default)({ vehicleTypeDb });
exports.listVehicleTypeInfos = listVehicleTypeInfos;
const removeVehicleType = (0, remove_1.default)({ vehicleTypeDb });
exports.removeVehicleType = removeVehicleType;
//# sourceMappingURL=index.js.map