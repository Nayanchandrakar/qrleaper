import { eq } from "drizzle-orm"

import { db } from "@/database/db"
import { users, accounts } from "@/database/schema"

export const getUserById = async (id: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user
  } catch (error) {
    return null
  }
}

export const getUserAccountById = async (id: string) => {
  try {
    const [userAccount] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, id))

    return userAccount
  } catch (error) {
    return null
  }
}
