import { UnauthorizedError } from './../../../utils/errors/unauthorized-error';
import { AlreadyDoneError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers";

export default function makeRemove({
    tripDb,
    notifyDevice
}: any = {}) {
    if (!tripDb || !notifyDevice) throw new ServerError()
    const getLast48hours = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2);
    }
    return async ({
        id,
        cancelReason
    }: any = {}) => {
        const prisma = DbConnection.prisma
        if (!id) throw new MissingParamError('id')
        if (!cancelReason) throw new MissingParamError('cancelReason')
        return await prisma.$transaction(async () => {
            const { userId, status, departureDate, departureTime, routes, canceledAt } = await prisma.trip.findFirst({
                where: { id },
                select: {
                    userId: true,
                    departureDate: true,
                    departureTime: true,
                    status: true,
                    routes: {
                        select: {
                            id: true,
                            principal: true,
                            price: true,
                            fees: true,
                            travels: {
                                select: {
                                    id: true,
                                    userId: true,
                                    payment: {
                                        select: {
                                            id: true,
                                            amount: true,
                                            status: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    canceledAt: true
                }
            })
            if (!status) throw new AlreadyDoneError(canceledAt.toString())
            if (status != 3) throw new UnauthorizedError()
            await prisma.trip.update({ where: { id }, data: { status: 0, canceledAt: new Date(), cancelReason } })
            // penalities
            const departureDateTime = new Date(departureDate + ' ' + departureTime)
            const delay = getLast48hours(departureDateTime)
            const principal = routes.find(route => route.principal)
            if (delay < new Date()) {
                prisma.wallet.update({ where: { id: userId }, data: { balance: { decrement: 0.15 * (principal.price + principal.fees) } } })
                // Notify the driver
            }
            const promises = routes.map(async (route) => {
                const travelsIds = route.travels.map(travel => travel.id)
                await prisma.travel.updateMany({
                    where: { id: { in: travelsIds } },
                    data: {
                        status: 0,
                        canceledAt: new Date(),
                        cancelReason,
                        canceledBy: 'driver',
                    },
                })
                const promises2 = await route.travels.map(async travel => {
                    const payment = travel.payment
                    if (payment.status === 1) {
                        await prisma.payment.update({ where: { id: payment.id }, data: { status: 0 } })
                        await prisma.transfert.create({ data: { id: payment.id, userId: travel.userId, amount: payment.amount } })
                        // notify the user
                    }
                    return true
                });
                return Promise.all(promises2).then(() => true)
            })
            return Promise.all(promises).then(() => {
                const message = { text: 'response.remove' }
                return { message }
            })

        })
    }
}