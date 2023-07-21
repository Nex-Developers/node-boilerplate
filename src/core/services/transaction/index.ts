import { FedapayManager, FirestoreDb } from "../../../utils/helpers";
import makeUpdate from "./confirm";
import makeSave from "./save";

const saveTransaction = makeSave({ createTransaction: FedapayManager.createTransaction, createWithdrawTransaction: FedapayManager.createWithdrawTransaction, set: FirestoreDb.set})
const updateTransaction = makeUpdate({ update: FirestoreDb.update })
export {
    saveTransaction,
    updateTransaction
}