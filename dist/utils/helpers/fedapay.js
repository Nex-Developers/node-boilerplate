"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fedapay_1 = require("fedapay");
class FedapayManager {
    static connect() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            FedapayManager.app = fedapay_1.FedaPay;
            fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
            fedapay_1.FedaPay.setEnvironment("sandbox");
            return;
        });
    }
    static createTransaction(amount, firstname, lastname, email, phoneNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
                fedapay_1.FedaPay.setEnvironment("live");
                const transaction = yield fedapay_1.Transaction.create({
                    description: 'Description',
                    amount,
                    currency: {
                        iso: 'XOF'
                    },
                    customer: {
                        firstname,
                        lastname,
                        email: email || 'developer@nex-softwares.com',
                        phone_number: {
                            number: phoneNumber || '90000000',
                            country: 'TG'
                        }
                    }
                });
                const token = yield transaction.generateToken();
                return { url: token.url, transactionId: transaction.id };
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static createWithdrawTransaction(amount, firstname, lastname, phoneNumber) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
                fedapay_1.FedaPay.setEnvironment("live");
                const mode = 'togocel';
                console.log(amount, mode, firstname, lastname, phoneNumber);
                const body = {
                    amount,
                    currency: { iso: "XOF" },
                    customer: {
                        firstname,
                        lastname,
                        email: 'developer@nex-softwares.com',
                        phone_number: {
                            number: phoneNumber || '+22892942601',
                            country: 'TG'
                        }
                    }
                };
                const payout = yield fedapay_1.Payout.create(body);
                const res = yield payout.sendNow();
                return res;
            }
            catch (err) {
                console.log(err.message);
                return null;
            }
        });
    }
    static verifyTransaction(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            fedapay_1.FedaPay.setApiKey("sk_live_5XEQoAGhvm4J0B5bX79A0Qqc");
            fedapay_1.FedaPay.setEnvironment("live");
            const transaction = yield fedapay_1.Transaction.retrieve(id);
            return !!(transaction.status == "approved");
        });
    }
    static decriptEvent(body, sig) {
        const endpointSecret = "wh_live_wWCbnh89F7B6yONm_UlPEq_K";
        let event;
        try {
            event = fedapay_1.Webhook.constructEvent(body, sig, endpointSecret);
            return event;
        }
        catch (err) {
            console.log(err.message);
            return err;
        }
    }
}
exports.default = FedapayManager;
//# sourceMappingURL=fedapay.js.map