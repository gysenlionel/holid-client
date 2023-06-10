import { environment } from "../lib/environment"

const requests = {
    fetchCaribbeanHotels: `${environment.apiUrl}/api/hotels?type=hotel&limit=6&region=caribbean`,
    fetchPropertyTypes: `${environment.apiUrl}/api/hotels/countbytype`,
    fetchProperty: `${environment.apiUrl}/api/hotels/slug/`
}

export default requests