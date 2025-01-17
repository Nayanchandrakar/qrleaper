import type { qrAnayticsType } from "@/types/db-types"

export const locationAnalytics = (data: qrAnayticsType[]) => {
  const countries: qrAnayticsType[] = []
  const countryMap = new Map()

  data?.forEach((curr) => {
    if (countryMap.has(curr.country)) {
      countryMap.get(curr.country).count += curr.count
    } else {
      countryMap.set(curr.country, curr)
      countries.push(curr)
    }
  })
  return countries
}

export const toGeoLocationObject = (data: qrAnayticsType[]) => {
  let obj = {}

  data?.map(({ country, count }) => {
    // @ts-ignore
    obj[country] = count
  })

  return obj
}

export const toGeoLocationArray = (data: qrAnayticsType[]) => {
  return data?.map(({ count, country }) => ({
    count: count!,
    country: country!,
  }))
}
