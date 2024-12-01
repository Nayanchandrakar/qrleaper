"use server"

import { db } from "@/database/db"
import { sendEmail } from "@/lib/mail"

// template
import VerifyEmail from "@/templates/auth/verify-email"
import { flattenValidationErrors } from "next-safe-action"
import { generateOTP } from "@/lib/auth/utils"
import { EMAIL_OTP_EXPIRY_IN } from "@/constants/auth"
import { emailSchema } from "@/zod/utils"
import { throwIfAuthenticated } from "@/lib/action/throw-if-authenticated"
import { actionClient } from "@/lib/action/safe-action"
import { verificationTokens } from "@/database/schema"
import { eq } from "drizzle-orm"

// Send OTP to email to verify account
export const sendOtpAction = actionClient
  .schema(emailSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
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
      await db?.insert(verificationTokens).values({
        identifier: email,
        token: code,
        expires: new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000),
      }),

      await sendEmail({
        subject: `QR Leaper: OTP to verify your account`,
        email: email!,
        react: VerifyEmail({
          code,
        }),
      }),
    ])

    return { ok: true }
  })
