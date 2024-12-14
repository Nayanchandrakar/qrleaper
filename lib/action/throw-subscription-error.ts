import type { User } from "next-auth"
import type { MiddlewareResult } from "next-safe-action"

import { isSubscriptionExpired, subscriptionPlan } from "@/app/actions/helpers"
import { getSubscriptionByUserId } from "@/app/actions/utils"

export const throwSubscriptionError = async ({
  next,
  ctx,
}: {
  ctx: {
    user: User
  }
  next: <NC extends object = {}>(
    opts?:
      | {
          ctx?: NC | undefined
        }
      | undefined
  ) => Promise<MiddlewareResult<string, NC>>
}) => {
  const subscription = await getSubscriptionByUserId(ctx.user.id!)

  if (!subscription) throw new Error("Something went wrong!")

  if (!isSubscriptionExpired(subscription?.stripeCurrentPeriodEnd)) {
    throw new Error("Your Subscription is being Expired")
  }

  const plan = subscriptionPlan(subscription?.stripePriceId)

  if (plan.limit <= subscription.count!) throw new Error(plan.message!)

  return next({
    ctx: { subscription },
  })
}
