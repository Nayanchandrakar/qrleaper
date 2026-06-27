"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { EMAIL_OTP_EXPIRY_IN } from "@/constants/auth"
import { db } from "@/database/db"
import { verificationTokens } from "@/database/schema"
import { actionClient } from "@/lib/action/safe-action"
import { throwIfAuthenticated } from "@/lib/action/throw-if-authenticated"
import { generateOTP } from "@/lib/auth/utils"
import { sendEmail } from "@/lib/mail"
import VerifyEmail from "@/templates/auth/verify-email"
import { emailSchema } from "@/zod/utils"

// Send OTP to email to verify account
export const sendOtpAction = actionClient
  .schema(emailSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors
  })
  .use(throwIfAuthenticated)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput

    if (email.includes("+") && email.endsWith("@gmail.com")) {
      throw new Error(
        "Email addresses with + are not allowed. Please use your work email instead."
      )
    }

    const code = generateOTP()

    await db
      ?.delete(verificationTokens)
      ?.where(eq(verificationTokens.identifier, email))

    await Promise.all([
      db?.insert(verificationTokens).values({
        identifier: email,
        token: code,
        expires: new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000)
      }),

      sendEmail({
        subject: `QR Leaper: OTP to verify your account`,
        email: email!,
        react: VerifyEmail({
          code
        })
      })
    ])

    return { ok: true }
  })
