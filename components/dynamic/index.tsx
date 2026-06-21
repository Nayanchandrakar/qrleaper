"use client"

import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

import { Skeleton } from "@/components/ui/skeleton"

export const AnalyticsMapDynamic = dynamic(
  () => import("@/components/maps/pages/dashboard/analytics/analytics-map"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[30rem] w-full rounded-lg" />
  }
)

export const VcardCreateForm = dynamic(
  () =>
    import("@/components/forms/pages/design/virtual-card/sub-forms/vcard-create-form"),
  { ssr: false, loading: () => <Skeleton className="h-[40rem] w-full" /> }
)

export const VcardQrCodeDesign = dynamic(
  () =>
    import("@/components/forms/pages/design/virtual-card/stepper-components/vcard-qr-code-design"),
  { ssr: false, loading: () => <Skeleton className="h-[40rem] w-full" /> }
)

export const CoreVcardPreview = dynamic(
  () => import("@/components/templates/vcard/core"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-4 animate-spin" />
        Booting...
      </div>
    )
  }
)

export const BlueVcardPreview = dynamic(
  () => import("@/components/templates/vcard/blue-template"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-4 animate-spin" />
        Booting...
      </div>
    )
  }
)

export const OrangeGrayPreview = dynamic(
  () => import("@/components/templates/vcard/orange-gray-template"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-4 animate-spin" />
        Booting...
      </div>
    )
  }
)

export const BrownPaperPreview = dynamic(
  () => import("@/components/templates/vcard/brown-paper-template"),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full flex-col items-center justify-center gap-2">
        <Loader2 className="size-4 animate-spin" />
        Booting...
      </div>
    )
  }
)

export const SingleColorForm = dynamic(
  () =>
    import("@/components/forms/pages/design/qr-style/color-form/single-color-form/single-color-form"),
  { ssr: false, loading: () => <Skeleton className="h-32 w-full" /> }
)

export const GradientColorForm = dynamic(
  () =>
    import("@/components/forms/pages/design/qr-style/color-form/gradient-color-form/gradient-color-form"),
  { ssr: false, loading: () => <Skeleton className="h-32 w-full" /> }
)
