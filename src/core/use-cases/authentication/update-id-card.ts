import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateIdCard ({
    userDb,
    // deleteAvatarFile
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function ({
         id,
        file
    }: any = {}) {
        if (!file || file == {}) throw new MissingParamError('file')
        console.log('file', file)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: { idCard: true}})
        if (!user) throw new InvalidParamError('token')
        // if (user.idCard) deleteAvatarFile(user.idCard)
        const idCard = file.path.substring(file.path .indexOf("/"));
        userDb.updateOne({ where: { id },  data: { idCard }})
        const message = { text: 'response.update' }
        return { message, data: { idCard }}
    }
}