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

interface Product {
    _id:string;
    image:string;
    price: number;
    slug: string;
    name:string;
    hotelId: string;
    adult: number;
    children: number;
    roomNumberId: string[];
    userId: string;
    allDates: number []
}

interface StripeProduct {
    id: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: "usd" | "eu";
    description: string;
    object: string;
    quantity: number;
    price: {
        unit_amount: number;
    };
}

interface Booking {
        dates: {
            startDate: string,
            endDate: string
        };
        _id: string;
        hotelId: string;
        price: number;
        adult: number;
        children: number;
        userId: string;
        roomNumbersId: string[];
        stripeId: string;
        createdAt: string;
        updatedAt: string;
}

interface File {
    path: string;
    name: string;
    size: number;
    type: string;
}