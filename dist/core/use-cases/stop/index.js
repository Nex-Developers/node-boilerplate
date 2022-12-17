"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStop = exports.listStopInfos = exports.listStops = exports.editStop = exports.addStop = void 0;
const tslib_1 = require("tslib");
const db_1 = require("../../../db");
const add_1 = (0, tslib_1.__importDefault)(require("./add"));
const edit_1 = (0, tslib_1.__importDefault)(require("./edit"));
const list_item_infos_1 = (0, tslib_1.__importDefault)(require("./list-item-infos"));
const list_items_1 = (0, tslib_1.__importDefault)(require("./list-items"));
const remove_1 = (0, tslib_1.__importDefault)(require("./remove"));
const stopDb = new db_1.StopDb();
const routeDb = new db_1.RouteDb();
const addStop = (0, add_1.default)({ stopDb });
exports.addStop = addStop;
const editStop = (0, edit_1.default)({ stopDb });
exports.editStop = editStop;
const listStops = (0, list_items_1.default)({ routeDb });
exports.listStops = listStops;
const listStopInfos = (0, list_item_infos_1.default)({ stopDb });
exports.listStopInfos = listStopInfos;
const removeStop = (0, remove_1.default)({ stopDb });
exports.removeStop = removeStop;
//# sourceMappingURL=index.js.map