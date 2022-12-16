"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const environment_1 = require("../../configs/environment");
class SmsServer {
    static send(phoneNumbers, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(' production ', environment_1.env.production);
            try {
                console.log(message);
                const { data } = yield axios_1.default.get(`${SmsServer.apiUrl}?key=${SmsServer.apiKey}&secret=${SmsServer.apiToken}&from=${SmsServer.sender}&to=${phoneNumbers[0]}&text=${message}`);
                console.log(data);
                return data;
            }
            catch (e) {
                console.log(e.message);
                return;
            }
        });
    }
}
exports.default = SmsServer;
SmsServer.apiUrl = environment_1.env.sms.url;
SmsServer.apiKey = environment_1.env.sms.key;
SmsServer.apiToken = environment_1.env.sms.token;
SmsServer.sender = environment_1.env.sms.sender;
//# sourceMappingURL=sms-server.js.map