import dayjs from "dayjs"

import { db } from "@/database/db"
import { subscription } from "@/database/schema"

export const createSubscription = async (userId: string) => {
  try {
    await db?.insert(subscription).values({
      userId,
      count: 0,
      stripeCurrentPeriodEnd: dayjs()?.add(1, "month").toDate(),
    })
  } catch (error) {
    return null
  }
}
