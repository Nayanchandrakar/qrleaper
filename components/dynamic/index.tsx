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

export const TemplateComponentDynamic = dynamic(
  () => import("@/components/pages/design/vcard/template-component"),
  { ssr: false }
)

export const VcardDesignFormDynamic = dynamic(
  () =>
    import("@/components/forms/pages/design/virtual-card/virtual-card-form"),
  { ssr: false }
)

export const DesignComponentDynamic = dynamic(
  () => import("@/components/pages/design/vcard/design-component"),
  { ssr: false }
)

export const CoreVcardPreviewComponentDynamic = dynamic(
  () => import("@/components/templates/vcard/core"),
  { ssr: false }
)
