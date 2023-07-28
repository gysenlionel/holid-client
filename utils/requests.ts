import { environment } from "../lib/environment"

const requests = {
    fetchCaribbeanHotels: `${environment.apiUrl}/api/hotels?type=hotel&limit=6&region=caribbean`,
    fetchPropertyTypes: `${environment.apiUrl}/api/hotels/countbytype`,
    fetchProperty: `${environment.apiUrl}/api/hotels/slug/`,
    fetchPropertyRooms: `${environment.apiUrl}/api/hotels/rooms/`,
    fetchBookings: `${environment.apiUrl}/api/bookings/`,
    fetchPropertyById: `${environment.apiUrl}/api/hotels/find/`
}

export default requests