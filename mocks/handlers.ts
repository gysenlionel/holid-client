import { rest } from 'msw';
import { environment } from "../lib/environment"
export const handlers = [
    // rest.get(`${environment.apiUrl}/api/hotels`, (req, res, ctx) => {
    //     const type = req.url.searchParams.get('type')
    //     const limit = req.url.searchParams.get('limit')
    //     const region = req.url.searchParams.get('region')
    //     return res(
    //         ctx.json([{
    //             address: "carretera la aguada Samana Malecon Samana, 32000",
    //             cheapestPrice: 171,
    //             city: "santa bárbara de samaná",
    //             country: "dominican republic",
    //             createdAt: "2023-03-05T20:38:49.920Z",
    //             desc: "Located in Santa Bárbara de Samaná, 2 km from Cayacoa Beach, Hacienda Samana Bay Hotel provides accommodation with an outdoor swimming pool, free private parking, a fitness centre and a garden. With a terrace, the property also features a restaurant, as well as a bar. The accommodation offers a 24-hour front desk, airport transfers, room service and free WiFi throughout the property.",
    //             distance: "2000",
    //             featured: false,
    //             name: "Hacienda Samana Bay Hotel",
    //             photos: [
    //                 {
    //                     createdAt: "2023-03-05T20:38:49.894Z",
    //                     public_id: "photos-hotel/omencjahldmdbffzoeom",
    //                     updatedAt: "2023-03-05T20:38:49.894Z",
    //                     url: "https://res.cloudinary.com/dphjfzo3n/image/upload/v1678048729/photos-hotel/omencjahldmdbffzoeom.webp",
    //                     _id: "6404fdd9e29061d5e30c96f0",
    //                 }],
    //             rating: 5,
    //             region: "caribbean",
    //             rooms: [
    //                 "64c9388c487e7e80ca745522",
    //                 "64c93b9e487e7e80ca74559c"
    //             ],
    //             slug: "hacienda-samana-bay-hotel",
    //             title: "beautiful hotel near cayacoa beach",
    //             type: "hotel",
    //             updatedAt: "2023-08-01T17:06:38.969Z",
    //             _id: "6404fdd9e29061d5e30c96f2"
    //         }])
    //     )
    // }),
    // rest.get(`${environment.apiUrl}/api/hotels/countbytype`, (req, res, ctx) => {
    //     return res(
    //         ctx.json([{
    //             count: 7,
    //             type: "hotels"
    //         }])
    //     )
    // }),
    // rest.get(`${environment.apiUrl}/api/auth/`, (req, res, ctx) => {
    //     return res(
    //         ctx.status(403)
    //     )
    // }),
    // rest.get(`${environment.apiUrl}/api/users/1`, (req, res, ctx) => {
    //     return res(
    //         ctx.status(400)
    //     )
    // }),
]