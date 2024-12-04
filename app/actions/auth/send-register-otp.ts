"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"

import { throwIfAuthenticated } from "@/lib/action/throw-if-authenticated"
import { actionClient } from "@/lib/action/safe-action"
import { emailSchema } from "@/zod/utils"
import { generateOTP } from "@/lib/auth/utils"
import { db } from "@/database/db"
import { users, verificationTokens } from "@/database/schema"
import { EMAIL_OTP_EXPIRY_IN } from "@/constants/auth"
import { sendEmail } from "@/lib/mail"
import VerifyEmail from "@/templates/auth/verify-email"

// Send OTP to email to verify account
export const sendRegisterOtp = actionClient
  .schema(emailSchema, {
    handleValidationErrorsShape: async (ve) =>
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

    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (user) {
      throw new Error("Email already in use.")
    }

    const code = generateOTP()

    await Promise.all([
      db
        .delete(verificationTokens)
        .where(eq(verificationTokens.identifier, email)),

      db.insert(verificationTokens).values({
        identifier: email,
        token: code,
        expires: new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000),
      }),

      sendEmail({
        subject: `QR Leaper: OTP to verify your account`,
        email,
        react: VerifyEmail({
          code,
        }),
      }),
    ])

    return { ok: true }
  })
