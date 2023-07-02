"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeSaveProfile({ getByDoc, getInCollection, set, setInCollection } = {}) {
    if (!getByDoc || !getInCollection || !set || !setInCollection)
        throw new errors_1.ServerError();
    return ({ id }) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!id)
            throw new errors_1.MissingParamError('id');
    });
}
exports.default = makeSaveProfile;
//# sourceMappingURL=archive-account.js.map