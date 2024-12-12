import dayjs from "dayjs"

// Last 7 days
export const last7Days = new Date(
  new Date().getTime() - 7 * 24 * 60 * 60 * 1000
)

export const formatDateToLocal = (time: Date) => {
  return dayjs(time).format("MMMM D, YYYY")
}
