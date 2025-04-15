import { NextRequest } from "next/server"

import { sendEmail } from "@/lib/mail"
import { redirectTo } from "@/middlewares/utils"
import {
  getQrAnalyticsByQrCodeIdAndDeviceId,
  getQrCodeById,
  getQrScanCountById,
  getSubscriptionByUserId,
  getUserById,
  incrementQrAnalyticsCountById,
  incrmentQrScanCountByQrCodeId,
} from "@/app/actions/utils"
import {
  getIdentityHash,
  isSubscriptionExpiredEdge,
} from "@/app/actions/helpers/edge-helpers/get-identity-hash"
import { QrCodeLimitReached } from "@/templates/notifications/qr-limit-react-template"
import { createAnalyticsRecord } from "@/app/actions/helpers/middleware/link/create-analytics-record"

export const linkMiddleware = async (req: NextRequest) => {
  const nextUrl = req.nextUrl
  const id = nextUrl?.searchParams?.get("id")

  if (!id) {
    return redirectTo(nextUrl)
  }

  const qrCode = await getQrCodeById(id)

  if (!qrCode) {
    return redirectTo(nextUrl)
  }

  if (qrCode?.status === "inactive") {
    return redirectTo(nextUrl, "/expired")
  }

  // fetch user from database subscription
  const subscription = await getSubscriptionByUserId(qrCode?.userId!)

  // check for subscription expiry here
  if (!isSubscriptionExpiredEdge(subscription?.stripeCurrentPeriodEnd!)) {
    return redirectTo(nextUrl, "/expired")
  }

  // check for free tier users only
  if (
    !subscription?.stripeCustomerId &&
    !subscription?.stripePriceId &&
    !subscription?.stripeSubscriptionId
  ) {
    const qrScanCount = await getQrScanCountById(qrCode?.id!)
    const count = qrScanCount?.count! + 1

    if (count === 500) {
      const user = await getUserById(qrCode?.userId!)

      await sendEmail({
        email: user?.email!,
        react: QrCodeLimitReached({
          url: `${process.env.APP_URL}/pricing`,
        }),
        subject: "🚀 Your QR Code Has Hit Its Limit – Reactivate Now!",
      })
    } else if (count > 500) {
      return redirectTo(nextUrl, "/expired")
    }
  }

  try {
    const deviceId = await getIdentityHash(req)
    const analytics = await getQrAnalyticsByQrCodeIdAndDeviceId(
      qrCode?.id!,
      deviceId
    )

    if (analytics) {
      await incrementQrAnalyticsCountById(analytics.id)
    } else {
      await createAnalyticsRecord(req, qrCode?.id!, deviceId)
    }

    // Update the scan count for the QR Code
    await incrmentQrScanCountByQrCodeId(qrCode?.id!)
  } catch {
    return redirectTo(nextUrl)
  }

  return redirectTo(nextUrl, qrCode?.endpoint!)
}
