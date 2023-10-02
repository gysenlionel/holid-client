const startDate = new Date()
const enddate = new Date();
enddate.setHours(0, 0, 0, 0)
startDate.setHours(0, 0, 0, 0)
const endDateTime = enddate.setDate(enddate.getDate() + 2);
const enDate = new Date(endDateTime);
export const rooms = [
    {
        "_id": "648b7daae6bc5b923bb9f027",
        "title": "Palace room",
        "price": 658,
        "maxPeople": 2,
        "desc": "King size bed, 2 bathrooms and 1 balcony",
        "roomNumbers": [
            {
                "number": 201,
                "unavailableDates": [
                    startDate.toISOString().replace("22", "00"),
                    enDate.toISOString().replace("22", "00"),
                    "2023-07-02T00:00:00.000Z",
                    "2023-07-03T00:00:00.000Z"
                ],
                "_id": "648b7daae6bc5b923bb9f028"
            },
            {
                "number": 202,
                "unavailableDates": [

                ],
                "_id": "648b7daae6bc5b923bb9f029"
            }
        ],
        "createdAt": "2023-06-15T21:07:54.683Z",
        "updatedAt": "2023-07-04T21:14:55.742Z",
        "__v": 0
    },
    {
        "_id": "648c983a3826f606c2e58313",
        "title": "Normal room",
        "price": 550,
        "maxPeople": 2,
        "desc": "King size bed, 1 bathroom and 1 balcony",
        "roomNumbers": [
            {
                "number": 101,
                "unavailableDates": [

                ],
                "_id": "648c983a3826f606c2e58314"
            },
            {
                "number": 102,
                "unavailableDates": [

                ],
                "_id": "648c983b3826f606c2e58315"
            }
        ],
        "createdAt": "2023-06-16T17:13:31.011Z",
        "updatedAt": "2023-08-26T16:17:03.093Z",
        "__v": 0
    }
]