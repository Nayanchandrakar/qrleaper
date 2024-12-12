"use client"

import { create } from "zustand"
import type { DateRange } from "react-day-picker"
import type { qrAnayticsType } from "@/types/db-types"
import { last7Days } from "@/utils/date-formats"

interface useAnalyticsProps {
  dateRange: DateRange
  data: qrAnayticsType[]
  setDateRange: (value: DateRange) => void
  setData: (value: qrAnayticsType[]) => void
}

export const useAnalyticsData = create<useAnalyticsProps>((set) => ({
  data: [],
  dateRange: {
    from: last7Days,
    to: new Date(),
  },
  setData: (value) => set({ data: value }),
  setDateRange: (value) => set({ dateRange: value }),
}))
