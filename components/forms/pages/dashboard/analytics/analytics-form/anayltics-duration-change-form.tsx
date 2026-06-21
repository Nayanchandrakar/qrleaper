"use client"

import { DateSelectPopover } from "@/components/forms/pages/dashboard/analytics/analytics-form/date-select-popover"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsDurationChangeFormProps {
  isExecuting: boolean
}

export const AnalyticsDurationChangeForm = ({
  isExecuting
}: AnalyticsDurationChangeFormProps) => {
  return (
    <CardHeader className="mt-8 flex items-start gap-2 border-b py-5 lg:flex-row lg:items-center">
      <div className="grid flex-1 gap-1 text-left">
        <CardTitle>Scan Activity Overview</CardTitle>
        <CardDescription>
          Check scan totals for your selected date range.
        </CardDescription>
      </div>

      <DateSelectPopover isExecuting={isExecuting} />
    </CardHeader>
  )
}
