import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeCheckPassword({
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeTmpToken,
    comparePasswords
}: any = {}) {
    if (!userDb || !deviceDb || !generateToken || !saveToken || !removeTmpToken || !comparePasswords) throw new ServerError()
    return async function ({
        token,
        id,
        password,
        device
    }: any = {}) {
        if (!id) throw new InvalidParamError('Token')
        if (!password) throw new MissingParamError('password')
        if (!device) throw new MissingParamError('device')

        let user = await userDb.findFirst({ where: { id } })
        if (! await comparePasswords({ hash: user.password, password })) throw new InvalidParamError('password')
        const savedDevice = await deviceDb.findFirst({ where: { id: device.id, userId: user.id } })
        if (!savedDevice) await deviceDb.insertOne({
            data: {
                id: device.id,
                userId: user.id,
                token: device.token,
                platform: device.platform
            }
        })
        const authToken = await generateToken({ id: user.id, role: user.role })
        await saveToken({ token: authToken })
        await removeTmpToken({ token })
        const message = { text: 'auth.message.login' }
        return { token: authToken, message, data: { id: user.id, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt } } 
    }
}