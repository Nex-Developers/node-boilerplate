"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCinetpayTransfert = exports.cinetpayTransfert = exports.addCinetpayContacts = exports.getCinetpayBalance = exports.cinetpayLogin = void 0;
const tslib_1 = require("tslib");
const check_transfert_1 = require("./check-transfert");
const get_balance_1 = require("./get-balance");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const login_1 = require("./login");
const add_contacts_1 = require("./add-contacts");
const transfert_1 = require("./transfert");
const cinetpayLogin = (0, login_1.makeCinetpayLogin)({ axios: axios_1.default });
exports.cinetpayLogin = cinetpayLogin;
const getCinetpayBalance = (0, get_balance_1.makeGetCinetpayBalance)({ axios: axios_1.default, cinetpayLogin });
exports.getCinetpayBalance = getCinetpayBalance;
const addCinetpayContacts = (0, add_contacts_1.makeAddCinetpayContacts)({ axios: axios_1.default, cinetpayLogin });
exports.addCinetpayContacts = addCinetpayContacts;
const cinetpayTransfert = (0, transfert_1.makeCinetpayTransfert)({ axios: axios_1.default, cinetpayLogin });
exports.cinetpayTransfert = cinetpayTransfert;
const checkCinetpayTransfert = (0, check_transfert_1.makeCheckCinetpayTransfert)({ axios: axios_1.default, cinetpayLogin });
exports.checkCinetpayTransfert = checkCinetpayTransfert;
//# sourceMappingURL=index.js.map