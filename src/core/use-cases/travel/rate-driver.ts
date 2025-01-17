import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"
import { DbConnection } from "../../../utils/helpers"

export default ({
    saveProfile,
    saveTravel,
    saveTrip,
    notifyUser
}: any = {}) => {
    if (!saveProfile || !saveTravel || !saveTrip  || !notifyUser) throw new ServerError()
    return ({
        travelId,
        rating,
        comment,
        by
    }) => {
        if (!travelId) throw new MissingParamError("travelId")
        if (!rating && !comment) throw new MissingParamError("rating or comment")
        if (!by) throw new MissingParamError("by")
        if (rating) {
            if (typeof rating === "string") rating = Number(rating)
            if (rating < 0 && rating > 5 ) throw new InvalidParamError('rating')  
        }
        const prisma = DbConnection.prisma

        return prisma.$transaction( async() => {
            const travel= await prisma.travel.findUnique({ where: { id: travelId }, select: { route: { select: { trip: { select: {id: true, departureAddress: true, arrivalAddress: true, departureDate: true, departureTime: true, userId: true}}}}}})
            if (!travel) throw new InvalidParamError('travelId')
            const { route } = travel 
            const userId = route.trip.userId
            const tripId = route.trip.id
            const review = await prisma.driverReview.findUnique({ where: { travelId }})
           if(!review) await prisma.driverReview.create({ data: { travelId, tripId, userId, rating, comment, by}})
           else await prisma.driverReview.update({ where: { travelId}, data: {tripId, userId, rating, comment, by }})
        
           if(rating)  {
                const dirverRatings = await prisma.driverReview.findMany({ where: { userId }, select: { rating: true}})
                const passengerRatings = await prisma.passengerReview.findMany({ where: { userId}, select: { rating: true}})
                const ratings = dirverRatings.map(r => r.rating).concat(passengerRatings.map(r => r.rating))
                const sum = ratings.filter(r => r !== null).reduce((acc, rating) => acc + rating, 0)
                const q = ratings.length
                let averageRating
                if(q)  averageRating = sum/q
                await prisma.user.update({ where: {id: userId}, data: { rating: Number(averageRating.toFixed(1))}})
                saveProfile(userId)
            }
            saveTravel(travelId)
            saveTrip(route.trip.id)
            notifyUser({ id: userId, titleRef: { text: 'notification.rateTravelDriver.title'}, messageRef: { text: 'notification.rateTravelDriver.message', params: { name:  by,departure: travel.route.trip.departureAddress, arrival: travel.route.trip.arrivalAddress, date: travel.route.trip.departureDate, time: travel.route.trip.departureTime }}, cover: null, data: {path:'rate-driver', id: travelId.toString(), res: 'INFOS'}, lang: 'fr', type: 'travel' })
            const message = { text: "response.edit"}
            return { message }
          
        })
    }
}