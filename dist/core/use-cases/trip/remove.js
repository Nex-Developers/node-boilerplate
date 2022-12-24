"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const unauthorized_error_1 = require("./../../../utils/errors/unauthorized-error");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeRemove({ tripDb, notifyDevice } = {}) {
    if (!tripDb || !notifyDevice)
        throw new errors_1.ServerError();
    const getLast48hours = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
    };
    return ({ id, cancelReason } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const prisma = helpers_1.DbConnection.prisma;
        if (!id)
            throw new errors_1.MissingParamError('id');
        if (!cancelReason)
            throw new errors_1.MissingParamError('cancelReason');
        return yield prisma.$transaction(() => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { userId, status, departureDate, departureTime, routes, canceledAt } = yield prisma.trip.findFirst({
                where: { id },
                select: {
                    userId: true,
                    departureDate: true,
                    departureTime: true,
                    status: true,
                    routes: {
                        select: {
                            id: true,
                            principal: true,
                            price: true,
                            fees: true,
                            travels: {
                                select: {
                                    id: true,
                                    userId: true,
                                    payment: {
                                        select: {
                                            id: true,
                                            amount: true,
                                            status: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    canceledAt: true
                }
            });
            if (!status)
                throw new errors_1.AlreadyDoneError(canceledAt.toString());
            if (status != 3)
                throw new unauthorized_error_1.UnauthorizedError();
            yield prisma.trip.update({ where: { id }, data: { status: 0, canceledAt: new Date(), cancelReason } });
            const departureDateTime = new Date(departureDate + ' ' + departureTime);
            const delay = getLast48hours(departureDateTime);
            const principal = routes.find(route => route.principal);
            if (delay < new Date()) {
                prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: 0.15 * (principal.price + principal.fees) } } });
            }
            const promises = routes.map((route) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const travelsIds = route.travels.map(travel => travel.id);
                yield prisma.travel.updateMany({
                    where: { id: { in: travelsIds } },
                    data: {
                        status: 0,
                        canceledAt: new Date(),
                        cancelReason,
                        canceledBy: 'driver',
                    },
                });
                const promises2 = yield route.travels.map((travel) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    const payment = travel.payment;
                    if (payment.status === 1) {
                        yield prisma.payment.update({ where: { id: payment.id }, data: { status: 0 } });
                        yield prisma.transfert.create({ data: { id: payment.id, userId: travel.userId, amount: payment.amount } });
                    }
                    return true;
                }));
                return Promise.all(promises2).then(() => true);
            }));
            return Promise.all(promises).then(() => {
                const message = { text: 'response.remove' };
                return { message };
            });
        }));
    });
}
exports.default = makeRemove;
//# sourceMappingURL=remove.js.map