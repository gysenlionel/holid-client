// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST"){
        const credentials = req.body.credentials
        try {
            const response = await axios.post(
                `${environment.apiUrl}/api/auth/register`,
                credentials,
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
              res.status(200).json(response.data)
        }catch(err)
        {
            res.status(500).json({statusCode:500, message:err?.response?.data})
        }
    }
  }
  