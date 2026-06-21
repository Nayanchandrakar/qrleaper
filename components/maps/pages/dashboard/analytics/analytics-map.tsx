"use client"

import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
import { GeoJSON, MapContainer, TileLayer } from "react-leaflet"

import countries from "@/constants/pages/dashboard/analytics/geo-location.json"
import { getColor } from "@/utils/pages/dashboard/analytics/utils"

interface MapProps {
  data: {
    [key: string]: number
  }
}

const AnalyticsMap = ({ data }: MapProps) => {
  const position = [51.505, -0.09] as LatLngExpression

  return (
    <MapContainer
      zoom={2}
      center={position}
      className="h-[30rem] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      <GeoJSON
        // oxlint-disable-next-line typescript/no-explicit-any
        data={countries as any}
        style={(feature) => {
          return {
            fillColor: getColor(data[feature?.properties?.ISO_A2] ?? 0),
            weight: 0.4,
            color: "transparent",
            opacity: 1,
            fillOpacity: 0.3
          }
        }}
      />
    </MapContainer>
  )
}

export default AnalyticsMap
