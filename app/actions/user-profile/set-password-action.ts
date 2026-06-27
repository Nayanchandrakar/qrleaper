"use server"

import { randomBytes } from "crypto"

import { eq } from "drizzle-orm"

import { getUserById } from "@/app/actions/utils"
import { PASSWORD_RESET_TOKEN_EXPIRY } from "@/constants/auth"
import { db } from "@/database/db"
import { passwordResetToken } from "@/database/schema"
import { authUserActionClient } from "@/lib/action/safe-action"
import { sendEmail } from "@/lib/mail"
import ResetPasswordLink from "@/templates/auth/reset-password-link"

export const setPasswordAction = authUserActionClient.action(
  async ({ ctx }) => {
    const user = await getUserById(ctx.user.id!)

    if (!user) {
      throw new Error("Unauthorized user!")
    }

    if (user?.passwordHash) {
      throw new Error(
        "You already have a password set. You can change it in your account settings."
      )
    }

    const token = randomBytes(32).toString("hex")

    await Promise.all([
      db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.identifier, user?.email!)),

      db.insert(passwordResetToken).values({
        identifier: user?.email!,
        token,
        expires: new Date(Date.now() + PASSWORD_RESET_TOKEN_EXPIRY * 1000)
      })
    ])

    if (process.env.NODE_ENV === "development") {
      console.info(
        "Password reset URL:",
        `http://localhost:3000/reset-password/${token}`
      )
    } else {
      await sendEmail({
        subject: `QR Leaper: Password reset instructions`,
        email: user?.email!,
        react: ResetPasswordLink({
          url: `${process.env.APP_URL}/reset-password/${token}`
        })
      })
    }

    return { ok: true }
  }
)
