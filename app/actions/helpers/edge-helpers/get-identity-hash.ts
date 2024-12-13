import { ipAddress } from "@vercel/functions"
import { userAgent } from "next/server"
import { LOCALHOST_IP } from "@/constants/localhost"

/**
 * Combine IP + UA to create a unique identifier for the user (for deduplication)
 */
export async function getIdentityHash(req: Request) {
  const ip = ipAddress(req) || LOCALHOST_IP
  const ua = userAgent(req)
  const data = `${ua}-${ip}`

  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)

  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer)

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export function isSubscriptionExpiredEdge(stripeCurrentPeriodEnd: Date) {
  return !!(stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now())
}
