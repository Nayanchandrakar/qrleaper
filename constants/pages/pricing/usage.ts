export const usageStatData = {
  FREE: {
    limit: 1,
    type: "Free",
    stripeIds: {
      monhtly: null,
      yearly: null,
    },
    message: "Upgrade to Starter for up to 3 QR codes.",
  },
  STARTER: {
    limit: 3,
    type: "Starter",
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
      yearly: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
    },
    message: "Upgrade to Plus for up to 50 QR codes.",
  },
  PLUS: {
    limit: 50,
    type: "Plus",
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PLUS_MONTHLY_PLAN_ID,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PLUS_YEARLY_PLAN_ID,
    },
    message: "Upgrade to Pro for up to 200 QR codes.",
  },
  PRO: {
    limit: 200,
    type: "Pro",
    stripeIds: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
    message: "Contact support for custom solutions.",
  },
}
