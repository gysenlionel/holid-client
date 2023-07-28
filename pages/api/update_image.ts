// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { environment } from '../../lib/environment';
import { handleRequest, refreshTokens } from '../../lib/getUser-ssr';
import { decodeCookieArray, decodedCookieString } from '../../utils/helpers/decodedCookie';

interface Data {
  data: {
    image: string;
    size: number;
    type: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const dataFile: Data = req.body

    if (
      dataFile.data.type !== 'image/png' && dataFile.data.type !== 'image/jpg' && dataFile.data.type !== 'image/jpeg') {
      return res.status(500).json({ statusCode: 500, message: 'The image format can only be jpeg or png.' });
    }

    if (dataFile.data.size > 100000) {
      return res.status(500).json({ statusCode: 500, message: 'The image may not exceed 1mo.' });
    }

    try {
      let response: any = null

      let decodedToken = await decodedCookieString(req);

      if (decodedToken) {
        const request = () => axios.put(
          `${environment.apiUrl}/api/users/updateImage/${req.query.userId}`,
          dataFile.data
          , {
            headers: { cookie: req.headers.cookie },
            withCredentials: true
          }
        )

        const data = await handleRequest(req, res, request)

        response = data

      } else {
        await refreshTokens(req, res)

        decodedToken = await decodeCookieArray(req)

        if (decodedToken) {
          const request = () => axios.put(
            `${environment.apiUrl}/api/users/updateImg/${req.query.userId}`,
            dataFile.data
            , {
              headers: { cookie: req.headers.cookie },
              withCredentials: true
            })
          const data = await handleRequest(req, res, request)
          response = data
        }
      }

      res.status(200).json(response.data)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err?.response?.data })
    }
  }
}
