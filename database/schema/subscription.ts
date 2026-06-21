import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { users } from "@/database/schema/user"
import { lifeCycleDates } from "@/database/utils"

export const subscription = pgTable("subscription", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade"
    })
    .notNull()
    .unique(),
  count: integer("count").default(0),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripePriceId: text("stripe_price_id"),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", {
    mode: "date"
  }).notNull(),
  ...lifeCycleDates
})
