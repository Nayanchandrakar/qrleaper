"use server"
import { eq } from "drizzle-orm"
import { randomBytes } from "crypto"
import { flattenValidationErrors } from "next-safe-action"

import { PASSWORD_RESET_TOKEN_EXPIRY } from "@/constants/auth"
import { db } from "@/database/db"
import { passwordResetToken, users } from "@/database/schema"
import { actionClient } from "@/lib/action/safe-action"
import { throwIfAuthenticated } from "@/lib/action/throw-if-authenticated"
import { sendEmail } from "@/lib/mail"
import ResetPasswordLink from "@/templates/auth/reset-password-link"
import { emailSchema } from "@/zod/utils"

// Request a password reset email
export const requestPasswordResetAction = actionClient
  .schema(emailSchema, {
    handleValidationErrorsShape: async (ve) => {
      const error = flattenValidationErrors(ve).fieldErrors
      return error
    },
  })
  .use(throwIfAuthenticated)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput

    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      throw new Error("No account found with that email address.")
    }

    const token = randomBytes(32).toString("hex")

    await Promise.all([
      db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.identifier, email)),

      db.insert(passwordResetToken).values({
        identifier: email,
        token,
        expires: new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRY * 1000),
      }),
    ])

    await sendEmail({
      subject: `QR Leaper: Password reset instructions`,
      email,
      react: ResetPasswordLink({
        url: `${process.env.APP_URL}/auth/reset-password/${token}`,
      }),
    })

    return { ok: true }
  })
