import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeValidateUserIdCard({
    userDb,
    walletDb,
    saveProfile
    // sendMail,
    // sendSms
}: any = {}) {
    if (!userDb || !walletDb || !saveProfile) throw new ServerError()
    return async function ({
        userId,
        response,
        cardNumber
    }: any = {}) {
        if (!userId) throw new MissingParamError('userId')
        if (!cardNumber && response == "validate") throw new MissingParamError('Card Number')

        const user = await userDb.findFirst({ where: { id: userId } })
        if (!user) throw new InvalidParamError('userId')
        if (user.idCardStatus != 2) throw new AlreadyDoneError('before')
        if (response !== "validate") {
            await userDb.updateOne({ where: { id: userId }, data: { idCardStatus: 0, idCardRejectionMessage: response, idCardModifiedAt: new Date() } })
            //    if (user.email) await sendMail({
            //         to: user.email,
            //         subject: "Your account has been rejected",
            //         text: `Your account has been rejected because: ${failureReason}`
            //     })
            //     else await sendSms({ to: user.phoneNumber, text: `Your account has been rejected because: ${failureReason}` })
        } else {
            const data: any = { idCardStatus: 1, idCardNumber: cardNumber, idCardModifiedAt: new Date(), status: 1 }
            if (user.driverLicenseStatus == 1) data.role = "driver"
            await userDb.updateOne({ where: { id: userId }, data })
            const wallet = await walletDb.findFirst({ where: { id: userId } })
            if (!wallet) await walletDb.insertOne({ data: { id: userId } })

            // await sendMail({
            //     to: user.email,
            //     subject: "Your account has been validated",
            //     text: `Your account has been validated`
            // })
        }
        saveProfile(userId)
        const message = { text: "response.edit" }
        return { message }
    }
}