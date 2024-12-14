import dayjs from "dayjs"
import { eq } from "drizzle-orm"

import { db } from "@/database/db"
import { subscription } from "@/database/schema"
import { decrement, increment } from "@/database/utils"

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

export const incrementQrSubscriptionCountByUserId = async (userId: string) => {
  try {
    // increment user qr code subscription count by 1 each time
    await db
      .update(subscription)
      .set({
        count: increment(subscription.count, 1),
      })
      .where(eq(subscription.userId, userId))
  } catch {
    return null
  }
}

export const decrementQrSubscriptionCountByUserId = async (userId: string) => {
  try {
    // decrement user qr code subscription count by 1 each time
    await db
      .update(subscription)
      .set({
        count: decrement(subscription.count, 1),
      })
      .where(eq(subscription.userId, userId))
  } catch {
    return null
  }
}
