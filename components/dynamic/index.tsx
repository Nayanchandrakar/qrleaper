"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

export const AnalyticsMapDynamic = dynamic(
  () => import("@/components/maps/pages/dashboard/analytics/analytics-map"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full rounded-lg h-[30rem]" />,
  }
)
