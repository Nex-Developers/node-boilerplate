import { AccountAllReadyExistError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEditUser({
    userDb,
    isValidEmail,
    hashPassword
}: any = {}){
    if (!userDb || !isValidEmail || !hashPassword) throw new ServerError()
    return async function editUser({
        id,
        lastName,
        firstName,
        phoneNumber,
        gender,
        email,
        birthDay,
        role,
        language,
        password
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        const data: any = {}
        if (lastName) data.lastName = lastName
        if (firstName) data.firstName = firstName
        if (phoneNumber) data.phoneNumber = phoneNumber
        if (gender) data.gender = gender
        if (email) {
            if (! await isValidEmail({ email })) throw new InvalidParamError('email')
            const user = await userDb.findFirst({ where: { email } })
            if(user) throw new AccountAllReadyExistError('email')
            data.email = email
        }
        console.log(birthDay);
        if (birthDay) {
            const formatedDateArray = birthDay.split('-')
            const fomatedDate = [formatedDateArray[1], formatedDateArray[0], formatedDateArray[2]].join('-')
            data.birthDay = new Date(fomatedDate)
        }
        if (role) data.role = role
        if (language) data.language = language
        if (password) data.password = await hashPassword({ password }) 

        if( Object.keys(data).length === 0) throw new MissingParamError('all')

        await userDb.updateOne({ where: { id} , data })

        const message = { text: "response.edit"}
        return { message }
    } 
}