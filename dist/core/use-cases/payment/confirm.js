"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
function makeConfirm({ decriptEvent, verifyTransaction, getByDoc, updateDoc, confirmTravel } = {}) {
    if (!decriptEvent || !verifyTransaction || !getByDoc || !updateDoc || !confirmTravel)
        throw new errors_1.ServerError();
    return ({ token, body } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!token)
            throw new errors_1.MissingParamError('token');
        if (!body)
            throw new errors_1.MissingParamError('body');
        const { entity, name } = body;
        console.log(name);
        if (!entity && !entity.id)
            return { recieved: false };
        console.log('status', entity.status);
        const status = (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1;
        yield updateDoc('payments', 'payment-' + entity.id, { status });
        if (status === 1) {
            const payment = yield getByDoc('payments', 'payment-' + entity.id);
            console.log(payment);
            const res = yield confirmTravel({ id: payment.paymentId, status: payment.status, amount: payment.amount, method: 'fedapay', reference: payment.id, validatedAt: new Date() });
            const bookingStatus = res && res.id ? 1 : 0;
            yield updateDoc('payments', 'payment-' + entity.id, { bookingStatus });
            return { recieved: false };
        }
        else {
            yield updateDoc('payments', 'payment-' + entity.id, { bookingStatus: 0 });
            const message = { recieved: true };
            return { message };
        }
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map