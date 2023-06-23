// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { Product } from '../../types'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if (req.method === "POST"){
    const items: Product[] = req.body.items 
    
  if (typeof items[0].price === 'undefined')
    return res.status(500).json({ statusCode: 400, message: 'Please select a room.'}) 

    const transformedItems = items.map((item) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image],
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }))
   
    try {
        // Create checkout sessions from body params
        const params: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            // shipping_address_collection: {
            //     allowed_countries: ['US', 'CA'],
            //   },
              line_items: transformedItems,
              payment_intent_data: {},
              success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${req.headers.referer}`,
              mode: 'payment',
              metadata: {
                images: items[0].image,
              }
        }
        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)
     
        res.status(200).json(checkoutSession)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Internal server error"
        res.status(500).json({ statusCode: 500, message: errorMessage})  
    }
 } else {
    res.setHeader("Allow", "POST")
    res.status(405).end('Method Not Allowed')
 }
}
