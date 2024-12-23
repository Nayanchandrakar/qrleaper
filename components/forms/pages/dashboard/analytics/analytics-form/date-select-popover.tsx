"use client"

import dayjs from "dayjs"
import { toast } from "sonner"
import { DateRange } from "react-day-picker"
import { ElementRef, useRef, useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { formatDateToLocal } from "@/utils/date-formats"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { qrAnalyticsSchema } from "@/zod/pages/dashboard/analytics/analytics-schema"
import { useAnalyticsData } from "@/hooks/pages/dashboard/analytics/useAnalyticsData"

interface DateSelectPopoverProps {
  isExecuting: boolean
}

export const DateSelectPopover = ({ isExecuting }: DateSelectPopoverProps) => {
  const buttonRef = useRef<ElementRef<"button"> | null>(null)
  const { dateRange, setDateRange } = useAnalyticsData()
  const [selectDateRange, setSelectDateRange] = useState<DateRange>(dateRange)

  const handleSelect = () => {
    const { success, data, error } = qrAnalyticsSchema.safeParse({
      id: "testing",
      fromDate: selectDateRange.from,
      toDate: selectDateRange.to,
    })

    if (!success && error) {
      error?.errors?.forEach((value) => {
        toast.error(value?.message)
      })
      return
    }

    setDateRange({
      from: data.fromDate,
      to: data.toDate,
    })

    if (buttonRef?.current) buttonRef?.current?.click?.()

    return toast.success("Date Range Selected Succefully ")
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger disabled={isExecuting} ref={buttonRef} asChild>
          <Button
            key="button-key"
            variant="outline"
            className={cn(
              "flex items-center justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 hidden size-4 min-[375px]:inline-block" />
            {dateRange?.from ? (
              dateRange?.to ? (
                <>
                  {formatDateToLocal(dateRange.from!)} -{" "}
                  {formatDateToLocal(dateRange.to!)}
                </>
              ) : (
                formatDateToLocal(dateRange.to!)
              )
            ) : (
              <span>Select a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2">
          <div className="w-full">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={selectDateRange?.from}
              selected={selectDateRange}
              // @ts-ignore
              onSelect={setSelectDateRange}
              numberOfMonths={1}
              max={91}
              disabled={(date) => dayjs(date)?.isAfter(dayjs(), "day")}
            />
          </div>

          <Button onClick={handleSelect} size="sm" className="w-full">
            Submit
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
