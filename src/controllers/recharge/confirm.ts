import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostConfirmController({
    confirmRecharge
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request?.params?.id || "userId", 
            lastName: 'Fedapay',
            firstName: '',
            model: 'Recharge',
            path: '/api/recharge',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `Fedapay  ${Action.WRITE} recharge `
        } 
        try {
            const lang = request.lang,
                data = await confirmRecharge({body: request.body, token: request.token} )
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.modelId = data?.id || ''
                reqLog.description += data?.id
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            const lang = request.lang
            return HttpResponse.error(err, lang)()
        }
    }
}
