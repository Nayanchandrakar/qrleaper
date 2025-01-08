import { toast } from "sonner"
import { Loader, Sparkles } from "lucide-react"
import { Progress } from "@/components/ui/progress"

import { subscriptionPlan } from "@/app/actions/helpers"
import type { subscritpionTableType } from "@/types/db-types"
import { usageStatData } from "@/constants/pages/pricing/usage"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SubscriptionUsageBarProps {
  subscription: subscritpionTableType
}

export const SubscriptionUsageBar = ({
  subscription,
}: SubscriptionUsageBarProps) => {
  const plan = subscriptionPlan(subscription?.stripePriceId!)

  return (
    <div className="flex flex-col rounded-lg bg-gray-50 p-4 border border-gray-200">
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
        <Button asChild className="bg-gradient-brand mt-4">
          <Link href="/pricing">
            <Sparkles className="size-5 fill-white" />
            Upgrade
          </Link>
        </Button>
      )}
    </div>
  )
}
