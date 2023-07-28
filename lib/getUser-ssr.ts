import axios, {AxiosResponse} from "axios";
import { IncomingMessage, ServerResponse,  } from "http";
import { environment } from "./environment";
import { IUser } from "../types/user"; 
import { decodeCookieArray, decodedCookieString } from "../utils/helpers/decodedCookie";

export type QueryResponse<T> = [error: string | null, data: T | null]


export const SET_COOKIE_HEADER = 'set-cookie'

export const refreshTokens = async (req: IncomingMessage, res: ServerResponse) => {
    const response: any = await axios.get(`${environment.apiUrl}/api/auth/`, {
        headers: {cookie: req.headers.cookie },
        withCredentials: true
    })
    
    const cookies = response.headers[SET_COOKIE_HEADER]
  
    req.headers.cookie = cookies
    res.setHeader(SET_COOKIE_HEADER, cookies)
}

export const handleRequest = async (
    req: IncomingMessage,
    res: ServerResponse,
    request: () => Promise<AxiosResponse>
) => {
    try {
        return await request()
    } catch (error: any) {
        if (error?.response?.status == 401){
            await refreshTokens(req, res)
            return await request()
        }
        throw error
    }
}


export const getUser = async <T>(
    req: IncomingMessage,
    res: ServerResponse,
): Promise<QueryResponse<IUser>> => {
    try {
        let user: IUser | null = null 
       
        let decodedToken = await decodedCookieString(req);
       
        if(decodedToken)
        {
        const request = () => axios.get(
            `${environment.apiUrl}/api/users/${decodedToken?.details?._id}`
            , {headers: {cookie: req.headers.cookie}})
           
        const {data} = await handleRequest(req,res, request)
    
        user = data
        
        } else {
             await refreshTokens(req, res)
           
           decodedToken = await decodeCookieArray(req)
        
            if(decodedToken)
            { 
                const request = () => axios.get(
                    `${environment.apiUrl}/api/users/${decodedToken?.details?._id}`
                    , {headers: {cookie: req.headers.cookie}})
                    
                const {data} = await handleRequest(req,res, request)
                user = data
            }
        }
        
        return [null, user]
    } catch (error: any){
        return [error,null]
    }
}