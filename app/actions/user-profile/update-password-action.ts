"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { db } from "@/database/db"
import { users } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { hashPassword, validatePassword } from "@/lib/auth/password"
import { sendEmail } from "@/lib/mail"
import PasswordUpdated from "@/templates/auth/password-updated"
import { updatePasswordSchema } from "@/zod/auth/update-passwod-schema"

export const updatePasswordAction = authUserActionClient
  .schema(updatePasswordSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput, ctx }) => {
    const { currentPassword, newPassword } = parsedInput

    const [user] = await db
      .select({
        passwordHash: users.passwordHash
      })
      .from(users)
      .where(eq(users.id, ctx.user.id!))

    if (!user?.passwordHash) {
      throw new Error(
        "You don't have a password set. Please set a password first."
      )
    }

    const passwordMatch = await validatePassword({
      password: currentPassword,
      passwordHash: user?.passwordHash
    })

    if (!passwordMatch) {
      throw new Error("The password you entered is incorrect.")
    }

    await Promise.all([
      db.update(users).set({
        passwordHash: await hashPassword(newPassword)
      }),

      sendEmail({
        subject: `Your QR Leaper account password has been updated`,
        email: ctx?.user?.email!,
        react: PasswordUpdated({})
      })
    ])

    return { ok: true }
  })
