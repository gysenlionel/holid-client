// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST"){
        try {
            const response = await axios.post(
                `${environment.apiUrl}/api/auth/signout`,
                {},
                {
                  withCredentials: true,
                  headers: { cookie: req.headers.cookie },
                }
              );
              res.setHeader("Set-Cookie", response.headers['set-cookie'])

              res.status(200).json(response.data)
        }catch(err)
        {
            res.status(500).json({statusCode:500, message:err?.response?.data})
        }
    }
  }
  