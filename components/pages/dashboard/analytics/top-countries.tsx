"use client"

import { ScanQrCode } from "lucide-react"

import type { geoDataType } from "@/types/type"
import { ListComponent } from "@/components/global/list-component"
import { TopScanCard } from "@/components/cards/pages/dashboard/analytics/top-scan-card"

interface TopCountriesProps {
  data: geoDataType[]
}

export const TopCountries = ({ data }: TopCountriesProps) => {
  const sortedCountries = data?.sort((a, b) => b.count - a.count)?.slice(0, 10)

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-2 bg-zinc-100 p-3 rounded-lg">
        <p className="text-sm font-semibold text-black">
          Top {sortedCountries?.length ?? 0} Countr
          {sortedCountries.length > 1 ? "ies" : "y"}
        </p>
        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
          <ScanQrCode className="size-4" />
          Scans
        </p>
      </div>

      <ListComponent
        data={sortedCountries}
        className="flex flex-col gap-2 mt-4"
        renderItem={(item) => <TopScanCard key={item?.country} data={item} />}
      />
    </div>
  )
}
