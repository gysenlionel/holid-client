const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const requests = {
    fetchCaribbeanHotels: `${BASE_URL}/api/hotels?type=hotel&limit=6&region=caribbean`,
    fetchPropertyTypes: `${BASE_URL}/api/hotels/countbytype`
}

export default requests