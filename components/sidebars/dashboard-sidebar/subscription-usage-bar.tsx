"use client"

import { toast } from "sonner"
import { Loader, Sparkles } from "lucide-react"
import { useAction } from "next-safe-action/hooks"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { subscriptionPlan } from "@/app/actions/helpers"
import type { subscritpionTableType } from "@/types/db-types"
import { usageStatData } from "@/constants/pages/pricing/usage"
import { generateUserStripeAction } from "@/app/actions/pages/pricing/generate-user-stripe"

interface SubscriptionUsageBarProps {
  subscription: subscritpionTableType
}

export const SubscriptionUsageBar = ({
  subscription,
}: SubscriptionUsageBarProps) => {
  const plan = subscriptionPlan(subscription?.stripePriceId!)

  const { executeAsync, isExecuting } = useAction(generateUserStripeAction, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  return (
    <div className="flex flex-col rounded-lg bg-zinc-100 p-4">
      <div className="mb-2.5 flex items-center justify-between gap-2 text-xs font-medium text-neutral-600">
        <span>Usage</span>
        <span>
          {subscription?.count || 0}/{plan.limit}
        </span>
      </div>

      <Progress
        className="h-2"
        value={((subscription?.count! || 0) / plan.limit!) * 100}
      />

      {plan?.type !== "Pro" && (
        <Button
          onClick={() =>
            executeAsync({ priceId: usageStatData.PRO.stripeIds.monthly! })
          }
          disabled={isExecuting}
          className="bg-gradient-brand mt-4"
        >
          {isExecuting ? (
            <Loader className="mr-2 size-4 animate-spin" />
          ) : (
            <Sparkles className="ml-2 size-4 fill-white" />
          )}
          Upgrade to pro
        </Button>
      )}
    </div>
  )
}
