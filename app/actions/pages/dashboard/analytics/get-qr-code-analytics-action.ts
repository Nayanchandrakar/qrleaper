"use server"

import { getQrCodeByUserIdAndStatusType } from "@/app/actions/utils"
import { db } from "@/database/db"
import { qrAnalytics } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { qrAnalyticsSchema } from "@/zod/pages/dashboard/analytics/analytics-schema"
import { and, asc, eq, gte, lte, sql } from "drizzle-orm"

export const getQrCodeAnalyticsAction = authUserActionClient
  .schema(qrAnalyticsSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { fromDate, toDate, id } = parsedInput

    const qrCode = await getQrCodeByUserIdAndStatusType(
      ctx.user.id!,
      id,
      "active"
    )

    if (!qrCode) {
      throw new Error("Invalid QR Code Id Provided")
    }

    const analytics = await db
      .select()
      .from(qrAnalytics)
      .where(
        and(
          eq(qrAnalytics.qrCodeId, qrCode.id),
          gte(sql`DATE(${qrAnalytics.updatedAt})`, fromDate),
          lte(sql`DATE(${qrAnalytics.updatedAt})`, toDate)
        )
      )
      .orderBy(asc(qrAnalytics.updatedAt))

    return { data: analytics }
  })
