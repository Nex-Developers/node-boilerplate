"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors_1 = require("../../../utils/errors");
const helpers_1 = require("../../../utils/helpers");
function makeConfirmOtp({ getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken, saveProfile, notifyDevice } = {}) {
    if (!saveProfile || !notifyDevice || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken)
        throw new errors_1.ServerError();
    return function confirmOtp({ token, phoneNumber, otp, lang, device, changeAuthParam } = {}) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!phoneNumber)
                throw new errors_1.MissingParamError('phoneNumber');
            if (!otp)
                throw new errors_1.MissingParamError('otp');
            if (!device)
                throw new errors_1.MissingParamError('device');
            if (!token || !lang)
                throw new errors_1.ServerError();
            const prisma = helpers_1.DbConnection.prisma;
            console.log('change auth param', changeAuthParam);
            if (changeAuthParam) {
                const saved = yield helpers_1.CacheManager.get(phoneNumber);
                console.log('saved', saved);
                if (!saved)
                    throw new errors_1.InvalidParamError('changeAuthParam');
                const { id, code } = JSON.parse(saved);
                if (code !== otp)
                    throw new errors_1.OtpIncorrectError('');
                const message = { text: 'auth.message.otpVerified' };
                const { avatar, role, firstName, lastName, email, birthDay, createdAt } = yield prisma.user.update({
                    where: { id }, data: { phoneNumber },
                    select: {
                        avatar: true,
                        role: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        birthDay: true,
                        createdAt: true
                    }
                });
                const authToken = yield generateToken({ id, role });
                yield saveToken({ token: authToken });
                yield removeOtp({ phoneNumber });
                yield removeTmpToken({ token });
                saveProfile(id);
                return { token: authToken, data: { id, avatar, firstName, lastName, phoneNumber, email, birthDay, createdAt }, message };
            }
            else {
                const otpIndex = yield getOtp({ phoneNumber, otp });
                if (otpIndex === null || otpIndex === undefined)
                    throw new errors_1.OtpIncorrectError('');
                let user = yield userDb.findFirst({ where: { phoneNumber } });
                const phoneNumberVerifiedAt = new Date();
                let firstAuth = false;
                return yield prisma.$transaction((_) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                    if (!user) {
                        firstAuth = true;
                        user = yield userDb.insertOne({
                            data: {
                                phoneNumber,
                                phoneNumberVerifiedAt,
                                role: 'user',
                                status: 2,
                                firstName: "",
                                lastName: "",
                                language: lang,
                                password: "",
                                signUpMethod: "phoneNumber",
                            }
                        });
                    }
                    else
                        user = yield userDb.updateOne({ where: { id: user.id }, data: { phoneNumberVerifiedAt } });
                    console.log(user);
                    if (device.id && device.platform && device.token) {
                        const savedDevice = yield deviceDb.findFirst({ where: { id: device.id, userId: user.id } });
                        if (!savedDevice || savedDevice.token != device.token)
                            yield deviceDb.insertOne({
                                data: {
                                    id: device.id,
                                    userId: user.id,
                                    token: device.token,
                                    platform: device.platform
                                }
                            });
                    }
                    const { title, body, data, cover } = yield notifyDevice({ deviceTokens: [device["token"]], titleRef: { text: 'notification.otpVerified.title' }, messageRef: { text: 'notification.otpVerified.message', params: { phoneNumber } }, cover: null, data: null, lang: 'fr' });
                    yield prisma.publication.create({
                        data: {
                            title,
                            message: body,
                            data: data ? JSON.stringify(data) : null,
                            picture: cover,
                            notifications: {
                                create: {
                                    user: {
                                        connect: { id: user.id }
                                    }
                                }
                            }
                        }
                    });
                    const authToken = yield generateToken({ id: user.id, role: user.role });
                    yield saveToken({ token: authToken });
                    yield removeOtp({ phoneNumber });
                    yield removeTmpToken({ token });
                    saveProfile(user.id);
                    const message = { text: 'auth.message.otpVerified' };
                    return { token: authToken, data: { id: user.id, avatar: user.avatar, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, firstAuth, message };
                }));
            }
        });
    };
}
exports.default = makeConfirmOtp;
//# sourceMappingURL=confirm-otp.js.map