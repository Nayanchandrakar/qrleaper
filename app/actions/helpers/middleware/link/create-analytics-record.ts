import { geolocation, ipAddress } from "@vercel/functions"
import { type NextRequest, userAgent } from "next/server"

import { capitalize } from "@/app/actions/helpers/edge-helpers/capitialize"
import { LOCALHOST_GEO_DATA, LOCALHOST_IP } from "@/constants/localhost"
import { db } from "@/database/db"
import { qrAnalytics } from "@/database/schema"

export const createAnalyticsRecord = async (
  req: NextRequest,
  qrCodeId: string,
  deviceId: string
) => {
  try {
    const isVercel = process.env.NODE_ENV === "production"
    const ip = isVercel ? ipAddress(req) : LOCALHOST_IP
    const continent = isVercel
      ? req.headers.get("x-vercel-ip-continent")
      : LOCALHOST_GEO_DATA.continent
    const geo = isVercel ? geolocation(req) : LOCALHOST_GEO_DATA
    const ua = userAgent(req)

    // Insert a new record
    const insertRecord = {
      userAgent: ua?.ua || "Unknown",
      country: geo?.country || "Unknown",
      city: geo?.city || "Unknown",
      region: geo?.region || "Unknown",
      continent: continent || "Unknown",
      deviceType: capitalize(ua.device.type) || "Desktop",
      device_vendor: ua?.device.vendor || "Unknown",
      device_model: ua?.device?.model || "Unknown",
      browser: ua?.browser?.name || "Unknown",
      ip: typeof ip === "string" && ip.trim().length > 0 ? ip : "Unknown"
    }

    await db.insert(qrAnalytics).values({
      qrCodeId,
      deviceId,
      ...insertRecord
    })
  } catch {
    return null
  }
}
