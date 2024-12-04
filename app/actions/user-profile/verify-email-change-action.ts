"use server"

import { and, eq, gte } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { emailChangeToken, users } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { verifyEmailChangeSchema } from "@/zod/auth/email-change-schema"
import { getUserByEmail } from "@/app/actions/utils"

export const verifyEmailChange = authUserActionClient
  .schema(verifyEmailChangeSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    const { token, newEmail } = parsedInput

    const user = await getUserByEmail(newEmail!)

    if (user) {
      throw new Error("Email has been linked with different account.")
    }

    const verificationToken = await db
      .select()
      .from(emailChangeToken)
      .where(
        and(
          eq(emailChangeToken.identifier, newEmail),
          eq(emailChangeToken.token, token),
          gte(emailChangeToken.expires, new Date())
        )
      )

    if (!verificationToken) {
      throw new Error("Invalid verification code entered.")
    }

    await Promise.all([
      db
        .delete(emailChangeToken)
        .where(
          and(
            eq(emailChangeToken.identifier, newEmail),
            eq(emailChangeToken.token, token)
          )
        ),

      db
        .update(users)
        .set({
          email: newEmail,
        })
        .where(eq(users.id, ctx.user.id!)),
    ])
    return { ok: true }
  })
