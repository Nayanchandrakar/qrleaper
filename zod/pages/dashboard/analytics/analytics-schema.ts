import dayjs from "dayjs"
import { z } from "zod"

import { idSchema } from "@/zod/utils"

export const qrAnalyticsSchema = z
  .object({
    fromDate: z.date().refine((date) => !Number.isNaN(date.getTime()), {
      message: "fromDate must be a valid date"
    }),
    toDate: z.date().refine((date) => !Number.isNaN(date.getTime()), {
      message: "toDate must be a valid date"
    }),
    id: idSchema.shape.id
  })
  .superRefine((data, ctx) => {
    const { fromDate, toDate } = data

    if (!dayjs(toDate).isAfter(dayjs(fromDate), "day")) {
      ctx.addIssue({
        code: "custom",
        path: ["toDate"],
        message: `toDate (${toDate.toISOString()}) must be after fromDate (${fromDate.toISOString()})`
      })
    }

    const rangeDays = dayjs(toDate).diff(dayjs(fromDate), "day")
    if (rangeDays > 90) {
      ctx.addIssue({
        code: "custom",
        path: ["toDate"],
        message: `The date range (${rangeDays} days) cannot exceed 90 days.`
      })
    }
  })
