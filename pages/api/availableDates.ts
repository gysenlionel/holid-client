// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST"){
        const data = {
           dates: req.body.dates
        }
        const roomNumberId = req.query.roomNumberId
        const userId = req.query.userId
        console.log(roomNumberId)
        console.log(userId)
        try {
            const response = await axios.put(
                `${environment.apiUrl}/api/rooms/availability/${roomNumberId}/${userId}`,
                data,
                {
                  headers: { "Content-Type": "application/json",cookie: req.headers.cookie},
                  withCredentials: true,
                }
              );
              res.status(200).json(response.data)
        }catch(err)
        {
            console.log(err)
            res.status(500).json({statusCode:500, message:err?.response?.data})
        }
    }
  }
  