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

export const TemplateComponent = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/virtual-card/stepper-components/template-component"
    ),
  { ssr: false }
)

export const VcardCreateForm = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/virtual-card/sub-forms/vcard-create-form"
    ),
  { ssr: false }
)

export const VcardQrCodeDesign = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/virtual-card/stepper-components/vcard-qr-code-design"
    ),
  { ssr: false }
)

export const CoreVcardPreview = dynamic(
  () => import("@/components/templates/vcard/core"),
  { ssr: false }
)
