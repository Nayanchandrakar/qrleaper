"use client"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DateSelectPopover } from "@/components/forms/pages/dashboard/analytics/analytics-form/date-select-popover"

interface AnalyticsDurationChangeFormProps {
  numberOfDays: number
  isExecuting: boolean
}

export const AnalyticsDurationChangeForm = ({
  isExecuting,
  numberOfDays,
}: AnalyticsDurationChangeFormProps) => {
  return (
    <CardHeader className="mt-8 flex items-start gap-2 border-b py-5 lg:flex-row lg:items-center">
      <div className="grid flex-1 gap-1 text-left">
        <CardTitle>Area Chart - Interactive</CardTitle>
        <CardDescription>
          Showing total visitors for the last {numberOfDays} days
        </CardDescription>
      </div>

      <DateSelectPopover isExecuting={isExecuting} />
    </CardHeader>
  )
}
