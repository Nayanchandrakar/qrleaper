"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"

import type { LatLngExpression } from "leaflet"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"

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
      className="rounded-lg w-full h-[30rem]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />

      <GeoJSON
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        data={countries as any}
        style={(feature) => {
          return {
            fillColor: getColor(data[feature?.properties?.ISO_A2] ?? 0),
            weight: 0.4,
            color: "transparent",
            opacity: 1,
            fillOpacity: 0.3,
          }
        }}
      />
    </MapContainer>
  )
}

export default AnalyticsMap
