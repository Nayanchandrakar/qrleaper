"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { subscritpionTableType } from "@/types/db-types"
import type { pricingDataType } from "@/constants/pages/pricing/pricing-data"
import { BillingFormButton } from "@/components/buttons/pages/billing/billing-form-button"

interface PricingButtonProps {
  userId: string
  subscriptionPlan: subscritpionTableType
  data: pricingDataType
  isYearly: boolean
}

const PricingButton = ({
  data,
  isYearly,
  subscriptionPlan,
  userId,
}: PricingButtonProps) => {
  return (
    <>
      {userId && subscriptionPlan ? (
        data.title === "Free" ? (
          <Link
            href="/dashboard/qr-codes"
            className={buttonVariants({
              className: "mt-6 w-full",
            })}
          >
            Go to dashboard
          </Link>
        ) : (
          <BillingFormButton
            offer={data}
            subscriptionPlan={subscriptionPlan}
            year={isYearly}
          />
        )
      ) : (
        <Link
          href="/login"
          className={cn(
            buttonVariants({
              className: cn(
                "mt-6 w-full",
                data?.recommended && "bg-gradient-brand"
              ),
            })
          )}
        >
          Sign in
        </Link>
      )}
    </>
  )
}

export { PricingButton }
