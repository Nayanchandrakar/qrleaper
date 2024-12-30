import { type NextRequest } from "next/server"

import { getVCardByUserName } from "@/app/actions/utils"
import { linkMiddleware } from "@/middlewares/link-middleware"

export const vCardLinkMiddleware = async (req: NextRequest) => {
  const nextUrl = req.nextUrl
  const slug = req.nextUrl.pathname.split("/")?.[3]

  const id = await getVCardByUserName(slug)

  nextUrl.searchParams.set("id", id?.qrCodeId!)
  return linkMiddleware(req)
}
