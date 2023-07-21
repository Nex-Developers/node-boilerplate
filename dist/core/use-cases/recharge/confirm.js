"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirm({ updateTransaction, saveProfile } = {}) {
    if (!updateTransaction || !saveProfile)
        throw new errors_1.ServerError();
    return ({ token, body } = {}) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        if (!token)
            throw new errors_1.MissingParamError('token');
        if (!body)
            throw new errors_1.MissingParamError('body');
        const prisma = helpers_1.DbConnection.prisma;
        const { entity, name } = body;
        console.log(name);
        if (!entity && !entity.id)
            return { recieved: false };
        console.log('status', entity.status);
        const status = (entity.status === 'canceled' || entity.status === 'declined') ? 0 : entity.status === 'approved' ? 1 : -1;
        const transaction = yield prisma.transaction.findFirst({ where: { ref: 'trans-' + entity.id } });
        if (transaction.status !== 2)
            throw new errors_1.AlreadyDoneError(transaction.createdAt.toString());
        yield prisma.wallet.update({ where: { id: transaction.walletId }, data: { balance: { increment: transaction.amount } } });
        if (status === 1)
            yield prisma.transaction.update({ where: { id: transaction.id }, data: { status } });
        yield updateTransaction({ id: entity.id, status, params: {} });
        yield saveProfile(transaction.walletId);
        return { recieved: true };
    });
}
exports.default = makeConfirm;
//# sourceMappingURL=confirm.js.map