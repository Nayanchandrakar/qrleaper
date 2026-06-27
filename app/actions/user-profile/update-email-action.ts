"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { getUserByEmail } from "@/app/actions/utils"
import { EMAIL_RESET_TOKEN_EXPIRY } from "@/constants/auth"
import { db } from "@/database/db"
import { emailChangeToken, users } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { validatePassword } from "@/lib/auth/password"
import { generateOTP } from "@/lib/auth/utils"
import { sendEmail } from "@/lib/mail"
import VerifyEmailChange from "@/templates/auth/verify-email-change"
import { emailChangeSchema } from "@/zod/auth/email-change-schema"

export const updateEmailAction = authUserActionClient
  .schema(emailChangeSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput, ctx }) => {
    const { currentPassword, newEmail } = parsedInput

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

    const isEmailOccupied = await getUserByEmail(newEmail)

    if (isEmailOccupied) {
      throw new Error("Email address already linked with an different account.")
    }

    const code = generateOTP()

    await Promise.all([
      db
        .delete(emailChangeToken)
        .where(eq(emailChangeToken.identifier, newEmail)),

      db.insert(emailChangeToken).values({
        identifier: newEmail,
        expires: new Date(Date.now() + EMAIL_RESET_TOKEN_EXPIRY * 1000),
        token: code
      }),

      sendEmail({
        subject: `QR Leaper: OTP to verify your email account`,
        email: newEmail,
        react: VerifyEmailChange({
          code
        })
      })
    ])

    return { ok: true }
  })
