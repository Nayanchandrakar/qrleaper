"use server"

import { z } from "zod"
import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { idSchema } from "@/zod/utils"
import { qrCode } from "@/database/schema"
import { getFileDbEndpointURL } from "@/utils"
import { qrFile } from "@/database/schema/qr-variations"
import { authUserActionClient } from "@/lib/action/safe-action"
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils"

const formSchema = z.object({
  id: idSchema.shape.id,
  fileName: z.string().min(10),
})

export const updateQrCodeFileChangeAction = authUserActionClient
  .schema(formSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { fileName, id } = parsedInput

    const { user } = ctx

    const data = await getQrCodeByUserIdAndIdWithType(user.id!, id, "file")

    if (!data) {
      throw new Error("No QR Code found to update with this id")
    }

    await db.transaction(async (tx) => {
      Promise.all([
        // update a desired form data
        tx
          .update(qrCode)
          .set({ endpoint: getFileDbEndpointURL(fileName) })
          .where(eq(qrCode.id, id)),

        tx
          .update(qrFile)
          .set({ fileId: fileName })
          .where(eq(qrFile.qrCodeId, id)),
      ])
    })

    return { ok: true }
  })
