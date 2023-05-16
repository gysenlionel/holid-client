// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';
import cookie from "cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        const response = await axios.get(
            `${environment.apiUrl}/api/auth/logout`,
            {
              headers: { cookie: req.headers.cookie },
              withCredentials: true,
            }
          );

          res.setHeader('Set-cookie', [
            cookie.serialize('jwt', '', {
              maxAge: -1,
            }),
            cookie.serialize('accessToken', '', {
              maxAge: -1,
            })
          ]);
          res.status(200).json(response.data)
    }catch(err)
    {
        res.status(500).json({statusCode:500, message:err?.response?.data})
    }
  }