"use server"

import { eq } from "drizzle-orm"

import { db } from "@/database/db"
import { users } from "@/database/schema"

export const checkAccountExists = async (email: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (user) {
      return {
        accountExists: true,
        hasPassword: !!user.passwordHash,
      }
    }

    return { accountExists: false, hasPassword: false }
  } catch {
    return null
  }
}
