// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      let endpoint = `/api/hotels${req.query.destination == '' && req.query.min == '' && req.query.max == '' && req.query.type == '' ? '' : '?'}`
      let urlQuery =`${endpoint}${req.query.destination != '' && req.query.destination != 'null' ? 'city=' + req.query.destination : ''}${req.query.min != '' ? '&min=' + req.query.min : ''}${req.query.max != '' ? '&max=' + req.query.max : ''}${req.query.type != '' ? '&type=' + req.query.type : ''}` 

      const response = await axios.get(
            `${environment.apiUrl}${urlQuery}`,
            {
              withCredentials: true,
            }
          );
      
         res.status(200).json(response.data)
    }catch(err)
    {
        res.status(500).json({statusCode:500, message:err?.response?.data})
    }
  }