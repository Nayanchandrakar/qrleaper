"use client"

import { useState } from "react"

import { Container } from "@/components/global/container"
import type { subscritpionTableType } from "@/types/db-types"
import { ListComponent } from "@/components/global/list-component"
import { pricingData } from "@/constants/pages/pricing/pricing-data"
import { PricingCard } from "@/components/cards/pages/pricing/pricing-card"
import { PriceSwitchButton } from "@/components/buttons/pages/pricing/price-switch-button"

interface PricingComponentProps {
  subscriptionPlan: subscritpionTableType
  userId: string
}

export const PricingComponent = ({
  subscriptionPlan,
  userId,
}: PricingComponentProps) => {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <Container className="my-24">
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-6xl font-bold antialiased">Pricing</h2>
        <PriceSwitchButton isYearly={isYearly} setIsYearly={setIsYearly} />
      </div>
      <ListComponent
        data={pricingData}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 min-[895px]:grid-cols-3 min-[1200px]:grid-cols-4"
        renderItem={(data) => (
          <PricingCard
            key={data?.id}
            isYearly={isYearly}
            data={data}
            subscriptionPlan={subscriptionPlan}
            userId={userId}
          />
        )}
      />
    </Container>
  )
}
