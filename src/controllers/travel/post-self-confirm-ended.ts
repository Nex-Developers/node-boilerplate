import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makePostSelfConfirmEndedController({
    selfConfirmEnd
}) {
    // use translations
    return async function(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'Travel',
            path: '/api/self-confirm-ended',
            modelId: '',
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.WRITE} passenger rating`
        } 
        try {
            const lang = request.lang,
                body = request.body,
                data = await selfConfirmEnd({...body})
                reqLog.status = LogStatus.SUCCEEDED
                // reqLog.modelId = data.id
                // reqLog.description += data.id
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