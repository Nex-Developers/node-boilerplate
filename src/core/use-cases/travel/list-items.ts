import moment from "moment"
import { ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default function makeListItems({
    travelDb
}: any = {}) {
    if (!travelDb) throw new ServerError()
    const orderPreferences = (data: any[]) => {
        return data.sort((a, b) => a.question.id - b.question.id)
    }
    return async ({
        userId,
        startAt,
        limit
    }: any = {}) => {
        const prisma = DbConnection.prisma

        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const where: any = {}
        if (userId) where.userId = userId
        const res = await prisma.travel.findMany({
            where,
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                seats: true,
                status: true,
                description: true,
                departureAddress: true,
                arrivalAddress: true,
                departureDate: true,
                departureTime: true,
                passengerReview: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                  updatedAt: true,
                  by: true
                }},
                driverReview: { select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                  updatedAt: true,
                  by: true
                }},
                route: {
                    select: {
                        id: true,
                        price: true,
                        fees: true,
                        distance: true,
                        duration: true,
                        departureDate: true,
                        departureTime: true,
                        stops: true,
                        trip: {
                            select: {
                                status: true,
                                departureDate: true,
                                departureTime: true,
                                user: {
                                    select: {
                                        id: true,
                                        avatar: true,
                                        firstName: true,
                                        lastName: true,
                                        phoneNumber: true,
                                        rating: true,
                                        passengerReviews: { select: {
                                            rating: true,
                                            comment: true,
                                            createdAt: true,
                                            updatedAt: true
                                        }},
                                        driverReviews: { select: {
                                            rating: true,
                                            comment: true,
                                            createdAt: true,
                                            updatedAt: true
                                        }},
                                        preferences: {
                                            select: {
                                                question: {
                                                    select: {
                                                        id: true,
                                                        value: true,
                                                    }
                                                },
                                                answer: {
                                                    select: {
                                                        id: true,
                                                        index: true,
                                                        value: true,
                                                    }
                                                }
                                            }
                                        },
                                    }
                                }, vehicle: {
                                    select: {
                                        id: true,
                                        numberPlate: true,
                                        model: true,
                                        type: true,
                                        color: true
                                    }
                                },
                            }
                        }
                    }
                },
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        phoneNumber: true,
                    }
                },
                transactions: true,
                createdAt: true,
                reports: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        user: { 
                            select: {
                                id: true,
                                avatar: true,
                                firstName: true,
                                lastName: true,
                                phoneNumber: true,
                            }
                        }
                    }
                },
                promotion: true,
            }
        })
        const data = [];
        
        res.forEach(item => {
            const { trip, ...route } = item.route
            const { user, vehicle, ..._trip }: any = trip
            const allReviews: any[] = user.passengerReviews.concat(user.driverReviews)
            user.reviews = allReviews.sort((a, b) =>  b.createdAt - a.createdAt)
            user.preferences =  orderPreferences(user.preferences)
            route.price += route.fees
            delete route.fees
            delete user.driverReviews
            delete user.passengerReviews

            data.push({
                id: item.id,
                seats: item.seats,
                status: item.status,
                description: item.description,
                departureAddress: item.departureAddress,
                arrivalAddress: item.arrivalAddress,
                departureDate: item.departureDate,
                departureTime: item.departureTime,
                createdAt: moment(item.createdAt).format('DD-MM-YYYY HH:mm'),
                passengerReview: item.passengerReview,
                driverReview: item.driverReview,
                route,
                trip: _trip,
                driver: user,
                user: item.user,
                vehicle,
                transactions: item.transactions,
                reports: item.reports,
                promotion: item.promotion
            })
        })

        return { data }
    }
}