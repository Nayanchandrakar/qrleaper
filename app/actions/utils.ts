import { and, eq, gte } from "drizzle-orm"

import { db } from "@/database/db"
import { users, accounts, passwordResetToken } from "@/database/schema"

export const getUserById = async (id: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user
  } catch {
    return null
  }
}

export const getUserWithAccountByUserId = async (id: string) => {
  try {
    const [userAccount] = await db
      .select({
        id: users.id,
        provider: accounts.provider,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .leftJoin(accounts, eq(accounts.userId, id))

    return userAccount
  } catch {
    return null
  }
}

export const isValidToken = async (token: string) => {
  try {
    const [userToken] = await db
      .select({
        token: passwordResetToken.token,
      })
      .from(passwordResetToken)
      .where(
        and(
          eq(passwordResetToken.token, token),
          gte(passwordResetToken.expires, new Date())
        )
      )

    return userToken.token as string
  } catch {
    return null
  }
}
