import { usageStatData } from "@/constants/pages/pricing/usage"

export function isSubscriptionExpired(stripeCurrentPeriodEnd: Date) {
  return !!(stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now())
}

export const subscriptionPlan = (stripePriceId: string | null) => {
  if (!stripePriceId) {
    return usageStatData.FREE
  }

  const plan = Object.values(usageStatData).find(
    (plan) =>
      plan.stripeIds &&
      Object.values(plan.stripeIds).some((id) => id === stripePriceId)
  )

  return plan || usageStatData.FREE
}
