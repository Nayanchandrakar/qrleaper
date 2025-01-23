"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { useAction } from "next-safe-action/hooks"

import { Skeleton } from "@/components/ui/skeleton"
import { useDateRange } from "@/hooks/pages/dashboard/analytics/useDateRange"
import { GeoAnalytics } from "@/components/pages/dashboard/analytics/geo-analytics"
import { useAnalyticsData } from "@/hooks/pages/dashboard/analytics/useAnalyticsData"
import { DeviceAnalyticsChart } from "@/components/charts/pages/dashboard/analytics/device-analytics-chart"
import { getQrCodeAnalyticsAction } from "@/app/actions/pages/dashboard/analytics/get-qr-code-analytics-action"
import { LocationAnalyticsChart } from "@/components/charts/pages/dashboard/analytics/location-analytics-chart"
import { AnalyticsDurationChangeForm } from "@/components/forms/pages/dashboard/analytics/analytics-form/anayltics-duration-change-form"

interface AnalyticsReportProps {
  id: string
}

export const AnalyticsReport: React.FC<AnalyticsReportProps> = ({ id }) => {
  const { data, dateRange, setData } = useAnalyticsData()

  const { fromDateFormatted, numberOfDays, toDateFormatted } =
    // @ts-ignore
    useDateRange(dateRange)

  const { executeAsync, isExecuting } = useAction(getQrCodeAnalyticsAction, {
    onSuccess: ({ data: analyticsData }) => {
      setData(analyticsData?.data!)
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  useEffect(() => {
    executeAsync({ fromDate: dateRange?.from!, toDate: dateRange?.to!, id })
  }, [id, dateRange, executeAsync])

  return (
    <section className="space-y-12">
      <AnalyticsDurationChangeForm isExecuting={isExecuting} />

      {isExecuting && (
        <div className="space-y-12">
          <Skeleton className="h-[26rem] w-full" />
          <Skeleton className="h-[42rem] w-full" />
        </div>
      )}

      {!isExecuting && (
        <>
          <DeviceAnalyticsChart data={data} numberOfDays={numberOfDays} />
          <LocationAnalyticsChart
            data={data}
            numberOfDays={numberOfDays}
            fromDateFormatted={fromDateFormatted!}
            toDateFormatted={toDateFormatted}
          />
          <GeoAnalytics data={data} />
        </>
      )}
    </section>
  )
}
