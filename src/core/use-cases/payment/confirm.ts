import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirm({
    verifyTransaction,
    getByDoc,
    updateDoc,
    confirmTravel
}: any = {}) {
    if (!verifyTransaction || !getByDoc || !updateDoc || !confirmTravel) throw new ServerError()
    return async ({
        id,
        status
    }: any = {}) => {
        if (!id) throw new MissingParamError('id')
        if (!status) throw new MissingParamError('status')
        console.log(id, status)
        const res = await verifyTransaction(+id)
        console.log('payment res', res)
        const payment = await getByDoc('payments', 'payment-' + id)
        console.log(payment)
        await updateDoc('payments', 'payment-' + id, { status: res ? 1 : 0 })
        if (res) {
            const data = await confirmTravel({ ...payment, status: res ? 1 : 0 })
            return data
        } else {
            const message = { text: "Echec de paiement" }
            return { message }
        }
    }
}
