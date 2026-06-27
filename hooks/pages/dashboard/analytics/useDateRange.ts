"use client"

import dayjs from "dayjs"
import { useMemo } from "react"

import { formatDateToLocal } from "@/utils/date-formats"

interface DateRange {
  from: Date
  to: Date
}

export const useDateRange = (dateRange: DateRange) => {
  const numberOfDays = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return 0
    return dayjs(dateRange.to).diff(dayjs(dateRange.from), "day")
  }, [dateRange.from, dateRange.to])

  const fromDateFormatted = useMemo(() => {
    if (!dateRange.from) return "0"
    return formatDateToLocal(dateRange.from)
  }, [dateRange.from])

  const toDateFormatted = useMemo(() => {
    if (!dateRange.to) return "0"
    return formatDateToLocal(dateRange.to)
  }, [dateRange.to])

  return { numberOfDays, fromDateFormatted, toDateFormatted }
}
