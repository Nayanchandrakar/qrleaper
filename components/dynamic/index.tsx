"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export const AnalyticsMapDynamic = dynamic(
  () => import("@/components/maps/pages/dashboard/analytics/analytics-map"),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full rounded-lg h-[30rem]" />,
  }
)

export const VcardCreateForm = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/virtual-card/sub-forms/vcard-create-form"
    ),
  { ssr: false, loading: () => <Skeleton className="w-full h-[40rem]" /> }
)

export const VcardQrCodeDesign = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/virtual-card/stepper-components/vcard-qr-code-design"
    ),
  { ssr: false, loading: () => <Skeleton className="w-full h-[40rem]" /> }
)

export const CoreVcardPreview = dynamic(
  () => import("@/components/templates/vcard/core"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center gap-2 flex-col size-full">
        <Loader2 className="animate-spin size-4" />
        Booting...
      </div>
    ),
  }
)

export const BlueVcardPreview = dynamic(
  () => import("@/components/templates/vcard/blue-template"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center gap-2 flex-col size-full">
        <Loader2 className="animate-spin size-4" />
        Booting...
      </div>
    ),
  }
)

export const OrangeGrayPreview = dynamic(
  () => import("@/components/templates/vcard/orange-gray-template"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center gap-2 flex-col size-full">
        <Loader2 className="animate-spin size-4" />
        Booting...
      </div>
    ),
  }
)

export const SingleColorForm = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/qr-style/color-form/single-color-form/single-color-form"
    ),
  { ssr: false, loading: () => <Skeleton className="w-full h-32" /> }
)

export const GradientColorForm = dynamic(
  () =>
    import(
      "@/components/forms/pages/design/qr-style/color-form/gradient-color-form/gradient-color-form"
    ),
  { ssr: false, loading: () => <Skeleton className="w-full h-32" /> }
)
