import jwt_decode from "jwt-decode";
import cookie from 'cookie';
import { IncomingMessage } from "http"
import { AccessDecodedToken } from "../../types/user"

export const decodeCookieArray = async(req:any):Promise<AccessDecodedToken | null> => {
    let accessCookie: string | null = null
    req.headers.cookie.map((cook: string) => {
       if(cook.match(/accessToken=/g)){
        accessCookie = cook
        return accessCookie}
    })
    if(accessCookie) return jwt_decode(accessCookie)

    return null
}

export const decodedCookieString = async (req: IncomingMessage): Promise<AccessDecodedToken | null> => {
    let decodedToken: AccessDecodedToken | null= null
   
    if(!req.headers.cookie) return decodedToken

    const cookies = cookie.parse(req.headers.cookie!)
    
    if (!cookies?.accessToken) return decodedToken

    decodedToken = jwt_decode(cookies.accessToken)
    return decodedToken
}