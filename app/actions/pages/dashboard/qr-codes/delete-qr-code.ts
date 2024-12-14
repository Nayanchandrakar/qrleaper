"use server"

import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { idSchema } from "@/zod/utils"
import { qrCode } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { decrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils"

// Server action to remove QR Code
export const deleteQrCodeAction = authUserActionClient
  .schema(idSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { id } = parsedInput

    const [data] = await db
      .select({ id: qrCode.id })
      .from(qrCode)
      .where(and(eq(qrCode.userId, ctx.user.id!), eq(qrCode.id, id)))

    if (!data) {
      throw new Error("Invalid QR Code Id Provided!")
    }

    await Promise.all([
      db
        .delete(qrCode)
        .where(and(eq(qrCode.userId, ctx.user.id!), eq(qrCode.id, id))),

      decrementQrSubscriptionCountByUserId(ctx.user.id!),
    ])

    revalidatePath("/dashboard/qr-codes")

    return { ok: true }
  })
