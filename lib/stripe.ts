import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_API_KEY! as string, {
  apiVersion: "2026-06-24.dahlia",
  typescript: true
})
