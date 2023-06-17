interface FCWithClassName<P = {}> extends React.FC<P & { className?: string }> { }

export interface Hotel {
    name: string,
    type: string
    city: string,
    country: string,
    region: string,
    address: string,
    distance: string,
    photos: Photo[],
    title: string,
    desc: string,
    rating: number,
    rooms: [string],
    cheapestPrice: number,
    featured: Boolean,
    _id: string,
    slug: string,
    createdAt: string,
    updatedAt: string
}

export interface Photo {
    createdAt: string; 
    public_id: string;
    updatedAt: string;
    url: string;
    _id: string;
}

export interface PropertyTypes {
        type: string;
        count: number  
}

export interface Error {
    status?: number;
    message?: string | string[];
}

export interface RoomNumbers {
     number: number,
    unavailableDates: date[],
    _id: string
}

export interface Room {
    _id: string,
    title: string,
    price: number,
    maxPeople: number,
    desc: string,
    roomNumbers: RoomNumbers [],
    createdAt: string,
    updatedAt: string,
}