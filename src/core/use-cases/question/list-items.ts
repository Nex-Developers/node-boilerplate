import { ServerError } from "../../../utils/errors"

export default ({
    questionDb
}: any ) => {
    if (!questionDb)  throw new ServerError()
    return async ({
        role
    }) => {
        const select: any = {
            id: true,
            value: true,
            // createdAt: true,
            answers: {
                select: {
                    id: true,
                    value: true,
                    index: true
                    // createdAt: true
                }
            }
        }
        if (role === "admin") select.answers.select._count = { select: { preferences: true }}
        const data = await questionDb.findMany({
            select
        })
        return { data }
    }
}
