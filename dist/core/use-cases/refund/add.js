"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeAdd({ addCinetpayContacts, cinetpayTransfert } = {}) {
    if (!addCinetpayContacts || !cinetpayTransfert)
        throw new errors_1.ServerError();
    return ({ id, phone, prefix } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!phone)
            throw new errors_1.MissingParamError('phone');
        if (!prefix)
            throw new errors_1.MissingParamError('prefix');
        const message = { text: "response.add" };
        return { message, id };
    });
}
exports.default = makeAdd;
//# sourceMappingURL=add.js.map