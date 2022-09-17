"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeListItems({ travelDb } = {}) {
    if (!travelDb)
        throw new errors_1.ServerError();
    return ({ startAt, limit } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!startAt)
            startAt = 0;
        if (!limit)
            limit = 100;
        const data = yield travelDb.findMany({
            startAt,
            limit,
            select: {
                id: true,
                route: {
                    select: {
                        id: true,
                        price: true,
                        stops: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                },
                createdAt: true
            }
        });
        return { data };
    });
}
exports.default = makeListItems;
//# sourceMappingURL=list-items.js.map